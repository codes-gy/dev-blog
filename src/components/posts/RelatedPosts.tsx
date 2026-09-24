import { Post } from '@/src/types/notion';
import PostCard from '@/src/components/posts/PostCard';

interface RelatedPostsProps {
    posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null;

    return (
        <section className="mt-16 border-t border-slate-100 pt-10 dark:border-slate-800/60">
            <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-slate-50">함께 보면 좋은 글</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}
