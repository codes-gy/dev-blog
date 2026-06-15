import Link from 'next/link';
import { Post } from '@/src/types/notion';
import PostCard from '@/src/components/posts/PostCard';

interface LatestPostsSectionProps {
    posts: Post[];
}

export default function LatestPostsSection({ posts }: LatestPostsSectionProps) {
    return (
        <section>
            <div className="mb-8 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                    🌳 새로 올라온 글
                    <span className="text-xs font-normal text-slate-400 dark:text-slate-500">(Latest Posts)</span>
                </h3>
                <Link
                    href="/posts"
                    className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline dark:text-blue-400"
                >
                    전체 글 보기 →
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-400">아직 발행된 게시글이 없습니다.</div>
            ) : (
                <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {posts.map((post: Post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </main>
            )}
        </section>
    );
}
