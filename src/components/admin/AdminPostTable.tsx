'use client';

import React, { useState } from 'react';
import { Post } from '@/src/types/notion';

interface AdminPostTableProps {
    posts: Post[];
}

export default function AdminPostTable({ posts }: AdminPostTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">전체 게시글 통합 관리</h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                        문제가 있거나 수정이 필요한 글은 즉시 노션으로 이동해 편집합니다.
                    </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                    총 {posts.length}개 중 {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} 표시
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase dark:bg-slate-950/50 dark:text-slate-400">
                        <tr>
                            <th className="rounded-l-xl px-4 py-3">카테고리</th>
                            <th className="px-4 py-3">글 제목</th>
                            <th className="px-4 py-3">발행일</th>
                            <th className="rounded-r-xl px-4 py-3 text-right">작업</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {currentPosts.map((post) => (
                            <tr key={post.id} className="transition hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                                <td className="px-4 py-3.5 whitespace-nowrap">
                                    <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        {post.category || '일반'}
                                    </span>
                                </td>
                                <td className="max-w-md truncate px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-200">
                                    {post.title || '제목 없음'}
                                </td>
                                <td className="px-4 py-3.5 text-xs whitespace-nowrap text-slate-400">
                                    {post.publishedAt || '날짜 미지정'}
                                </td>
                                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                    <a
                                        href={post.notionUrl || 'https://notion.so'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                                    >
                                        편집 📝
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🕹️ 페이지네이션 네비게이션 컨트롤러 */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-800 dark:hover:bg-slate-950"
                >
                    이전
                </button>

                <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{currentPage}</span>
                    <span>/</span>
                    <span>{totalPages} 페이지</span>
                </div>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-800 dark:hover:bg-slate-950"
                >
                    다음
                </button>
            </div>
        </div>
    );
}
