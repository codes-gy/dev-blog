'use client';

import React, { useEffect, useState } from 'react';
import { ShareButtonsProps } from '@/src/types/notion';

export default function ShareButtons({ slug, title, description, coverImage }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/posts/${slug}` : '';

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.Kakao) {
            const script = document.createElement('script');
            script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
            script.integrity = 'sha384-TiCUE00h649CAMonG018J2FOGLYHxaRNAqbGxDxmgDgOtAC69GHC9r1gI7QV989O';
            script.crossOrigin = 'anonymous';
            script.async = true;
            script.onload = () => {
                if (window.Kakao && !window.Kakao.isInitialized()) {
                    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY || '');
                }
            };
            document.head.appendChild(script);
        }
    }, []);

    const shareToKakao = () => {
        if (!window.Kakao) return;
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: description,
                imageUrl: coverImage,
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl,
                },
            },
            buttons: [
                {
                    title: '글 보러가기',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
            ],
        });
    };

    const shareToFacebook = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(`${facebookShareUrl}`, '_blank', 'width=1200,height=600');

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            const userConfirmed = window.confirm('페이스북 앱 또는 웹으로 이동하여 이 글을 공유하시겠습니까?');
            if (userConfirmed) {
                window.open(facebookShareUrl, '_blank');
            }
            return;
        }
    };

    const copyToClipboard = async () => {
        if (!shareUrl) return;
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                소셜 공유하기
            </span>
            <div className="flex items-center gap-3">
                {/* 카카오톡 */}
                <button
                    onClick={shareToKakao}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEE500] text-[#191919] shadow-sm transition hover:scale-105 active:scale-95"
                    title="카카오톡 공유하기"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.903 1.905 5.45 4.776 6.845-.145.542-.524 1.956-.6 2.24-.097.365.127.36.267.266.111-.074 1.767-1.196 2.474-1.682.355.056.717.086 1.083.086 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                    </svg>
                </button>

                {/* 페이스북 */}
                <button
                    onClick={shareToFacebook}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:scale-105 active:scale-95"
                    title="페이스북 공유하기"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 12.991 22 12z" />
                    </svg>
                </button>

                {/* URL 복사 */}
                <button
                    onClick={copyToClipboard}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105 hover:border-slate-300 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700"
                    title="링크 복사하기"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                        />
                    </svg>
                </button>
            </div>

            {copied && (
                <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-bounce rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg dark:bg-white dark:text-slate-900">
                    🔗 링크가 클립보드에 복사되었습니다!
                </div>
            )}
        </div>
    );
}
