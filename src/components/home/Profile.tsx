import React from 'react';
import ProfileAvatar from '@/src/components/home/ProfileAvatar';
import ProfileDetails from '@/src/components/home/ProfileDetails';

export default function Profile() {
    return (
        <section className="mb-16 flex flex-col items-center gap-10 rounded-3xl border border-slate-300 bg-white p-8 shadow-sm transition duration-150 hover:border-blue-500 hover:shadow-md md:flex-row md:items-start md:p-10 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400">
            {/* 비주얼 프로필 영역 */}
            <div className="shrink-0">
                <ProfileAvatar />
            </div>
            {/* 상세 이력 및 가치관 소개 */}
            <div className="w-full min-w-0 flex-1">
                <ProfileDetails />
            </div>
        </section>
    );
}
