import Link from 'next/link';
import { Post } from '@/src/types/notion';

interface PostNavigationProps {
    prevPost: Post | null;
    nextPost: Post | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
    if (!prevPost && !nextPost) return null;

    return (
        <nav className="mt-10 grid grid-cols-1 gap-4 border-t border-slate-100 pt-8 sm:grid-cols-2 dark:border-slate-800/60">
            {nextPost ? (
                <Link
                    href={`/posts/${nextPost.slug}`}
                    className="group flex flex-col rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-500 dark:border-slate-800 dark:hover:border-blue-400"
                >
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">다음 글</span>
                    <span className="mt-1 line-clamp-1 font-semibold text-slate-800 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                        {nextPost.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}

            {prevPost ? (
                <Link
                    href={`/posts/${prevPost.slug}`}
                    className="group flex flex-col rounded-xl border border-slate-200 p-4 text-right transition-colors hover:border-blue-500 sm:items-end dark:border-slate-800 dark:hover:border-blue-400"
                >
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">이전 글</span>
                    <span className="mt-1 line-clamp-1 font-semibold text-slate-800 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                        {prevPost.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}
        </nav>
    );
}
