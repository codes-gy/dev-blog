'use client';
import Image from 'next/image';
import { useTranslations } from 'use-intl';

export default function ProfileAvatar() {
    const t = useTranslations('Profile');
    return (
        <div className="flex flex-shrink-0 flex-col items-center">
            {/*<div*/}
            {/*    className="mb-4 flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-4xl font-bold text-white shadow-md">*/}
            {/*    👨‍💻*/}
            {/*</div>*/}
            <div className="relative mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md dark:border-slate-800 dark:bg-slate-800">
                <Image
                    src="/FILE000.jpg" // 💡 public/profile.png 파일을 가리킵니다.
                    alt={`${t('name')} avatar`} // 스크린 리더 및 SEO를 위한 alt 설정
                    width={128} // h-32 (32 * 4 = 128px)
                    height={128} // w-32
                    priority // 💡 프로필은 첫 화면에 중요하게 노출되므로 우선순위 로딩 부여
                    className="h-full w-full object-cover transition duration-300 hover:scale-105" // 살짝 확대되는 마우스 호버 효과 가미
                />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-200">{t('name')}</span>
            <span className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">{t('role')}</span>
        </div>
    );
}
