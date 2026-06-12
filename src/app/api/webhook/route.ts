import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { notion } from '@/src/lib/data';

interface NotionWebhookPayload {
    data?: {
        id: string;
        properties?: {
            Slug?: {
                rich_text?: Array<{ plain_text: string }>;
            };
        };
    };
}

//  현재 블로그를 켜놓고 있는 모든 브라우저의 실시간 신호 채널들을 모아두는 방입니다.
const activeControllers = new Set<ReadableStreamDefaultController>();

//  브라우저가 블로그에 접속하면 이 GET 주소를 통해 실시간 채널을 유지합니다.
export async function GET() {
    const stream = new ReadableStream({
        start(controller) {
            activeControllers.add(controller);
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode('data: connected\n\n'));
        },
        cancel(controller) {
            activeControllers.delete(
                controller as unknown as ReadableStreamDefaultController,
            );
        },
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no',
        },
    });
}

// [노션 자동화 웹훅] 체크박스가 바뀌면 노션이 이 POST 주소를 찌릅니다.
export async function POST(request: NextRequest) {
    try {
        const rawBody = await request.text();
        if (!rawBody) {
            return NextResponse.json(
                { message: '요청 본문이 비어있습니다.' },
                { status: 400 },
            );
        }
        const body = JSON.parse(rawBody) as NotionWebhookPayload;
        const pageId = body.data?.id;
        let slug = body.data?.properties?.Slug?.rich_text?.[0]?.plain_text;

        if (!slug && pageId) {
            try {
                const pageData = await notion.pages.retrieve({
                    page_id: pageId,
                });
                if ('properties' in pageData) {
                    const slugProp = pageData.properties.Slug;
                    if (
                        slugProp &&
                        slugProp.type === 'rich_text' &&
                        slugProp.rich_text.length > 0
                    ) {
                        slug = slugProp.rich_text[0].plain_text;
                    }
                }
            } catch (notionError) {
                console.error(notionError);
            }
        }
        if (slug) {
            revalidatePath(`/posts/${slug}`);
            console.log(`[Webhook] 상세 페이지 캐시 제거 완료: /posts/${slug}`);
        } else {
            console.warn(
                '[Webhook 경고] 갱신할 포스트의 Slug를 찾지 못했습니다.',
            );
        }
        // 백엔드 캐시를 제거합니다.
        revalidatePath('/', 'layout');
        revalidatePath('/posts');

        const encoder = new TextEncoder();
        const signalData = encoder.encode('data: refresh\n\n');

        activeControllers.forEach((controller) => {
            try {
                controller.enqueue(signalData);
            } catch (error) {
                activeControllers.delete(controller);
                console.error(error);
            }
        });

        return NextResponse.json({
            revalidated: true,
            slug: slug ?? '전체 목록',
            now: Date.now(),
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : '알 수 없는 에러';
        console.error('[Webhook 캐시 갱신 실패]:', errorMessage);
        return NextResponse.json({ message: '웹훅 오류' }, { status: 500 });
    }
}
