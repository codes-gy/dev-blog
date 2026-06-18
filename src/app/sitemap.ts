import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/src/lib/data/api';

export const dynamic = 'force-dynamic';

// 날짜 문자열이 진짜 유효한지 검증하는 헬퍼 함수
const getValidDate = (dateString: string | null | undefined): Date => {
    if (!dateString) return new Date(); // 값이 없으면 현재 시간 반환

    const parsedDate = new Date(dateString);
    // 파싱된 날짜가 유효한지 확인 (Invalid Date인 경우 getTime()은 NaN을 반환함)
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-blog-topaz-rho.vercel.app';

    const result = await getBlogPosts();
    const posts = result.posts;

    // 대기 중이거나 에러가 날 수 있는 루트(Base) 경로 설정
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    // 포스트 데이터를 안전하게 매핑하여 추가
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        // 💡 헬퍼 함수를 통해 잘못된 날짜 형식 차단
        lastModified: getValidDate(post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...postRoutes];
}
