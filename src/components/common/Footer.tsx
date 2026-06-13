'use client';
import { useTranslations } from 'use-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-end gap-4 px-6 text-xs text-slate-400 md:flex-row">
                <p className="w-full text-center font-medium text-slate-500 md:text-right dark:text-slate-400">
                    {t('copyright')}
                </p>
            </div>
        </footer>
    );
}
