'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Comments() {
    const commentRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!commentRef.current) return;

        // 기존 댓글창 초기화 (테마 변경 시 중복 생성 방지)
        commentRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute(
            'data-repo',
            '여러분의-깃허브-이름/레포지토리-이름',
        );
        script.setAttribute('data-repo-id', 'giscus가 준 ID');
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', 'giscus가 준 카테고리 ID');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        // 테마에 맞춰 giscus 디자인도 함께 변경되게 설정합니다.
        script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
        script.setAttribute('data-lang', 'ko');
        script.crossOrigin = 'anonymous';
        script.async = true;

        commentRef.current.appendChild(script);
    }, [theme]); // 테마가 바뀔 때마다 댓글창 테마도 스위칭

    return <div ref={commentRef} className="mt-12" />;
}
