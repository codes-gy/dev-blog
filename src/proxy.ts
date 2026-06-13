import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['ko', 'en', 'ja'],
    defaultLocale: 'ko',
    localePrefix: 'always',
});

export const config = {
    matcher: [
        // 1. 메인 홈('/') 및 다국어 접두사로 시작하는 모든 하위 페이지 경로를 매칭합니다.
        // 예: /ko, /en/posts/1, /ja/about 등 전부 확실하게 가로챕니다.
        '/',
        '/(ko|en|ja)/:path*',

        // 2. 미들웨어가 작동하지 '않아야' 하는 내부 파일 및 API 경로들을 정의합니다.
        // (기존의 복잡한 제외 패턴 대신, 명확하게 폴더/파일 단위로 예외를 둡니다.)
        '/((?!api|_next/static|_next/image|images|assets|favicon.ico|apple-icon.png|sitemap.xml|robots.txt).*)',
    ],
};
