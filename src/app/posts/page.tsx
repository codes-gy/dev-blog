import CategoryList from '@/src/components/posts/CategoryList';
import NotionLiveRefresh from '@/src/components/posts/NotionLiveRefresh';
import PaginationBar from '@/src/components/posts/PaginationBar';
import PostCard from '@/src/components/posts/PostCard';
import PostHeader from '@/src/components/posts/PostHeader';
import SearchInput from '@/src/components/posts/SearchInput';
import { Post, getAllCategories, getBlogPosts } from '@/src/lib/data';

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
        <div className="mx-auto min-h-screen max-w-5xl bg-slate-50 px-6 py-12 duration-200 dark:bg-slate-950">
            <NotionLiveRefresh />

            <PostHeader />

            {/* 카테고리 태그 목록과 실시간 검색창 필터 영역 */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <CategoryList categories={categories} currentTag={currentTag} />

                {/* 실시간 검색창 컴포넌트 */}
                <SearchInput />
            </div>
            {/* 게시글 렌더링 영역 */}
            {posts.length === 0 ? (
                <div className="py-24 text-center text-slate-400">등록된 게시글이 없거나 마지막 페이지입니다.</div>
            ) : (
                <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* 2. 이곳의 post 매개변수 뒤에 ': Post' 타입을 명시해 줍니다! */}
                    {posts.map((post: Post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </main>
            )}

            {/* 페이징 제어 바 */}
            <PaginationBar cursor={cursor} nextCursor={nextCursor} />
        </div>
    );
}
