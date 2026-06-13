import React from 'react';
import Link from 'next/link';

export default function PostHeader() {
    return (
        <header className="mb-10 flex items-end justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
                <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    전체 글 목록
                </h1>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    그동안 공부하고 정리한 기술 아카이브입니다.
                </p>
            </div>
            <Link href="/public" className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
                ← 홈으로
            </Link>
        </header>
    );
}
