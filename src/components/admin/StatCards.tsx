import React from 'react';

interface StatCardsProps {
    totalPostsCount: number;
    totalCategoriesCount: number;
    systemMessage: '정상' | '오류';
    errorMessage?: string;
}

export default function StatCards({
    totalPostsCount,
    totalCategoriesCount,
    systemMessage,
    errorMessage,
}: StatCardsProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 전체 게시글 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">전체 게시글</p>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{totalPostsCount}개</p>
            </div>

            {/* 활성화된 카테고리 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">활성화된 카테고리</p>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{totalCategoriesCount}개</p>
            </div>

            {/* 노션 연동 상태 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">노션 연동 상태</p>
                <div
                    className={`mt-2 flex items-center gap-2 text-xl font-bold ${
                        systemMessage === '정상'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                    }`}
                >
                    <span className="relative flex h-3 w-3">
                        <span
                            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                                systemMessage === '정상' ? 'bg-emerald-400' : 'bg-rose-400'
                            }`}
                        ></span>
                        <span
                            className={`relative inline-flex h-3 w-3 rounded-full ${
                                systemMessage === '정상' ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                        ></span>
                    </span>
                    {systemMessage}
                </div>
                {systemMessage !== '정상' && errorMessage && (
                    <p className="mt-1.5 text-xs leading-tight font-medium text-slate-400 dark:text-slate-500">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
}
