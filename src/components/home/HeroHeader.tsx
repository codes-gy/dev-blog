'use client';
import { useTranslations } from 'use-intl';

export default function HeroHeader() {
    const t = useTranslations('Home');
    return (
        <header className="mb-16 text-center">
            {/*
                <h1 className="text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4 animate-fade-in">
                    DevBLog<span className="text-blue-600">.io</span>
                </h1>
                */}
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                {/*단순히 코드를 작성하는 것을 넘어, 이유를 고민하고*/}
                {t('title')}
            </p>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                {/*경험을 기록하며 함께 성장하는 공간입니다.*/}
                {t('description')}
            </p>
        </header>
    );
}
