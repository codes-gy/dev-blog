'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    // 현재 경로와 메뉴 링크가 일치하는지 확인하는 함수
    const isActive = (path: string) => pathname === path;

    // 공통 메뉴 스타일 지정 함수 (활성화 상태에 따라 다름)
    const getLinkStyle = (path: string) => {
        const baseStyle = 'transition-colors underline-offset-4';

        if (isActive(path)) {
            // 선택된 상태: 글자색 강조 + 밑줄 추가
            return `${baseStyle} font-bold text-slate-900 underline decoration-slate-400 dark:text-slate-100 dark:decoration-slate-600`;
        }
        // 기본 상태
        return `${baseStyle} hover:text-slate-800 dark:hover:text-slate-200 hover:underline hover:decoration-slate-300`;
    };

    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-400 md:flex-row">
                {/* 💡 애드센스 승인용 핵심 필수 메뉴 그룹 */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium text-slate-500 dark:text-slate-400">
                    {/* 개인정보처리방침은 법적 중요도를 고려하여 비활성화 상태에서도 font-bold 유지 */}
                    <Link
                        href="/privacy"
                        className={
                            isActive('/privacy')
                                ? getLinkStyle('/privacy')
                                : 'font-bold text-slate-600 transition-colors hover:text-slate-800 hover:underline hover:decoration-slate-300 dark:text-slate-400 dark:hover:text-slate-200'
                        }
                    >
                        개인정보처리방침
                    </Link>

                    <Link href="/terms" className={getLinkStyle('/terms')}>
                        서비스 이용약관
                    </Link>
                </div>

                {/* 저작권 표시 */}
                <p className="text-center text-[10px] leading-relaxed font-medium text-slate-500 md:text-right md:text-xs dark:text-slate-400">
                    © 2026 블로그의 모든 저작물은 무단 복제 및 배포를 금지합니다.
                </p>
            </div>
        </footer>
    );
}
