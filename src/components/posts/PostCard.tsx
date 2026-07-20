import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    publishedAt: string;
    category: string;
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link
            href={`/posts/${post.slug}`}
            key={post.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 dark:hover:border-blue-400"
        >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-200 dark:bg-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm dark:bg-slate-950/80">
                    {post.category}
                </span>
            </div>

            <div className="p-6">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{post.publishedAt}</span>

                <h2 className="mt-2 mb-3 line-clamp-2 text-lg font-bold break-keep text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-200">
                    {post.title}
                </h2>

                <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {post.description}
                </p>

                <div className="mt-4 flex items-center border-t border-slate-400 pt-4 text-sm font-semibold text-blue-500 dark:border-slate-700">
                    더 읽어보기 <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
            </div>
        </Link>
    );
}
