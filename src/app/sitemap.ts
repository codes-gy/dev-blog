import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/src/lib/data/api';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-blog-topaz-rho.vercel.app';

    const result = await getBlogPosts();
    const posts = result.posts;

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...posts.map((post) => ({
            url: `${baseUrl}/posts/${post.slug}`,
            lastModified: new Date(post.publishedAt || Date.now()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        })),
    ];
}
