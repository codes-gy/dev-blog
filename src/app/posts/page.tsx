import { Post } from '@/src/types/notion';
import NotionLiveRefresh from '@/src/components/common/NotionLiveRefresh';
import PaginationBar from '@/src/components/posts/PaginationBar';
import PostCard from '@/src/components/posts/PostCard';
import PostHeader from '@/src/components/posts/PostHeader';
import CategoryList from '@/src/components/posts/search/CategoryList';
import SearchInput from '@/src/components/posts/search/SearchInput';
import { getAllCategories, getBlogPosts } from '@/src/lib/data/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
    searchParams: Promise<{
        cursor?: string;
        tag?: string;
        search?: string;
    }>;
}

export default async function AllPostsPage({ searchParams }: Props) {
    const { cursor, tag, search } = await searchParams;
    const currentTag = tag || '전체';
    const currentSearch = search || '';
    const categories = await getAllCategories();
    const { posts, nextCursor } = await getBlogPosts(6, cursor, currentTag, currentSearch);

    return (
        <div className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-6 py-12 duration-200 dark:bg-slate-950">
            <NotionLiveRefresh />

            <PostHeader />

            {/* 검색 */}
            <div className="mb-10 w-full max-w-xl md:max-w-2xl">
                <SearchInput />
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                <aside className="w-full md:sticky md:top-24 md:w-64 md:shrink-0">
                    <h3 className="mb-5 hidden text-sm font-extrabold tracking-widest text-slate-500 uppercase md:block md:border-b md:border-slate-200 md:pb-2 dark:text-slate-400 md:dark:border-slate-800">
                        카테고리
                    </h3>
                    <CategoryList categories={categories} currentTag={currentTag} />
                </aside>

                <div className="min-w-0 flex-1">
                    {posts.length === 0 ? (
                        <div className="py-24 text-center text-slate-400">
                            등록된 게시글이 없거나 마지막 페이지입니다.
                        </div>
                    ) : (
                        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                            {posts.map((post: Post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </main>
                    )}

                    {/* 페이징 */}
                    <div className="mt-12">
                        <PaginationBar cursor={cursor} nextCursor={nextCursor} />
                    </div>
                </div>
            </div>
        </div>
    );
}
