import Script from 'next/script';
import '@/src/app/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DevLog.io | 개발자 기술 블로그',
    description: 'Next.js로 작성한 개발 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <body className="min-h-screen bg-slate-50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-100">
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3527850742207812"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />

                {children}
            </body>
        </html>
    );
}
