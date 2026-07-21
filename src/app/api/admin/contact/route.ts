import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        const serializedContacts = contacts.map((item) => ({
            ...item,
            id: item.id.toString(),
        }));

        return NextResponse.json({ success: true, data: serializedContacts });
    } catch (error) {
        console.error('목록을 불러오지 못했습니다.:', error);
        return NextResponse.json(
            {
                success: false,
                error: '목록을 불러오지 못했습니다.',
            },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // 필수 필드 유효성 검사
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                {
                    success: false,
                    error: '모든 필드를 입력해야 합니다.',
                },
                { status: 400 },
            );
        }

        const newContact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        return NextResponse.json(
            {
                success: true,
                id: newContact.id.toString(),
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('문의하기 오류:', error);
        return NextResponse.json(
            {
                success: false,
                error: '서버 오류로 인해 문의를 저장하지 못했습니다.',
            },
            { status: 500 },
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, isProcessed } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: '요청 ID가 누락되었습니다.' }, { status: 400 });
        }

        const updatedContact = await prisma.contact.update({
            where: {
                id: BigInt(id),
            },
            data: {
                isProcessed: isProcessed,
            },
        });

        return NextResponse.json({
            success: true,
            data: { ...updatedContact, id: updatedContact.id.toString() },
        });
    } catch (error) {
        console.error('Contact PATCH Error:', error);
        return NextResponse.json({ success: false, message: '상태 수정 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
