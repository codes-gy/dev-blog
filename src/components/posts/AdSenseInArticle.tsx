'use client';

import { useEffect } from 'react';

interface AdSenseInArticleProps {
    client: string;
    slot: string;
}

interface AdsByGooglePush {
    (obj: Record<string, never>): void;
}

declare global {
    interface Window {
        adsbygoogle?: AdsByGooglePush[] | Record<string, unknown>[];
    }
}

export default function AdSenseInArticle({
    client,
    slot,
}: AdSenseInArticleProps) {
    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                const ads = window.adsbygoogle as unknown[];
                ads.push({});
            }
        } catch (e) {
            console.error('애드센스 초기화 에러:', e);
        }
    }, []);

    return (
        <div className="mt-16 w-full overflow-hidden rounded-2xl bg-slate-50/50 py-6 dark:bg-slate-900/30">
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client={client}
                data-ad-slot={slot}
            />
        </div>
    );
}
