export default function Loading() {
    return (
        <div className="mx-auto max-w-3xl animate-pulse px-6 py-12">
            {/* 제목이 들어갈 자리 뼈대 */}
            <div className="mb-6 h-10 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
            {/* 본문이 들어갈 자리 뼈대 */}
            <div className="space-y-4">
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
        </div>
    );
}
