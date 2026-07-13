import React from 'react';

export default function TimelineList() {
    return (
        <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">💼 경험 사항</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex justify-between gap-4">
                    <span className="text-slate-700 dark:text-slate-300">▫️ 코드잇 부트캠프 수료</span>
                    <span className="shrink-0 font-normal text-slate-400 dark:text-slate-500">2025.10 ~ 2026.06</span>
                </li>
                <li className="flex justify-between gap-4">
                    <span className="text-slate-700 dark:text-slate-300">▫️ SQLD 취득</span>
                    <span className="shrink-0 font-normal text-slate-400 dark:text-slate-500">2024.09</span>
                </li>
                <li className="flex justify-between gap-4">
                    <span className="text-slate-700 dark:text-slate-300">▫️ 정보처리기사 취득</span>
                    <span className="shrink-0 font-normal text-slate-400 dark:text-slate-500">2024.09</span>
                </li>
            </ul>
        </div>
    );
}
