import Link from 'next/link';

interface PaginationBarProps {
    cursor?: string;
    nextCursor?: string | null;
}

function PaginationBar({ cursor, nextCursor }: PaginationBarProps) {
    return (
        <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
            <Link
                href="/posts"
                className={`rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 ${
                    cursor ? '' : 'pointer-events-none opacity-40'
                }`}
            >
                ↩ 처음 페이지로
            </Link>

            {nextCursor ? (
                <Link
                    href={`/posts?cursor=${nextCursor}`}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                    다음 페이지 →
                </Link>
            ) : (
                <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-400 dark:bg-slate-900 dark:text-slate-600">
                    마지막 글입니다
                </span>
            )}
        </div>
    );
}

export default PaginationBar;
