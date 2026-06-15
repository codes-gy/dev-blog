import React, { Suspense } from 'react';
import Script from 'next/script';
import Loading from '@/src/app/loading';
import { Subscript } from 'lucide-react';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Footer from '@/src/components/common/Footer';
import Header from '@/src/components/common/Header';
import './globals.css';

// 1. 블로그의 검색엔진 최적화(SEO)를 위한 기본 메타데이터 설정
export const metadata: Metadata = {
    title: 'DevLog.io | 개발자 기술 블로그',
    description: 'Next.js로 작성한 개발 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // html과 body 태그는 Next.js 최상위 layout.tsx에 반드시 포함되어야 합니다.
        // text-slate-800: 전체 기본 글자색을 부드러운 회색으로 설정
        <html lang="ko" suppressHydrationWarning>
            <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-100">
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3527850742207812"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <ThemeProvider attribute="class" defaultTheme="dark">
                    {/* 🔹 1. 상단 고정 네비게이션 바 (Header) */}
                    {/* sticky top-0: 스크롤을 내려도 화면 맨 위에 착 붙어서 고정됨 */}
                    {/* backdrop-blur-md bg-white/80: 헤더 배경을 반투명하게 만들어 뒤에 지나가는 글씨가 예쁘게 비치도록 연출 */}
                    <Header />

                    {/* 🔹 2. 진짜 바뀌는 페이지 내용들이 들어가는 공간 (Main) */}
                    {/* flex-1: 헤더와 푸터를 제외한 중간의 남은 모든 공간을 꽉 채우도록 설정 */}
                    <main className="flex-1">
                        <Suspense fallback={<Loading />}>{children} </Suspense>
                        {/* 여기에 우리가 아까 만든 page.tsx 내용이 주입됩니다! */}
                    </main>

                    {/* 🔹 3. 하단 저작권 표시 영역 (Footer) */}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
