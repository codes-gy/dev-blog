import type { MetadataRoute } from 'next';

// Next.js가 자동으로 /robots.txt 파일을 생성해줌
export default function robots(): MetadataRoute.Robots {
    // 환경변수에 NEXT_PUBLIC_SITE_URL이 있으면 그 값을 사용
    // 없으면 기본 주소를 사용함
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
