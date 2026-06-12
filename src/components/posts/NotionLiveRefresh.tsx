'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotionLiveRefresh() {
    const router = useRouter();

    useEffect(() => {
        const eventSource = new EventSource('/api/webhook');

        eventSource.onmessage = (event) => {
            if (event.data === 'refresh') {
                router.refresh();
            }
        };

        return () => {
            eventSource.close(); // 페이지를 나가면 연결을 안전하게 끊습니다.
        };
    }, [router]);

    return null;
}
