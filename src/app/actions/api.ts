'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/src/lib/prisma';

/** 특정 포스트 상세 페이지에 진입했을 때 조회수를 1 올리는 함수 */
export async function incrementViews(slug: string) {
    try {
        const cookieStore = await cookies();
        const cookieName = `viewed_${slug}`;

        if (cookieStore.has(cookieName)) {
            const data = await prisma.post.findUnique({ where: { slug } });
            return {
                views: data?.views ?? 0,
                likes: data?.likes ?? 0,
            };
        }

        // 데이터가 있으면 update, 없으면 create 를 동시에 처리
        const meta = await prisma.post.upsert({
            where: { slug },
            update: { views: { increment: 1 } },
            create: { slug, views: 1, likes: 0 },
        });

        cookieStore.set(cookieName, 'true', {
            maxAge: 60 * 60 * 24, //24시간
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        });

        // 직렬화 에러 방지를 위해 필요한 데이터만 가공해서 리턴합니다.
        return { views: meta.views, likes: meta.likes };
    } catch (error) {
        console.error('Failed to increment views:', error);
        return { views: 0, likes: 0 };
    }
}

/** 사용자가 하트 버튼을 눌렀을 때 좋아요를 1 올리는 함수*/
export async function incrementLikes(slug: string) {
    try {
        const meta = await prisma.post.upsert({
            where: { slug },
            update: { likes: { increment: 1 } },
            create: { slug, views: 1, likes: 1 },
        });

        return { views: meta.views, likes: meta.likes };
    } catch (error) {
        console.error('Failed to increment likes:', error);
        return null;
    }
}
