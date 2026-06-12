import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  {
    rules: {
      // 1. 쌍따옴표(") 대신 홑따옴표(') 사용 강제
      quotes: ['error', 'single', { avoidEscape: true }],

      // 2. 세미콜론(;) 항상 붙이기 (코드 정렬/안정성용)
      semi: ['error', 'always'],

      // 3. 들여쓰기 2칸으로 자동 교정 (정렬 관련)
      indent: 'off',

      // 4. 객체나 배열 정의 시 마지막 콤마(,) 자동 추가 (정렬 시 줄바꿈 오류 방지)
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/**', // 👈 이미지나 정적 파일이 들어가는 폴더 제외
    '**/*.min.js', // 👈 압축된 외부 자바스크립트 파일 제외
    'node_modules/**', // 👈 노드 모듈 폴더 제외
  ]),
]);

export default eslintConfig;
