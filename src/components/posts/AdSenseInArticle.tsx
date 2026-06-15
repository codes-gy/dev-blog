'use client';

import { useEffect, useState } from 'react';
import { useMounted } from '@/src/hooks/useMounted';

// 🎯 고유값 고정 (지근영 님의 애드센스 정보)
const ADSENSE_CLIENT = 'ca-pub-3527850742207812';
// FIXME: 심사 승인 후 발급받은 실제 10자리 광고 슬롯 번호로 변경!
const ADSENSE_SLOT = '1234567890';

interface AdsByGooglePush {
    (obj: Record<string, never>): void;
}

declare global {
    interface Window {
        adsbygoogle?: AdsByGooglePush[] | Record<string, unknown>[];
    }
}

export default function AdSenseInArticle() {
    const isMounted = useMounted();
    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                const ads = window.adsbygoogle as unknown[];
                ads.push({});
            }
        } catch (e) {
            console.error('애드센스 초기화 에러:', e);
        }
    }, [isMounted]);

    if (!isMounted) {
        return (
            <div className="mt-16 min-h-[100px] w-full animate-pulse rounded-2xl bg-slate-50/50 dark:bg-slate-900/30" />
        );
    }

    return (
        <div className="mt-16 w-full overflow-hidden rounded-2xl bg-slate-50/50 py-6 dark:bg-slate-900/30">
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client={ADSENSE_CLIENT}
                data-ad-slot={ADSENSE_SLOT}
            />
        </div>
    );
}
