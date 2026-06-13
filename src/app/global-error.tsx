'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html lang="ko">
            <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center font-sans dark:bg-slate-950">
                <div className="p-6">
                    <p className="text-sm font-semibold text-rose-600">CRITICAL ERROR</p>
                    <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                        시스템에 일시적인 문제가 발생했습니다.
                    </h1>
                    <button
                        onClick={() => reset()}
                        className="mt-6 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950"
                    >
                        다시 시도하기
                    </button>
                </div>
            </body>
        </html>
    );
}
