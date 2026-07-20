import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import AdSenseInArticle from '@/src/components/posts/AdSenseInArticle';
import Comments from '@/src/components/posts/Comments';
import LikeButton from '@/src/components/posts/LikeButton';
import PostContentBody from '@/src/components/posts/PostContentBody';
import ViewCounter from '@/src/components/posts/ViewCounter';
import ShareButtons from '@/src/components/posts/share/ShareButtons';
import { getBlogPost } from '@/src/lib/data/api';
import { getPostContent } from '@/src/lib/data/parser';
import { prisma } from '@/src/lib/prisma';

interface PostPageProps {
    params: Promise<{
        slug: string;
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

    if (cleaned.includes('image/fetch/')) {
        const parts = cleaned.split('image/fetch/');
        const realUrlPart = parts[parts.length - 1];
        const httpIndex = realUrlPart.indexOf('http');
        if (httpIndex !== -1) {
            cleaned = realUrlPart.substring(httpIndex);
        }
    }

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

    const encodedUrl = encodeURIComponent(pureUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/c_fill,g_auto,w_1200,h_630,f_auto,q_auto/${encodedUrl}`;
}

function getCloudinaryCoverUrl(imageUrl: string | null | undefined): string {
    const pureUrl = getPureUrl(imageUrl);
    if (!pureUrl) return DEFAULT_IMAGE;
    if (!CLOUDINARY_CLOUD_NAME) return pureUrl;

    const encodedUrl = encodeURIComponent(pureUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/c_fill,g_auto,w_1200,h_300,f_auto,q_auto/${encodedUrl}`;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) {
        return {
            title: '글을 찾을 수 없습니다 | DevLog',
            description: '요청하신 게시글을 찾을 수 없거나 삭제된 링크입니다.',
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
    // params 에서 slug를 가져옴
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) notFound();
    const content = await getPostContent(post.id);
    const rawCoverUrl = cleanImageUrl(post.coverImage);
    const coverImageUrl = rawCoverUrl || DEFAULT_IMAGE;

    // 진입 시 조회수를 실시간으로 1 증가, 누적된 데이터를 읽음
    const data = await prisma.post.findUnique({
        where: { slug },
    });

    const initialViews = data?.views ?? 0;
    const initialLikes = data?.likes ?? 0;

    return (
        <main className="mx-auto min-h-screen max-w-6xl bg-white px-6 py-16 duration-200 dark:bg-slate-950">
            {/* 대표 이미지 */}
            <div className="mb-8 h-52 w-full overflow-hidden rounded-2xl shadow-sm md:h-75">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImageUrl} alt={post.title} className="h-full w-full object-cover" />
            </div>

            {/* 카테고리, 작성일자 */}
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
            <h2 className="mb-6 text-2xl leading-tight font-extrabold text-slate-900 md:text-3xl dark:text-slate-50">
                {post.title}
            </h2>

            {/* 요약 */}
            <p className="mb-10 border-l-4 border-blue-500 py-1 pl-4 text-lg text-slate-600 dark:text-slate-400">
                {post.description}
            </p>

            <hr className="mb-10 border-slate-200 dark:border-slate-800" />

            {/* 본문 */}
            <PostContentBody contentHtml={content} />

            <hr className="mt-16 mb-10 border-slate-200 dark:border-slate-800" />

            {/* 본문 하단 전용 구글 애드센스 광고 */}
            <AdSenseInArticle />

            {/* 소셜 공유 버튼 섹션 배치 개발중으로 hidden 처리 */}
            <div className="mt-10 hidden border-b border-slate-100 pb-8 dark:border-slate-800/60">
                <ShareButtons
                    slug={slug}
                    title={post.title}
                    description={post.description || ''}
                    coverImage={coverImageUrl}
                />
            </div>

            {/* 좋아요 */}
            <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-slate-100 pt-10 dark:border-slate-800/60">
                <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-300">
                    이 글이 유익했다면 좋아요를 남겨주세요!
                </p>
                <LikeButton slug={slug} initialLikes={initialLikes} />
            </div>

            {/* 댓글 */}
            <Comments postSlug={slug} />
        </main>
    );
}
