import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/src/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, email, subject, replyMessage } = body;

        if (!id || !email || !replyMessage) {
            return NextResponse.json({ success: false, error: '필수 데이터가 누락되었습니다.' }, { status: 400 });
        }

        // 1. 이메일 발송을 위한 SMTP Transport 설정
        // ※ Gmail이나 Naver 등 사용하는 메일 서비스에 맞춰 설정합니다.
        const transporter = nodemailer.createTransport({
            service: 'gmail', // gmail, naver, daum 등 입력 가능
            auth: {
                user: process.env.EMAIL_USER, // 발신자 이메일 주소 (예: admin@gmail.com)
                pass: process.env.EMAIL_PASS, // 발신자 이메일 비밀번호 또는 앱 비밀번호
            },
        });

        // 2. 이메일 전송 옵션 정의
        const mailOptions = {
            from: process.env.EMAIL_USER, // 보내는 사람
            to: email, // 받는 사람 (문의한 유저의 이메일)
            subject: subject, // 메일 제목
            text: replyMessage, // 메일 본문 내용 (Plain Text)
            // 필요 시 html: `<p>${replyMessage}</p>` 로 HTML 양식 발송도 가능합니다.
        };

        // 3. 실제 메일 전송 실행
        await transporter.sendMail(mailOptions);

        // 4. (선택사항) 메일 발송이 성공하면 DB에서도 해당 문의의 처리 상태를 '완료'로 업데이트
        await prisma.contact.update({
            where: {
                id: BigInt(id),
            },
            data: {
                isProcessed: true,
            },
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
