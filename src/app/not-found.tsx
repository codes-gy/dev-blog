import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <p className="mb-3 text-sm font-semibold text-blue-600">404 ERROR</p>

            <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">페이지를 찾을 수 없습니다.</h1>

            <p className="mb-8 text-slate-500 dark:text-slate-400">요청하신 주소가 존재하지 않거나 이동되었어요.</p>

            <Link
                href="/ko"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
                홈으로 돌아가기
            </Link>
        </div>
    );
}
