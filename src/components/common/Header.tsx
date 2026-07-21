import Link from 'next/link';
import ThemeToggle from '@/src/components/common/Themetoggle';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                {/* 로고 */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80"
                >
                    DevBLog<span className="text-blue-600">.io</span>
                </Link>

                {/* 우측 메뉴 */}
                <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
                    <Link href="/posts" className="transition-colors hover:text-blue-600">
                        Posts
                    </Link>
                    <a
                        href="https://github.com/codes-gy/"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-blue-600"
                    >
                        GitHub
                    </a>

                    {/* 다크모드 */}
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
