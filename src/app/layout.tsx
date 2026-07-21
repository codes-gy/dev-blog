import React, { Suspense } from 'react';
import Script from 'next/script';
import Loading from '@/src/app/loading';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Footer from '@/src/components/common/Footer';
import Header from '@/src/components/common/Header';
import './globals.css';

// 검색엔진 최적화(SEO)를 위한 메타데이터 설정
export const metadata: Metadata = {
    title: 'DevLog.io | 개발자 기술 블로그',
    description: 'Next.js로 작성한 개발 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-100">
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3527850742207812"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <Header />

                    <main className="flex-1">
                        <Suspense fallback={<Loading />}>{children} </Suspense>
                    </main>

                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
