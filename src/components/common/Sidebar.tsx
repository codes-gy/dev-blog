import Link from 'next/link';

interface SidebarProps {
    tags: string[];
    currentTag?: string;
}

export default function Sidebar({ tags, currentTag }: SidebarProps) {
    return (
        <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                🏷️ 태그 목록
            </h3>

            <div className="flex flex-wrap gap-2 md:flex-col">
                {/* '전체 보기' 버튼 */}
                <Link
                    href="/public"
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        !currentTag
                            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                >
                    전체 보기
                </Link>

                {/* 노션에서 동적으로 긁어온 실제 태그들 매핑 */}
                {tags.map((tag) => {
                    const isActive = currentTag === tag;
                    return (
                        <Link
                            key={tag}
                            href={`/public?tag=${encodeURIComponent(tag)}`}
                            className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`}
                        >
                            # {tag}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
