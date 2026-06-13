import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'use-intl';
import AdSenseInArticle from '@/src/components/posts/AdSenseInArticle';
import Comments from '@/src/components/posts/Comments';
import LikeButton from '@/src/components/posts/LikeButton';
import PostContentBody from '@/src/components/posts/PostContentBody';
import ViewCounter from '@/src/components/posts/ViewCounter';
import { getBlogPost, getPostContent } from '@/src/lib/data';
import { prisma } from '@/src/lib/prisma';

interface PostPageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const DEFAULT_OG_IMAGE = process.env.DEFAULT_OG_IMAGE_PATH || 'https://devlog.io/default-og-image.png';
const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE_PATH || 'https://devlog.io/default-cover-image.png';

function cleanImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    return url.replace(/\s+/g, '').trim();
}

function getPureUrl(url: string | null | undefined): string {
    if (!url) return '';
    let cleaned = url.replace(/\s+/g, '').trim();

    // 1. 만약 이미 Cloudinary fetch 레이어가 씌워져 있다면 알맹이(S3 주소)만 쏙 빼냅니다.
    if (cleaned.includes('image/fetch/')) {
        const parts = cleaned.split('image/fetch/');
        const realUrlPart = parts[parts.length - 1];
        const httpIndex = realUrlPart.indexOf('http');
        if (httpIndex !== -1) {
            cleaned = realUrlPart.substring(httpIndex);
        }
    }

    // 2. 🌟 [핵심] %252F 같은 중복 인코딩 찌꺼기가 완전히 사라질 때까지 완전히 디코딩합니다.
    let decoded = cleaned;
    while (decoded.includes('%')) {
        try {
            const nextDecoded = decodeURIComponent(decoded);
            if (nextDecoded === decoded) break;
            decoded = nextDecoded;
        } catch (e) {
            break;
        }
    }

    return decoded;
}
function getCloudinaryOgUrl(imageUrl: string | null | undefined): string {
    const pureUrl = getPureUrl(imageUrl);
    if (!pureUrl) return DEFAULT_OG_IMAGE;
    if (!CLOUDINARY_CLOUD_NAME) return pureUrl;

    // 순수해진 S3 주소를 딱 한 번만 안전하게 인코딩하여 Cloudinary에 전달 (최적화 ON!)
    const encodedUrl = encodeURIComponent(pureUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/c_fill,g_auto,w_1200,h_630,f_auto,q_auto/${encodedUrl}`;
}

function getCloudinaryCoverUrl(imageUrl: string | null | undefined): string {
    const pureUrl = getPureUrl(imageUrl);
    if (!pureUrl) return DEFAULT_IMAGE;
    if (!CLOUDINARY_CLOUD_NAME) return pureUrl;

    // 순수해진 S3 주소를 딱 한 번만 안전하게 인코딩하여 Cloudinary에 전달 (최적화 ON!)
    const encodedUrl = encodeURIComponent(pureUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/c_fill,g_auto,w_1200,h_300,f_auto,q_auto/${encodedUrl}`;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const post = await getBlogPost(slug);
    const tMeta = await getTranslations({ locale, namespace: 'Metadata' });

    if (!post) {
        return {
            title: tMeta('notFound'),
            description: tMeta('notFoundDescription'),
        };
    }
    const pageTitle = `${post.title} | DevLog`;
    const pageDesc = post.description || '개발 및 기술 블로그입니다.';
    const ogImageUrl = cleanImageUrl(post.coverImage) || DEFAULT_OG_IMAGE;

    return {
        title: pageTitle,
        description: pageDesc,
        openGraph: {
            title: pageTitle,
            description: pageDesc,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: ['지근영'],
            images: [{ url: ogImageUrl }],
            siteName: 'DevLog.io',
            tags: [post.category],
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDesc,
            images: [ogImageUrl],
        },
        alternates: {
            canonical: `https://devlog.io/posts/${slug}`,
        },
    };
}

export default async function PostDetailPage({ params }: PostPageProps) {
    // 1. 안전하게 비동기 params 구조를 풀어 slug를 가져옵니다.
    const { slug, locale } = await params;
    const post = await getBlogPost(slug);
    if (!post) notFound();
    const content = await getPostContent(post.id);
    const rawCoverUrl = cleanImageUrl(post.coverImage);
    const coverImageUrl = rawCoverUrl || DEFAULT_IMAGE;

    // 2. 진입 시 조회수를 실시간으로 1 올리고 누적 데이터를 읽어옵니다.
    const data = await prisma.post.findUnique({
        where: { slug },
    });

    const initialViews = data?.views ?? 0;
    const initialLikes = data?.likes ?? 0;

    const tPost = await getTranslations({ locale, namespace: 'Post' });

    return (
        <main className="mx-auto min-h-screen max-w-6xl bg-white px-6 py-16 duration-200 dark:bg-slate-950">
            {/* 대표 이미지 (가로 꽉 차고 세로 고정된 완벽한 배너 레이아웃) */}
            <div className="mb-8 h-52 w-full overflow-hidden rounded-2xl shadow-sm md:h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImageUrl} alt={post.title} className="h-full w-full object-cover" />
            </div>

            {/* 카테고리 / 작성일자 */}
            <div className="mb-6 flex w-full items-center justify-between text-sm font-semibold">
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                        {post.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <time className="text-slate-500 dark:text-slate-400">{post.publishedAt}</time>
                </div>
                {/* 실시간 조회수 표시 */}
                <div className="shrink-0 items-center">
                    <ViewCounter slug={slug} initialViews={initialViews} />
                </div>
            </div>

            {/* 제목 */}
            <h1 className="mb-6 text-3xl leading-tight font-extrabold text-slate-900 md:text-5xl dark:text-slate-50">
                {post.title}
            </h1>

            {/* 요약 */}
            <p className="mb-10 border-l-4 border-blue-500 py-1 pl-4 text-lg text-slate-600 italic dark:text-slate-400">
                {post.description}
            </p>

            <hr className="mb-10 border-slate-200 dark:border-slate-800" />

            {/* 본문 내용 html 렌더링 */}
            <PostContentBody contentHtml={content} />

            <hr className="mt-16 mb-10 border-slate-200 dark:border-slate-800" />

            {/* [추가] 본문 하단 전용 구글 애드센스 광고 배치
                - slot 값은 나중에 광고가 승인된 후 애드센스 대시보드에서 '신규 광고 단위 생성'을 통해 생성된 10자리 숫자를 넣어주시면 됩니다. 우선은 아무 임의 숫자나 비워두셔도 심사용으로는 문제 없습니다.
            */}
            <AdSenseInArticle />

            {/* 좋아요 섹션 */}
            <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-slate-100 pt-10 dark:border-slate-800/60">
                <p className="text-xs font-semibold tracking-wide text-slate-400 dark:text-slate-500">
                    {tPost('likePrompt')}
                </p>
                <LikeButton slug={slug} initialLikes={initialLikes} />
            </div>

            {/* 댓글 섹션 */}
            <Comments />
        </main>
    );
}
