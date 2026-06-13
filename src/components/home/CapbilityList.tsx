'use client';

import React from 'react';
import { useTranslations } from 'use-intl';

export default function CapabilityList() {
    const tHome = useTranslations('Home');
    const tCaps = useTranslations('Capabilities');
    return (
        <div className="w-full">
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">{tHome('coreCapabilities')}</h4>
            <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                <li>{tCaps('item1')}</li>
                <li>{tCaps('item2')}</li>
                <li>{tCaps('item3')}</li>
                <li>{tCaps('item4')}</li>
            </ul>
        </div>
    );
}
