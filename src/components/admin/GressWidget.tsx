'use client';

import React from 'react';
import { Post } from '@/src/types/notion';

interface GrassWidgetProps {
    posts: Post[];
}

export default function GrassWidget({ posts }: GrassWidgetProps) {
    // 1. 최근 1년(365일) 동안의 날짜 구하기 (오늘부터 역산)
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setDate(today.getDate() - 364);

    // 날짜별 글 개수를 세기 위한 맵 생성
    const postCountMap: { [key: string]: number } = {};
    posts.forEach((post) => {
        if (post.publishedAt) {
            // 날짜 포맷 통일 (YYYY-MM-DD)
            const dateStr = new Date(post?.publishedAt).toISOString().split('T')[0];
            postCountMap[dateStr] = (postCountMap[dateStr] || 0) + 1;
        }
    });

    // 2. 365일 치 날짜 배열 생성
    const daysArray = [];
    const currentDate = new Date(oneYearAgo);
    while (currentDate <= today) {
        const dateStr = currentDate.toISOString().split('T')[0];
        daysArray.push({
            date: dateStr,
            count: postCountMap[dateStr] || 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // 3. 글 개수에 따른 테일윈드 색상 지정 함수
    const getGrassColor = (count: number) => {
        if (count === 0) return 'bg-slate-100 dark:bg-slate-800/50';
        if (count === 1) return 'bg-blue-200 dark:bg-blue-900/40 text-blue-800';
        if (count === 2) return 'bg-blue-400 dark:bg-blue-700 text-white';
        return 'bg-blue-600 dark:bg-blue-500 text-white'; // 3개 이상
    };

    // 총 기여도(글 수) 계산
    const totalContributions = posts.filter((post) => {
        if (!post.publishedAt) return false;
        const pDate = new Date(post.publishedAt);
        return pDate >= oneYearAgo && pDate <= today;
    }).length;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">연간 글 작성 이력</h3>
                    <p className="mt-0.5 text-xs text-slate-400">최근 1년간 블로그에 심은 잔디입니다.</p>
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    총 {totalContributions}개 발행
                </span>
            </div>

            {/* 🟩 잔디 그리드 컨테이너 */}
            <div className="overflow-x-auto pb-2">
                <div className="grid min-w-[700px] grid-flow-col grid-rows-7 gap-1.5">
                    {daysArray.map((day, index) => (
                        <div
                            key={index}
                            title={`${day.date}: 글 ${day.count}개`}
                            className={`h-3 w-3 rounded-[3px] transition-colors duration-200 hover:ring-2 hover:ring-slate-400 dark:hover:ring-slate-500 ${getGrassColor(
                                day.count,
                            )}`}
                        />
                    ))}
                </div>
            </div>

            {/* 하단 가이드 팁 */}
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-slate-400">
                <span>Less</span>
                <div className="h-2.5 w-2.5 rounded-[2px] bg-slate-100 dark:bg-slate-800/50" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-blue-200 dark:bg-blue-900/40" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-blue-400 dark:bg-blue-700" />
                <div className="h-2.5 w-2.5 rounded-[2px] bg-blue-600 dark:bg-blue-500" />
                <span>More</span>
            </div>
        </div>
    );
}
