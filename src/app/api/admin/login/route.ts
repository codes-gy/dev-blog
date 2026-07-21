import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LRUCache } from 'lru-cache';

// IP별 로그인 시도 횟수를 기억할 메모리 공간 설정
const rateLimiter = new LRUCache<string, number>({
    max: 500,
    ttl: 60 * 1000, // 1분
});

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json({ isAuthenticated: false, message: '로그인되지 않았습니다.' }, { status: 401 });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return NextResponse.json({ message: '서버 설정 에러' }, { status: 500 });
        }

        // 토큰 위변조 검증
        const decoded = jwt.verify(token, jwtSecret);
        return NextResponse.json({ isAuthenticated: true, user: decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { isAuthenticated: false, message: '만료되었거나 유효하지 않은 토큰입니다.' },
            { status: 401 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // 디도스 및 비밀번호 무작위 대입 공격 방어
        // 클라이언트의 IP 주소를 식별자로 사용
        const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
        const currentAttempts = rateLimiter.get(ip) || 0;

        // 1분에 5번 이상 틀리거나 시도하면 차단
        if (currentAttempts >= 5) {
            return NextResponse.json(
                { message: '너무 많은 로그인 시도가 감지되었습니다. 1분 후에 다시 시도해주세요.' },
                { status: 429 }, // 429 Too Many Requests
            );
        }

        const { password } = await request.json();
        // 설정된 비밀번호와 비교
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) {
            return NextResponse.json({ message: '비밀번호가 설정되지 않았습니다.' }, { status: 500 });
        }

        const isPasswordMatch = await bcrypt.compare(password, adminPassword);
        if (!isPasswordMatch) {
            // 로그인 실패 시 해당 IP의 시도 횟수를 1 올림
            rateLimiter.set(ip, currentAttempts + 1);
            return NextResponse.json({ message: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
        }
        // 로그인 성공 시 해당 IP의 제한 기록을 초기화
        rateLimiter.delete(ip);

        // JWT 비밀키 가져오기
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return NextResponse.json({ message: 'JWT 보안 키가 설정되지 않았습니다.' }, { status: 500 });
        }

        // 토큰 발급
        const token = jwt.sign(
            {
                role: 'admin',
                createdAt: new Date().toISOString(),
            },
            jwtSecret,
            { expiresIn: '1d' },
        );

        // 응답 객체 생성 및 httpOnly 쿠키 설정
        const response = NextResponse.json({ success: true, message: '로그인 성공' }, { status: 200 });

        response.cookies.set({
            name: 'admin_token',
            value: token,
            httpOnly: true, // XSS 공격 방어
            secure: process.env.NODE_ENV === 'production', // HTTPS 적용 여부
            sameSite: 'lax', // CSRF 공격 방어
            maxAge: 60 * 60 * 24, // 1일 (초 단위)
            path: '/', // 전체 경로에서 쿠키 유효
        });

        return response;
    } catch (error) {
        console.error('로그인 에러:', error);
        return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const response = NextResponse.json({ success: true, message: '로그아웃 성공' }, { status: 200 });

        // 브라우저의 쿠키를 즉시 삭제
        response.cookies.set({
            name: 'admin_token',
            value: '',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0, // 💡 수명을 0으로 주어 즉시 파기
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('로그아웃 에러:', error);
        return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}
