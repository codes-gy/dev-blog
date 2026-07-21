'use client';

import React, { useEffect, useState } from 'react';
import { incrementLikes } from '@/src/app/actions/api';

interface LikeButtonProps {
    slug: string;
    initialLikes: number;
}

export default function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isAnimate, setIsAnimate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsMounted(true);
            try {
                const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
                if (Array.isArray(likedPosts) && likedPosts.includes(slug)) {
                    setHasLiked(true);
                }
            } catch (error) {
                console.error('로컬 스토리지 읽기 실패:', error);
            }
        });
    }, [slug]);

    const handleLikeClick = async () => {
        if (hasLiked || isAnimate || isLoading) return;

        setIsAnimate(true);
        setIsLoading(true);

        setTimeout(() => setIsAnimate(false), 300);

        const updated = await incrementLikes(slug);
        if (updated) {
            setLikes(updated.likes);
            setHasLiked(true);
            try {
                const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
                if (!likedPosts.includes(slug)) {
                    likedPosts.push(slug);
                    localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
                }
            } catch (error) {
                console.error('로컬 스토리지 읽기 실패:', error);
            }
        }
        setIsLoading(false);
    };

    if (!isMounted) {
        return (
            <button
                disabled
                className="flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-gray-700 opacity-60 dark:border-slate-800 dark:text-slate-300"
            >
                <span className="opacity-60">❤️</span>
                <span className="text-sm font-semibold">{initialLikes}</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleLikeClick}
            disabled={hasLiked || isLoading}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 shadow-sm transition-all duration-300 active:scale-95 ${
                hasLiked
                    ? 'border-red-300 bg-red-50 text-red-600 opacity-100 hover:border-red-400 hover:bg-red-200/70 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300 dark:hover:border-red-400 dark:hover:bg-red-500/30'
                    : isAnimate
                      ? 'scale-110 border-red-400 bg-red-100 text-red-600 dark:border-red-400 dark:bg-red-900/60 dark:text-red-300'
                      : 'border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50/50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-red-500/30 dark:hover:bg-red-950/40 dark:hover:text-red-400'
            }`}
        >
            <span className={hasLiked ? 'animate-pulse' : 'opacity-60'}>❤️</span>
            <span className="text-sm font-semibold">{likes}</span>
        </button>
    );
}
