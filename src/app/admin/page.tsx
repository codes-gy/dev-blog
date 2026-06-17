import React from 'react';
import Link from 'next/link';
import { Post } from '@/src/types/notion';
import AdminHeader from '@/src/components/admin/AdminHeader';
import CategoryChart from '@/src/components/admin/CategoryChart';
import CategoryListWidget from '@/src/components/admin/CategoryListWidget';
import GrassWidget from '@/src/components/admin/GressWidget';
import RecentPostsWidget from '@/src/components/admin/RecentPostsWidget';
import SeoHealthWidget from '@/src/components/admin/SeoHealthWidget';
import StatCards from '@/src/components/admin/StatCards';
import { getAllCategories, getBlogPosts } from '@/src/lib/data/api';
import { DATA_SOURCE_ID } from '@/src/lib/data/config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
    let data: string[] = [];
    let posts: Post[] = [];
    let systemMessage: '정상' | '오류' = '정상';

    if (!DATA_SOURCE_ID || !process.env.NOTION_API_KEY) {
        systemMessage = '오류';
    } else {
        try {
            data = await getAllCategories();
            const response = await getBlogPosts(100);
            posts = response.posts || [];
        } catch (error) {
            console.error('노션 API 실시간 연동 실패:', error);
            systemMessage = '오류';
        }
    }

    const categories = data ? data.filter((category) => category !== '전체') : [];

    const totalPostsCount = posts?.length || 0;
    const totalCategoriesCount = categories?.length || 0;

    // 노션 글 데이터를 기반으로 카테고리별 개수 연산
    const chartData = categories.map((category) => {
        const count = posts?.filter((post: Post) => post.category === category).length || 0;
        return {
            name: category,
            '글 개수': count,
        };
    });

    return (
        <div className="mx-auto min-h-screen max-w-6xl bg-slate-50 px-6 py-12 duration-200 dark:bg-slate-950">
            {/* 어드민 상단 헤더 */}
            <AdminHeader />
            {/* 1. 통계 요약 카드 섹션 */}
            <StatCards
                totalPostsCount={totalPostsCount}
                totalCategoriesCount={totalCategoriesCount}
                systemMessage={systemMessage}
            />
            {/* 카테고리별 통계 차트 섹션 */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-50">카테고리별 작성 비율</h3>
                {/* 정제된 데이터를 클라이언트 차트 컴포넌트에 넘겨줍니다. */}
                <CategoryChart data={chartData} />
            </div>

            {/* 2. 메인 콘텐츠 영역 (최근 글 목록 & 카테고리 리스트) */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <RecentPostsWidget posts={posts} />

                <div className="space-y-6">
                    <CategoryListWidget categories={categories} />
                    <SeoHealthWidget posts={posts} />
                </div>
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <GrassWidget posts={posts} />
            </div>
        </div>
    );
}
