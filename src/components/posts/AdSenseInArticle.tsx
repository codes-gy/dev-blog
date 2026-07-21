'use client';

import { useEffect } from 'react';
import { useMounted } from '@/src/hooks/useMounted';

const ADSENSE_CLIENT = process.env.GOOGLE_ADSENSE_CLIENT || '';
const ADSENSE_SLOT = process.env.GOOGLE_ADSENSE_SLOT || '';

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
