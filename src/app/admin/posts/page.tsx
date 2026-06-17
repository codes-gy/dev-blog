import React from 'react';
import AdminPostTable from '@/src/components/admin/AdminPostTable';
import { getBlogPosts } from '@/src/lib/data/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPostsManagementPage() {
    // 💡 관리 목적이므로 넉넉하게 최근 100개의 글을 가져옵니다.
    const { posts } = await getBlogPosts(100);

    return (
        <div className="mx-auto min-h-screen max-w-6xl bg-slate-50 px-6 py-12 duration-200 dark:bg-slate-950">
            {/* 👑 상단 네비게이션 헤더 */}
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 dark:text-blue-400">
                        <a href="/admin" className="hover:underline">
                            관리자 센터
                        </a>
                        <span>&gt;</span>
                        <span className="text-slate-400">게시글 관리</span>
                    </div>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                        📑 콘텐츠 통합 관리
                    </h1>
                </div>

                <a
                    href="/admin"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    ← 대시보드로 돌아가기
                </a>
            </div>

            {/* 📊 독립된 페이징 테이블 배치 */}
            <div className="shadow-sm">
                <AdminPostTable posts={posts || []} />
            </div>
        </div>
    );
}
