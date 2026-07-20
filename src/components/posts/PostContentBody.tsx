'use client';

import { useEffect, useRef, useState } from 'react';

interface PostContentBodyProps {
    contentHtml: string;
}

export default function PostContentBody({ contentHtml }: PostContentBodyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<string[]>([]);
    // -1은 모달이 닫힌 상태, 0 이상은 열린 상태
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    useEffect(() => {
        if (!containerRef.current) return;
        const imgElements = containerRef.current.querySelectorAll('img');
        const srcList = Array.from(imgElements).map((img) => img.src);
        setImages(srcList);
    }, [contentHtml]);
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (currentIndex === -1) return; // 모달이 닫혀있으면 무시

            if (e.key === 'Escape') {
                setCurrentIndex(-1);
            } else if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, handleNext, handlePrev, images]);

    const handleBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
            const imgSrc = (target as HTMLImageElement).src;
            const index = images.indexOf(imgSrc);
            if (index !== -1) {
                setCurrentIndex(index);
            }
        }
    };
    return (
        <>
            <div ref={containerRef} onClick={handleBodyClick}>
                <article
                    className="prose prose-lg dark:prose-invert notion-root-container prose-p:text-base prose-p:leading-8 prose-li:text-base prose-li:leading-8 prose-td:text-base prose-td:leading-7 prose-th:text-base prose-th:leading-7 prose-code:text-sm prose-pre:text-sm max-w-none font-sans select-text"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </div>

            {currentIndex !== -1 && images.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setCurrentIndex(-1)} />

                    <div className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center">
                        <button
                            className="absolute -top-12 right-0 text-lg font-bold text-white hover:text-slate-300"
                            onClick={() => setCurrentIndex(-1)}
                        >
                            닫기 ✕
                        </button>

                        {images.length > 1 && (
                            <button
                                onClick={handlePrev}
                                className="absolute -left-14 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 md:-left-20"
                            >
                                ‹
                            </button>
                        )}

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={images[currentIndex]}
                            alt={`확대 이미지 ${currentIndex + 1}`}
                            className="mx-auto max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl select-none"
                        />

                        {images.length > 1 && (
                            <button
                                onClick={handleNext}
                                className="absolute -right-14 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 md:-right-20"
                            >
                                ›
                            </button>
                        )}

                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-slate-400">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
