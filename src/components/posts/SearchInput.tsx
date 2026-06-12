'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get('search') || '';
    const currentTag = searchParams.get('tag') || '전체';

    // 입력값을 담는 핵심 로컬 상태
    const [text, setText] = useState(currentSearch);

    // 이전 태그와 이전 검색어 상태를 기억해두는 백업 상태
    const [prevTag, setPrevTag] = useState(currentTag);
    const [prevSearch, setPrevSearch] = useState(currentSearch);

    // 렌더링 흐름 속에서 상태를 즉시 동기화 (useEffect 대체 패턴)
    if (currentTag !== prevTag || currentSearch !== prevSearch) {
        setPrevTag(currentTag);
        setPrevSearch(currentSearch);
        setText(currentSearch);
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());
        params.delete('cursor'); // 검색 시 페이징 초기화

        if (text.trim()) {
            params.set('search', text.trim());
        } else {
            params.delete('search');
        }

        if (currentTag && currentTag !== '전체') {
            params.set('tag', currentTag);
        }

        router.push(`/posts?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full sm:w-64">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="제목 입력..."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-1.5 pl-9 text-xs text-slate-900 placeholder-slate-400 transition-all duration-150 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-blue-400"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </form>
    );
}
