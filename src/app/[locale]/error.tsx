'use client'; // 💡 500 에러 파일은 무조건 'use client'가 필수입니다.
import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'use-intl';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    const t = useTranslations('Error');
    const params = useParams();

    // 주소창에서 현재 locale(ko, en, ja 등)을 안전하게 추출합니다. 기본값은 ko.
    const locale = params?.locale || 'ko';

    useEffect(() => {
        // 어떤 에러가 터졌는지 개발자 콘솔창에 확실하게 찍어줍니다.
        console.error('Captured 500 Server/Runtime Error:', error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
            {/* 500 에러를 강조하는 로즈/레드 계열 테마 */}
            <p className="mb-3 text-sm font-semibold text-rose-600">500 ERROR</p>

            {/* 언어팩 JSON에 매핑해둔 message("데이터를 불러오는 중 문제가 발생했습니다.")가 출력됩니다. */}
            <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">{t('message')}</h1>

            <div className="flex gap-4">
                {/* 1. 에러가 난 컴포넌트 영역만 다시 로드해보는 복구 버튼 */}
                <button
                    onClick={() => reset()}
                    className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                >
                    {t('retry')}
                </button>

                {/* 2. 안전한 메인 홈화면으로 탈출하는 버튼 */}
                <Link
                    href={`/${locale}`}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    {t('goHome')}
                </Link>
            </div>
        </div>
    );
}
