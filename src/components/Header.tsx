import Link from "next/link";
import ThemeToggle from "@/src/components/Themetoggle";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* 로고 (누르면 홈으로 이동) */}
                <Link href="/"
                      className="text-xl font-bold text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
                    🚀 Blog<span className="text-blue-600">.io</span>
                </Link>

                {/* 우측 메뉴 버튼들 */}
                <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
                    {/* hover:text-blue-600: 글자에 마우스를 올리면 파란색으로 변경 */}
                    <Link href="/posts" className="hover:text-blue-600 transition-colors">Posts</Link>
                    <a href="https://github.com/codes-gy/" target="_blank" rel="noreferrer"
                       className="hover:text-blue-600 transition-colors">
                        GitHub
                    </a>

                    {/* 개발자 블로그의 감성을 더해줄 임시 다크모드 배지 */}
                    {/*<button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-base transition-colors">*/}
                    {/*    🌙*/}
                    {/*</button>*/}
                    <ThemeToggle/>
                </nav>

            </div>
        </header>
    )
}