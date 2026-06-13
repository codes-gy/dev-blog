import React from 'react';

export default function TimelineList() {
    return (
        <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">💼 Experience & Timeline</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex justify-between gap-4">
                    <span className="text-slate-700 dark:text-slate-300">▫️ 코드잇 부트캠프 수료(Node.js)</span>
                    <span className="shrink-0 font-normal text-slate-400 dark:text-slate-500">2025.10 ~ 2026.06</span>
                </li>

                <li className="flex justify-between gap-4">
                    <span className="text-slate-700 dark:text-slate-300">▫️ DB 손해보험 백엔드 API 개발</span>
                    <span className="shrink-0 font-normal text-slate-400 dark:text-slate-500">2021.11 ~ 2025.07</span>
                </li>
                <li className="flex justify-between gap-4">
                    <span className="text-slate-700 dark:text-slate-300">▫️ SQLD 및 정보처리기사 취득</span>
                    <span className="shrink-0 font-normal text-slate-400 dark:text-slate-500">2024.09</span>
                </li>
                <li className="flex justify-between gap-4">
                    <span className="text-slate-700 dark:text-slate-300">▫️ 클래스베리 백엔드 API 개발</span>
                    <span className="shrink-0 font-normal text-slate-400 dark:text-slate-500">2018.04 ~ 2019.07</span>
                </li>
            </ul>
        </div>
    );
}
