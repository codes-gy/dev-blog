'use client';

import React, { useState } from 'react';
import { Post } from '@/src/types/notion';

interface SeoHealthWidgetProps {
    posts: Post[];
}

export default function SeoHealthWidget({ posts }: SeoHealthWidgetProps) {
    const [showDetail, setShowDetail] = useState(false);

    const missingTitles = posts.filter((post) => !post.title || post.title.trim() === '' || post.title === '제목 없음');
    const missingSlugs = posts.filter((post) => !post.slug || post.slug.trim() === '');
    const missingSummaries = posts.filter(
        (post) => !post.description || post.description.trim() === '' || post.description === '본문 요약문이 없습니다.',
    );
    const missingCategories = posts.filter(
        (post) =>
            !post.category ||
            post.category.trim() === '' ||
            post.category === '일반' ||
            post.category === '카테고리 없음',
    );

    const issuePosts = posts.filter((post) => {
        const isTitleMissing = !post.title || post.title.trim() === '' || post.title === '제목 없음';
        const isSlugMissing = !post.slug || post.slug.trim() === '';
        const isSummaryMissing =
            !post.description || post.description.trim() === '' || post.description === '본문 요약문이 없습니다.';
        const isCategoryMissing =
            !post.category ||
            post.category.trim() === '' ||
            post.category === '일반' ||
            post.category === '카테고리 없음';

        return isTitleMissing || isSlugMissing || isSummaryMissing || isCategoryMissing;
    });

    const totalIssueCount =
        missingTitles.length + missingSlugs.length + missingSummaries.length + missingCategories.length;
    const healthScore = Math.max(0, 100 - totalIssueCount * 4);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">🔍 SEO 메타데이터 진단</h3>
                    <p className="mt-0.5 text-xs text-slate-400">필수 검색 최적화 항목 누락 상태를 점검합니다.</p>
                </div>
                <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        healthScore >= 90
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                            : healthScore >= 70
                              ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
                              : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
                    }`}
                >
                    {healthScore}점
                </span>
            </div>

            <div className="space-y-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">📝 제목 누락</span>
                    <span className={`font-semibold ${missingTitles.length > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                        {missingTitles.length > 0 ? `🚨 ${missingTitles.length}건` : '✅ 정상'}
                    </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">🔗 URL 누락</span>

                    <span className={`font-semibold ${missingSlugs.length > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                        {missingSlugs.length > 0 ? `🚨 ${missingSlugs.length}건` : '✅ 정상'}
                    </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">📄 요약 누락</span>
                    <span
                        className={`font-semibold ${missingSummaries.length > 0 ? 'text-amber-500' : 'text-slate-400'}`}
                    >
                        {missingSummaries.length > 0 ? `⚠️ ${missingSummaries.length}건` : '✅ 정상'}
                    </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">📂 카테고리 미분류</span>
                    <span
                        className={`font-semibold ${missingCategories.length > 0 ? 'text-amber-500' : 'text-slate-400'}`}
                    >
                        {missingCategories.length > 0 ? `⚠️ ${missingCategories.length}건` : '✅ 정상'}
                    </span>
                </div>
            </div>

            <div className="mt-4">
                {issuePosts.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                                ⚠️ URL 최적화 및 검색 메타 수정이 필요한 글이 있습니다.
                            </p>
                            <button
                                onClick={() => setShowDetail(!showDetail)}
                                className="text-[11px] font-semibold text-slate-400 underline hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                {showDetail ? '접기' : '보기'}
                            </button>
                        </div>

                        {showDetail && (
                            <div className="mt-2 max-h-32 space-y-1 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-2 text-[11px] dark:border-slate-800/60 dark:bg-slate-950/40">
                                {issuePosts.map((post) => {
                                    const reasons = [];
                                    if (!post.title || post.title.trim() === '' || post.title === '제목 없음')
                                        reasons.push('제목');
                                    if (!post.slug || post.slug.trim() === '') reasons.push('슬러그');
                                    if (
                                        !post.description ||
                                        post.description.trim() === '' ||
                                        post.description === '본문 요약문이 없습니다.'
                                    )
                                        reasons.push('요약');
                                    if (
                                        !post.category ||
                                        post.category.trim() === '' ||
                                        post.category === '일반' ||
                                        post.category === '카테고리 없음'
                                    ) {
                                        reasons.push('카테고리');
                                    }

                                    return (
                                        <div
                                            key={post.id}
                                            className="flex items-center justify-between py-0.5 text-slate-600 dark:text-slate-400"
                                        >
                                            <span className="max-w-[150px] truncate font-medium">
                                                {post.title || '제목 없음 (ID 참고)'}
                                            </span>
                                            <span className="rounded bg-rose-50 px-1 text-[10px] text-rose-400 dark:bg-rose-950/20">
                                                {reasons.join(', ')} 누락
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="rounded-xl border border-emerald-100/50 bg-emerald-50/50 p-3 text-[11px] font-medium text-emerald-600 dark:border-emerald-900/30 dark:bg-emerald-950/10 dark:text-emerald-400">
                        모든 게시글의 필수 메타데이터가 정상 등록되어 SEO 상태를 유지하고 있습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
