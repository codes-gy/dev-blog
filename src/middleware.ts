import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /admin 으로 시작하는 페이지 진입할 때만 체크
    if (pathname.startsWith('/admin')) {
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;

        // 토큰이 아예 없으면 로그인 안 한 것이므로 로그인페이지로 이동
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            // 토큰 검증 API로 요청을 보냄
            const verifyUrl = new URL('/api/auth/admin', request.url);

            const res = await fetch(verifyUrl, {
                method: 'GET',
                headers: {
                    Cookie: `admin_token=${token}`,
                },
            });

            // API 응답 상태 코드가 200(정상)이 아니면 비인가자로 판단
            if (!res.ok) {
                const response = NextResponse.redirect(new URL('/', request.url));
                response.cookies.delete('admin_token');
                return response;
            }

            // 인증 성공 시 관리자 페이지 진입 허용
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
