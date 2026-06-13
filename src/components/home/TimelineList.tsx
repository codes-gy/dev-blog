'use client';
import { useTranslations } from 'use-intl';

export default function TimelineList() {
    const tHome = useTranslations('Home');
    const tTime = useTranslations('Timeline');
    return (
        <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">{tHome('experienceTimeline')}</h4>
            <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-start justify-between gap-3">
                    <span className="leading-normal text-slate-700 dark:text-slate-300">▫️ {tTime('event1')}</span>
                    <span className="shrink-0 font-normal whitespace-nowrap text-slate-400 dark:text-slate-500">
                        {tTime('date1')}
                    </span>
                </li>
                <li className="flex items-start justify-between gap-3">
                    <span className="leading-normal text-slate-700 dark:text-slate-300">▫️ {tTime('event2')}</span>
                    <span className="shrink-0 font-normal whitespace-nowrap text-slate-400 dark:text-slate-500">
                        {tTime('date2')}
                    </span>
                </li>
            </ul>
        </div>
    );
}
