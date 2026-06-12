import React from 'react';
import { notFound } from 'next/navigation';
import { incrementViews } from '@/src/app/actions/api';
//import { incrementViews } from '@/src/app/actions/api';
import { Metadata } from 'next';
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
    }>;
}

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const DEFAULT_OG_IMAGE = process.env.DEFAULT_OG_IMAGE_PATH || 'https://devlog.io/default-og-image.png';
const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE_PATH || 'https://devlog.io/default-cover-image.png';

function getCloudinaryOgUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) return DEFAULT_OG_IMAGE;
    if (!CLOUDINARY_CLOUD_NAME) return imageUrl;
    const encodedUrl = encodeURIComponent(imageUrl);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/c_fill,g_auto,w_1200,h_630,f_auto,q_auto/${encodedUrl}`;
}

function getCloudinaryCoverUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) return DEFAULT_IMAGE;
    if (!CLOUDINARY_CLOUD_NAME) return imageUrl;
    const encodedUrl = encodeURIComponent(imageUrl);
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
    const ogImageUrl = getCloudinaryOgUrl(post.coverImage);

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
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) notFound();
    const content = await getPostContent(post.id);
    const coverImageUrl = getCloudinaryCoverUrl(post.coverImage);
    // 2. 진입 시 조회수를 실시간으로 1 올리고 누적 데이터를 읽어옵니다.
    const data = await prisma.post.findUnique({
        where: { slug },
    });

    const initialViews = data?.views ?? 0;
    const initialLikes = data?.likes ?? 0;

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

            {/* 🎯 [추가] 본문 하단 전용 구글 애드센스 광고 배치
                - slot 값은 나중에 광고가 승인된 후 애드센스 대시보드에서 '신규 광고 단위 생성'을 통해 생성된 10자리 숫자를 넣어주시면 됩니다. 우선은 아무 임의 숫자나 비워두셔도 심사용으로는 문제 없습니다.
            */}
            <AdSenseInArticle />

            {/* 좋아요 섹션 */}
            <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-slate-100 pt-10 dark:border-slate-800/60">
                <p className="text-xs font-semibold tracking-wide text-slate-400 dark:text-slate-500">
                    이 글이 유익했다면 좋아요를 남겨주세요!
                </p>
                <LikeButton slug={slug} initialLikes={initialLikes} />
            </div>

            {/* 댓글 섹션 */}
            <Comments />
        </main>
    );
}
