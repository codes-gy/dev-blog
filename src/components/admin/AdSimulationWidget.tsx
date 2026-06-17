'use client';

import React, { useState } from 'react';

export default function AdSimulationWidget() {
    const [visitors, setVisitors] = useState<number>(500); // 일일 방문자 수 기본값

    // 대략적인 애드센스 수익 계산 (1,000뷰당 약 $2 가정)
    const estimatedMonthlyRevenue = ((visitors * 30) / 1000) * 2;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-50">💰 애드센스 수익 시뮬레이터</h3>
            <p className="mb-4 text-xs text-slate-400">ca-pub-3527850742207812 활성화 상태</p>

            <div className="space-y-4">
                <div>
                    <div className="mb-1 flex justify-between text-xs font-medium">
                        <span className="text-slate-500 dark:text-slate-400">일일 예상 방문자 수</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                            {visitors.toLocaleString()} 명
                        </span>
                    </div>
                    <input
                        type="range"
                        min="100"
                        max="10000"
                        step="100"
                        value={visitors}
                        onChange={(e) => setVisitors(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600 dark:bg-slate-700"
                    />
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800/60 dark:bg-slate-950/50">
                    <p className="text-xs text-slate-400">예상 월간 수익</p>
                    <p className="mt-0.5 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        ${estimatedMonthlyRevenue.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
