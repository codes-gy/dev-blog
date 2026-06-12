import Link from 'next/link';

interface CategoryListProps {
    categories: string[];
    currentTag: string;
}

export default function CategoryList({
    categories,
    currentTag,
}: CategoryListProps) {
    return (
        <div className="scrollbar-hide flex w-full snap-x items-center gap-2 overflow-x-auto pt-1 pb-3 md:max-w-[70%]">
            {categories.map((category) => {
                const isActive = currentTag === category;

                const href = `/posts?tag=${encodeURIComponent(category)}`;

                return (
                    <Link
                        key={category}
                        href={href}
                        className={`min-w-max shrink-0 snap-start rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                            isActive
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                        }`}
                    >
                        {category}
                    </Link>
                );
            })}
        </div>
    );
}
