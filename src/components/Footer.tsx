export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-8">
            <div
                className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <p>© 2026 DevLog.io. All rights reserved.</p>
                {/*
                <div className="flex gap-4">*/}
                {/*    <span className="hover:underline cursor-pointer">개인정보처리방침</span>*/}
                {/*    <span className="hover:underline cursor-pointer">이용약관</span>*/}
                {/*</div>
                */}
            </div>
        </footer>
    )
}