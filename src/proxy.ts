import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('next', pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const verifyUrl = new URL('/api/admin/login', request.url);

            const res = await fetch(verifyUrl, {
                method: 'GET',
                headers: {
                    Cookie: `admin_token=${token}`,
                },
            });

            if (!res.ok) {
                const response = NextResponse.redirect(new URL('/', request.url));
                response.cookies.delete('admin_token');
                return response;
            }

            return NextResponse.next();
        } catch (error) {
            console.error('미들웨어 인증 통신 에러:', error);
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
