// tailwind.config.ts
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            // 🎯 여기에 노션의 폰트, 여백, 글머리 기호 디자인을 통째로 이식합니다.
            typography: {
                DEFAULT: {
                    css: {
                        color: '#37352f', // 노션 특유의 짙은 먹색 본문 컬러
                        lineHeight: '1.65',
                        fontSize: '16px',
                        h1: {
                            fontSize: '1.875rem', // H1 크기
                            fontWeight: '700',
                            marginBottom: '0.25em',
                            marginTop: '1.5em',
                            letterSpacing: '-0.02em',
                            color: '#37352f',
                        },
                        h2: {
                            fontSize: '1.5rem', // H2 크기
                            fontWeight: '600',
                            marginBottom: '0.25em',
                            marginTop: '1.4em',
                            color: '#37352f',
                        },
                        h3: {
                            fontSize: '1.25rem', // H3 크기
                            fontWeight: '600',
                            marginBottom: '0.25em',
                            marginTop: '1.2em',
                            color: '#37352f',
                        },
                        p: {
                            marginTop: '0px',
                            marginBottom: '4px', // 노션 블록 특유의 좁은 하단 여백 완벽 재현
                        },
                        ul: {
                            listStyleType: 'disc',
                            paddingLeft: '24px',
                            marginTop: '4px',
                            marginBottom: '4px',
                        },
                        li: {
                            marginTop: '2px',
                            marginBottom: '2px',
                            '&::marker': {
                                color: 'rgba(55, 53, 47, 0.45)', // 노션 리스트 점의 연한 회색 컬러
                            },
                        },
                    },
                },
                // 🎯 다크모드일 때의 노션 오피셜 컬러칩 대입
                invert: {
                    css: {
                        color: 'rgba(255, 255, 255, 0.9)', // 노션 다크모드 본문 글자색
                        h1: { color: 'rgba(255, 255, 255, 0.9)' },
                        h2: { color: 'rgba(255, 255, 255, 0.9)' },
                        h3: { color: 'rgba(255, 255, 255, 0.9)' },
                        li: {
                            '&::marker': {
                                color: 'rgba(255, 255, 255, 0.4)',
                            },
                        },
                    },
                },
            },
        },
    },
    plugins: [typography],
};

export default config;
