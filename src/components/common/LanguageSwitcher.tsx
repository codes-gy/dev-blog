'use client';

import { usePathname, useRouter } from 'next/navigation';

const languages = [
    { code: 'ko', label: 'KO' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JA' },
];

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const currentLocale = pathname.split('/')[1] || 'ko';

    const changeLanguage = (locale: string) => {
        const segments = pathname.split('/');
        segments[1] = locale;
        router.push(segments.join('/'));
    };

    return (
        <div className="flex shrink-0 rounded-full border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-900">
            {languages.map((language) => (
                <button
                    key={language.code}
                    type="button"
                    onClick={() => changeLanguage(language.code)}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition sm:px-2.5 sm:py-1 sm:text-xs ${
                        currentLocale === language.code
                            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400'
                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                >
                    {language.label}
                </button>
            ))}
        </div>
    );
}
