'use client';
import { useTranslations } from 'use-intl';
import CapabilityList from '@/src/components/home/CapbilityList';
import TimelineList from '@/src/components/home/TimelineList';

export default function ProfileDetails() {
    const t = useTranslations('Profile');
    return (
        <div className="w-full flex-1">
            <h2 className="mb-4 text-center text-2xl font-bold text-slate-950 md:text-left dark:text-slate-50">
                &#34;{t('title')}&#34;
            </h2>
            <p className="mb-6 text-justify text-sm leading-relaxed text-slate-600 md:text-left dark:text-slate-400">
                {t('description')}
            </p>
            <div className="grid grid-cols-1 gap-8 border-t border-slate-100 pt-6 md:grid-cols-2 dark:border-slate-800">
                <CapabilityList />
                <TimelineList />
            </div>
        </div>
    );
}
