import NotionLiveRefresh from '@/src/components/common/NotionLiveRefresh';
import FeaturedProjects from '@/src/components/home/FeaturedProjects';
import { HeroHeader } from '@/src/components/home/HeroHeader';
import LatestPostsSection from '@/src/components/home/LatestPostsSection';
import Profile from '@/src/components/home/Profile';
import { getBlogPosts } from '@/src/lib/data/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogHomePage() {
    // 최신 글 4개만 깔끔하게 노출
    const { posts } = await getBlogPosts(4);

    return (
        <div className="mx-auto min-h-screen max-w-5xl bg-slate-50 px-6 py-12 duration-200 dark:bg-slate-950">
            <NotionLiveRefresh />
            {/* 상단 타이틀 브랜드 헤더 */}
            <HeroHeader />
            {/* 대형 프로필 & 자기소개 섹션 */}
            <Profile />
            {/* 주요 프로젝트 섹션 */}
            <FeaturedProjects />
            {/* 4️⃣ 최신 글 목록 섹션 */}
            <LatestPostsSection posts={posts} />
        </div>
    );
}
