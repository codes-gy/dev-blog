import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
    const locale = await getLocale();
    const t = await getTranslations('Error');

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
            <p className="mb-3 text-sm font-semibold text-blue-600">404 ERROR</p>

            <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">{t('notFound')}</h1>

            <Link
                href={`/${locale}`}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
                {t('goHome')}
            </Link>
        </div>
    );
}
