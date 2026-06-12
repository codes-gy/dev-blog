import Link from 'next/link';
import ThemeToggle from '@/src/components/common/Themetoggle';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                {/* 로고 (누르면 홈으로 이동) */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80"
                >
                    DevBLog<span className="text-blue-600">.io</span>
                </Link>

                {/* 우측 메뉴 버튼들 */}
                <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
                    {/* hover:text-blue-600: 글자에 마우스를 올리면 파란색으로 변경 */}
                    <Link
                        href="/posts"
                        className="transition-colors hover:text-blue-600"
                    >
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

                    {/* 개발자 블로그의 감성을 더해줄 임시 다크모드 배지 */}
                    {/*<button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-base transition-colors">*/}
                    {/*    🌙*/}
                    {/*</button>*/}
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
