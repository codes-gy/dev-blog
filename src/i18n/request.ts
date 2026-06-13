import { getRequestConfig } from 'next-intl/server';

const locales = ['ko', 'en', 'ja'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;

    const currentLocale: Locale = locale && locales.includes(locale as Locale) ? (locale as Locale) : 'ko';

    return {
        locale: currentLocale,
        messages: (await import(`../messages/${currentLocale}.json`)).default,
    };
});
