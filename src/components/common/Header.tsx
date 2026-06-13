import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/src/components/common/LanguageSwitcher';
import ThemeToggle from '@/src/components/common/Themetoggle';

export default async function Header() {
    const locale = await getLocale();
    const t = await getTranslations('Navigation');

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
            <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
                <Link
                    href={`/${locale}`}
                    className="shrink-0 text-lg font-extrabold tracking-tight text-slate-900 transition-opacity hover:opacity-80 sm:text-xl dark:text-slate-50"
                >
                    DevBLog<span className="text-blue-600">.io</span>
                </Link>

                <nav className="flex min-w-0 shrink-0 items-center gap-2 text-sm font-medium text-slate-600 sm:gap-4 dark:text-slate-300">
                    <Link
                        href={`/${locale}/posts`}
                        className="rounded-full px-2 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 sm:px-3 dark:hover:bg-slate-800"
                    >
                        {t('posts')}
                    </Link>

                    <a
                        href="https://github.com/codes-gy/"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden rounded-full px-3 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 sm:inline-block dark:hover:bg-slate-800"
                    >
                        GitHub
                    </a>

                    <div className="hidden h-5 w-px bg-slate-200 sm:block dark:bg-slate-700" />

                    <LanguageSwitcher />

                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
