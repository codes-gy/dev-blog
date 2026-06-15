'use client';

import { useMounted } from '@/src/hooks/useMounted';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isMounted = useMounted();

    if (!isMounted) return <div className="h-9 w-9" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg bg-slate-100 p-2 text-lg transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}
