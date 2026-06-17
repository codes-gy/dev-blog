import React from 'react';
import Link from 'next/link';
import { Post } from '@/src/types/notion';

interface RecentPostsWidgetProps {
    posts: Post[];
}

export default function RecentPostsWidget({ posts }: RecentPostsWidgetProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">최근 연동된 게시글 (최대 5개)</h3>
                <Link
                    href="/admin/posts"
                    className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                >
                    전체 보기 ↗
                </Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {posts.map((post: Post) => (
                    <div key={post.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                        <div className="truncate pr-4">
                            <Link
                                href={`/posts/${post.slug || post.id}`}
                                className="block truncate text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                            >
                                {post.title}
                            </Link>
                            <span className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                {post.category || '카테고리 없음'}
                            </span>
                        </div>
                        <span className="shrink-0 text-xs text-slate-400">{post.publishedAt || '날짜 미지정'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
