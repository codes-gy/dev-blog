import React from 'react';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import Footer from '@/src/components/common/Footer';
import Header from '@/src/components/common/Header';

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export function generateStaticParams() {
    return [{ locale: 'ko' }, { locale: 'en' }, { locale: 'ja' }];
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { locale } = await params;

    const messages = await getMessages({ locale });

    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            {/* 🔹 1. 상단 고정 네비게이션 바 */}
            <NextIntlClientProvider locale={locale} messages={messages}>
                <div className="flex min-h-screen flex-col">
                    <Header />
                    {/* 🔹 2. 본문 */}
                    <main className="w-full flex-1 overflow-x-hidden">{children}</main>

                    {/* 🔹 3. 하단 저작권 표시 영역 (Footer) */}
                    <Footer />
                </div>
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}
