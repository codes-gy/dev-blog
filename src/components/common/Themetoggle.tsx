'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setMounted(true);
        });
    }, []);

    if (!mounted) return <div className="h-9 w-9" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg bg-slate-100 p-2 text-lg transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}
