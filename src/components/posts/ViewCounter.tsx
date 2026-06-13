'use client';
import React, { useEffect, useState } from 'react';
import { incrementViews } from '@/src/app/actions/api';
import { useTranslations } from 'use-intl';

interface ViewCounterProps {
    slug: string;
    initialViews: number;
}
export default function ViewCounter({ slug, initialViews }: ViewCounterProps) {
    const [views, setViews] = useState(initialViews);
    const tPost = useTranslations('Post');
    useEffect(() => {
        async function updateViews() {
            const response = await incrementViews(slug);
            if (response && response.views > 0) {
                setViews(response.views);
            }
        }
        void updateViews();
    }, [slug]);

    return (
        <span className="leading-none font-medium text-slate-500 dark:text-slate-400">
            {tPost('views', { count: views })}
        </span>
    );
}
