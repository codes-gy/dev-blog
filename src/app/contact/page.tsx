'use client';

import React, { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admin/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok && result.success) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                alert(result.message || result.error || '메시지 전송에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('문의하기 전송 오류:', error);
            alert('메시지 전송에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-16 dark:bg-slate-950">
            <article className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:rounded-2xl md:p-12 dark:border-slate-800 dark:bg-slate-900">
                {/* 상단 헤더 */}
                <header className="border-b border-slate-100 pb-4 text-center md:pb-6 dark:border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-slate-50">
                        문의하기
                    </h1>
                    <p className="mt-1.5 text-[12px] text-slate-500 md:mt-2 md:text-sm dark:text-slate-400">
                        제안, 피드백 또는 문의 사항을 남겨주세요.
                    </p>
                </header>

                {/* 완료 메시지 */}
                {isSubmitted ? (
                    <div className="animate-fade-in mt-8 py-12 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500 dark:bg-green-950/30 dark:text-green-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h2 className="text-base font-bold text-slate-900 md:text-lg dark:text-slate-50">
                            메시지가 성공적으로 전송되었습니다!
                        </h2>
                        <p className="mt-1 text-xs text-slate-500 md:text-sm dark:text-slate-400">
                            소중한 의견 감사드리며, 확인 후 빠른 시일 내에 답변드리겠습니다.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="mt-6 inline-flex text-xs font-semibold text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            추가 문의 작성하기
                        </button>
                    </div>
                ) : (
                    /* 문의 입력 폼 */
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 text-sm md:mt-8 md:gap-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="name"
                                    className="text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300"
                                >
                                    이름
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="이름을 입력해주세요"
                                    className="rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-[13px] text-slate-900 transition outline-none focus:border-slate-400 focus:bg-white md:py-2.5 md:text-sm dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-50 dark:focus:border-slate-600 dark:focus:bg-slate-950"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="email"
                                    className="text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300"
                                >
                                    회신받을 이메일 주소
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className="rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-[13px] text-slate-900 transition outline-none focus:border-slate-400 focus:bg-white md:py-2.5 md:text-sm dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-50 dark:focus:border-slate-600 dark:focus:bg-slate-950"
                                />
                            </div>
                        </div>

                        {/* 제목 */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="subject"
                                className="text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300"
                            >
                                제목
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="문의 제목을 입력해주세요"
                                className="rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-[13px] text-slate-900 transition outline-none focus:border-slate-400 focus:bg-white md:py-2.5 md:text-sm dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-50 dark:focus:border-slate-600 dark:focus:bg-slate-950"
                            />
                        </div>

                        {/* 내용 */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="message"
                                className="text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300"
                            >
                                문의 내용
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="내용을 자세히 적어주시면 정확한 답변에 도움이 됩니다."
                                className="resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-[13px] text-slate-900 transition outline-none focus:border-slate-400 focus:bg-white md:py-2.5 md:text-sm dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-50 dark:focus:border-slate-600 dark:focus:bg-slate-950"
                            />
                        </div>

                        {/* 개인정보 안내 가이드 */}
                        <p className="text-[11px] leading-normal text-slate-400 md:text-[12px] dark:text-slate-500">
                            * 문의 접수를 위해 입력하신 이름과 이메일 주소는 오직 문의 답변 및 회신 목적으로만 사용되며,
                            관련 조치가 완료된 후 지체 없이 영구 파기됩니다. 이에 동의하시는 경우에만 발송해 주시기
                            바랍니다.
                        </p>

                        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                            {/* [버튼 1] 메시지 보내기 */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 md:py-3 md:text-sm dark:bg-blue-500 dark:hover:bg-blue-400"
                            >
                                {isSubmitting ? '전송 중...' : '메시지 보내기'}
                            </button>

                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a
                                href="/"
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] md:py-3 md:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="h-3.5 w-3.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                                홈으로 돌아가기
                            </a>
                        </div>
                    </form>
                )}
            </article>
        </div>
    );
}
