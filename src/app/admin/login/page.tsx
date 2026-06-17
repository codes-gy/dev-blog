'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginResponse {
    success?: boolean;
    message?: string;
}

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // 💡 TS6385 완벽 해결: Deprecated된 React 고유 핸들러 타입을 전혀 사용하지 않고,
    // 매개변수 e에 React가 새로 밀고 있는 인라인 서브밋 이벤트 타입을 직접 주입합니다.
    const handleSubmit = async (e: React.BaseSyntheticEvent<SubmitEvent, HTMLFormElement, HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const contentType = res.headers.get('content-type');
            let data: LoginResponse = {};

            if (contentType && contentType.includes('application/json')) {
                data = (await res.json()) as LoginResponse;
            } else {
                const textError = await res.text();
                throw new Error(textError || `서버 에러가 발생했습니다. (상태 코드: ${res.status})`);
            }

            if (!res.ok) {
                throw new Error(data.message || '로그인에 실패했습니다.');
            }

            router.push('/admin');
            router.refresh();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                        관리자 로그인
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">최고 관리자 인증이 필요합니다.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                        >
                            비밀번호 입력
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-blue-500 dark:focus:bg-slate-900"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500 disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400 dark:disabled:bg-blue-600/50"
                    >
                        {isLoading ? (
                            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        ) : (
                            '인증 및 입장'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
