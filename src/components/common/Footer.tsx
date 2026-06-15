export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-end gap-4 px-6 text-xs text-slate-400 md:flex-row">
                <p className="w-full text-center font-medium text-slate-500 md:text-right dark:text-slate-400">
                    © 2026 블로그의 모든 저작물은 무단 복제 및 배포를 금지합니다.
                </p>
            </div>
        </footer>
    );
}
