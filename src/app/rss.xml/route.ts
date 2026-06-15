import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/src/lib/data/api';

export const dynamic = 'force-dynamic';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-blog-topaz-rho.vercel.app';

    try {
        const result = await getBlogPosts();
        const posts = result.posts;

        let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>DevLog.io | 개발자 기술 블로그</title>
    <link>${baseUrl}</link>
    <description>Next.js로 작성한 개발 및 에러 핸들링 블로그입니다.</description>
    <language>ko</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
`;

        posts.forEach((post) => {
            rssFeed += `    <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/posts/${post.slug}</link>
        <guid>${baseUrl}/posts/${post.slug}</guid>
        <description><![CDATA[${post.description || ''}]]></description>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>
`;
        });

        rssFeed += `</channel>
</rss>`;

        return new NextResponse(rssFeed, {
            headers: {
                'Content-Type': 'application/rss+xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
            },
        });
    } catch (error) {
        console.error('RSS 피드 생성 중 에러 발생:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
