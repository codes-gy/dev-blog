import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/src/lib/data/api';

export const dynamic = 'force-dynamic';

// 날짜 유효성을 검사하는 안전 장치 함수
function isValidDate(date: Date): boolean {
    return date && !isNaN(date.getTime());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-blog-topaz-rho.vercel.app';

    try {
        const result = await getBlogPosts();

        const posts = result && Array.isArray(result.posts) ? result.posts : [];

        const blogUrls = posts.map((post) => {
            // 날짜 파싱 안전하게 처리
            let lastMod = new Date();
            if (post.publishedAt) {
                const parsedDate = new Date(post.publishedAt);
                if (isValidDate(parsedDate)) {
                    lastMod = parsedDate;
                }
            }

            return {
                url: `${baseUrl}/posts/${post.slug}`,
                lastModified: lastMod,
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            };
        });

        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            },
            ...blogUrls,
        ];
    } catch (error) {
        console.error('사이트맵 생성 중 에러 발생:', error);
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            },
        ];
    }
}
