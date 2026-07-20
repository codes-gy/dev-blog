'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get('search') || '';
    const currentTag = searchParams.get('tag') || '전체';

    const [text, setText] = useState(currentSearch);

    const [prevTag, setPrevTag] = useState(currentTag);
    const [prevSearch, setPrevSearch] = useState(currentSearch);

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

    const handleClear = () => {
        setText('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        params.delete('cursor');
        router.push(`/posts?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-slate-500">
                <svg
                    className={`h-5 w-5 transition-colors duration-200 ${text ? 'text-emerald-500 dark:text-emerald-400' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <input
                type="text"
                value={text}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    setText(e.target.value);
                    if (inputValue.trim() === '') {
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete('cursor');
                        params.delete('search');
                        router.push(`/posts?${params.toString()}`);
                    }
                }}
                placeholder="게시글 제목 입력..."
                className="dark:border-slate-750 w-full rounded-2xl border border-slate-300 bg-white py-3.5 pr-12 pl-12 text-sm text-slate-900 shadow-md transition-all duration-200 outline-none placeholder:text-slate-400/90 hover:border-slate-400 hover:shadow-lg focus:border-emerald-500 focus:ring-4 focus:shadow-emerald-500/5 focus:ring-emerald-500/10 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:hover:shadow-black/40 dark:focus:border-emerald-500 dark:focus:ring-emerald-400/10"
            />

            {text && (
                <div className="absolute inset-y-0 right-4 flex items-center">
                    <button
                        type="button"
                        onClick={handleClear}
                        className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </form>
    );
}
