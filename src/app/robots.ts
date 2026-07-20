import type { MetadataRoute } from 'next';

// Next.js가 /robots.txt 파일을 생성
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-blog-topaz-rho.vercel.app';

    return {
        // 검색엔진 크롤러 접근 규칙
        rules: {
            // 모든 검색엔진 봇에게 적용
            userAgent: '*',
            // 사이트 전체 경로 크롤링 허용
            allow: '/',
        },
        // 검색엔진에게 sitemap.xml 위치 전달
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
