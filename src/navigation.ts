// src/navigation.ts
import { createNavigation } from 'next-intl/navigation';

export const locales = ['ko', 'en', 'ja'] as const;
export const localePrefix = 'always'; // 주소창에 항상 언어 표기 (/ko, /en)

// 최신 버전의 단출하고 직관적인 createNavigation 함수를 사용합니다.
export const { Link, redirect, usePathname, useRouter } = createNavigation({
    locales,
    localePrefix,
});
