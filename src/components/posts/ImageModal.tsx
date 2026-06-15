'use client';

interface ImageModalProps {
    src: string;
    onClose: () => void;
}

export default function ImageModal({ src, onClose }: ImageModalProps) {
    return (
        <div
            className="animate-fade-in fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative max-h-[90vh] max-w-[90vw]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt="확대된 이미지"
                    className="mx-auto max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
                />
                <button
                    className="absolute -top-10 right-0 text-sm font-semibold text-white hover:text-slate-300 md:text-base"
                    onClick={onClose}
                >
                    닫기 ✕
                </button>
            </div>
        </div>
    );
}
