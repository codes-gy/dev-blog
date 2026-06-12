// src/components/Sidebar.tsx
import Link from "next/link";

interface SidebarProps {
    tags: string[];
    currentTag?: string;
}

export default function Sidebar({ tags, currentTag }: SidebarProps) {
    return (
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-6">
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                🏷️ 태그 목록
            </h3>

            <div className="flex flex-wrap md:flex-col gap-2">
                {/* '전체 보기' 버튼 */}
                <Link
                    href="/"
                    className={`px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                        !currentTag
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                            href={`/?tag=${encodeURIComponent(tag)}`}
                            className={`px-3 py-2 text-sm rounded-lg transition-colors font-medium text-left ${
                                isActive
                                    ? "bg-indigo-600 text-white dark:bg-indigo-500"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
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