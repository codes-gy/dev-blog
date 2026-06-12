'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Comments() {
    const commentRef = useRef<HTMLDivElement>(null);
    const { theme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    // 1. 하이드레이션 에러 방지를 위한 마운트 체크
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsMounted(true);
        });
    }, []);

    // 마운트 완료 시 Giscus 스크립트 로드
    useEffect(() => {
        if (!isMounted || !commentRef.current) return;

        // 기존에 렌더링된 Giscus iframe이나 script 찌꺼기를 제거
        commentRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';

        // GitHub 리포지토리 고유 정보
        script.setAttribute('data-repo', 'codes-gy/dev-blog');
        script.setAttribute('data-repo-id', 'R_kgDOS4W40w');
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', 'DIC_kwDOS4W4084C_CtX');

        // 포스트별 독립된 댓글 공간 식별 설정
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-lang', 'ko');

        const currentTheme = resolvedTheme || theme || 'light';
        script.setAttribute('data-theme', currentTheme === 'dark' ? 'dark_dimmed' : 'light');

        commentRef.current.appendChild(script);

        // 컴포넌트 언마운트 시 스크립트 실행 노드 제거
        return () => {
            if (commentRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                commentRef.current.innerHTML = '';
            }
        };
    }, [theme, resolvedTheme, isMounted]);

    if (!isMounted) {
        return <div className="mt-12 min-h-[300px]" />;
    }

    return (
        <section className="mt-12 w-full border-t border-slate-200 pt-10 dark:border-slate-800">
            <h2 className="mb-6 text-xl font-bold text-slate-950 dark:text-slate-50">💬 댓글 나누기</h2>
            <div ref={commentRef} className="min-h-[300px]" />
        </section>
    );
}
