'use client';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 backdrop-blur-md dark:bg-slate-950/80">
            <div className="flex flex-col items-center gap-5 text-center">
                {/* 🎨 세련된 그라데이션 테두리 스피너 */}
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200/60 border-t-blue-600 dark:border-slate-800/60 dark:border-t-cyan-400" />
                    {/* 뒤에 은은한 네온 불빛 효과 (Glow) */}
                    <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/10 blur-xl dark:bg-cyan-400/10" />
                </div>

                {/* 텍스트 스타일 가독성 업그레이드 */}
                <div className="space-y-1 select-none">
                    <p className="text-base font-extrabold tracking-wide text-slate-800 dark:text-slate-200">
                        페이지를 불러오는 중...
                    </p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500">잠시만 기다려주세요...</p>
                </div>
            </div>
        </div>
    );
}
