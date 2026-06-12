export default function Error({ reset }: { error: Error; reset: () => void }) {
    return (
        <div className="py-24 text-center">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">
                데이터를 불러오는 중 문제가 발생했습니다.
            </h2>
            <button
                onClick={() => reset()} // 다시 시도 기능
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
                다시 시도하기
            </button>
        </div>
    );
}
