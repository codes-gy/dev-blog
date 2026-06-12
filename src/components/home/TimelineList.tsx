export default function TimelineList() {
    return (
        <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                💼 Experience & Timeline
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-300">
                        ▫️ 코드잇 부트캠프 수료
                    </span>
                    <span className="font-normal text-slate-400 dark:text-slate-500">
                        2025.10 ~ 2026.06
                    </span>
                </li>
                <li className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-300">
                        ▫️ 오픈소스 컨트리뷰션 오픈랩 참여
                    </span>
                    <span className="font-normal text-slate-400 dark:text-slate-500">
                        2024.03 ~ 2024.06
                    </span>
                </li>
            </ul>
        </div>
    );
}
