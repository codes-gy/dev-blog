import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['ko', 'en', 'ja'],
    defaultLocale: 'ko',
    localePrefix: 'always',
});

export const config = {
    matcher: ['/', '/(ko|en|ja)/:path*', '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)'],
};
