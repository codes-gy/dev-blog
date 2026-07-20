import { NextResponse } from 'next/server';
import { getEmailProvider } from '@/src/lib/email/emailFactory';
import { prisma } from '@/src/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, email, subject, replyMessage } = body;

        if (!id || !email || !replyMessage) {
            return NextResponse.json({ success: false, error: '필수 데이터가 누락되었습니다.' }, { status: 400 });
        }

        const emailService = getEmailProvider();

        await emailService.send(email, subject, replyMessage);

        await prisma.contact.update({
            where: { id: BigInt(id) },
            data: { isProcessed: true },
        });

        return NextResponse.json({
            success: true,
            message: '이메일 답변이 성공적으로 전송되었으며, DB 상태가 업데이트되었습니다.',
        });
    } catch (error) {
        console.error('메일 발송 에러:', error);
        return NextResponse.json(
            { success: false, error: '이메일 발송 중 서버 오류가 발생했습니다.' },
            { status: 500 },
        );
    }
}
