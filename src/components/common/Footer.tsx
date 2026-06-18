'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-400 md:flex-row">
                {/* 개인정보처리방침 */}
                {pathname !== '/privacy' ? (
                    <div className="flex gap-4 font-medium text-slate-500 dark:text-slate-400">
                        <a
                            href="/privacy"
                            className="underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-800 dark:hover:text-slate-200"
                        >
                            개인정보처리방침
                        </a>
                    </div>
                ) : (
                    <div />
                )}

                {/* 저작권 표시 */}
                <p className="text-center text-[10px] leading-relaxed font-medium text-slate-500 md:text-right md:text-xs dark:text-slate-400">
                    © 2026 블로그의 모든 저작물은 무단 복제 및 배포를 금지합니다.
                </p>
            </div>
        </footer>
    );
}
