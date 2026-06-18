import React from 'react';
import Link from 'next/link';

export default function AdminHeader() {
    return (
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center dark:border-slate-800">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    관리자 센터
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    블로그의 전체 현황을 모니터링하고 관리합니다.
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <a
                    href="https://app.notion.com/p/37a48f9c47ee80468686e8c922f0ef9b?v=37a48f9c47ee806293b4000cae7d171c"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                    📝 노션 데이터베이스 이동
                </a>
                <Link
                    href="/admin/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                    📝 문의 내용 목록
                </Link>
            </div>
        </div>
    );
}
