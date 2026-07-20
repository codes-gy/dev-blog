import Link from 'next/link';

interface CategoryListProps {
    categories: string[];
    currentTag: string;
}

export default function CategoryList({ categories, currentTag }: CategoryListProps) {
    return (
        <div className="scrollbar-hide flex w-full snap-x items-center gap-2 overflow-x-auto pt-1 pb-3 md:flex-col md:items-stretch md:overflow-visible md:pb-0">
            {categories.map((category) => {
                const isActive = currentTag === category;
                const href = `/posts?tag=${encodeURIComponent(category)}`;

                const baseStyle =
                    'snap-start rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ease-in-out';

                const desktopStyle =
                    'md:w-full md:min-w-0 md:shrink md:rounded-xl md:px-4 md:py-2.5 md:text-base md:text-left';

                const statusStyle = isActive
                    ? `bg-emerald-700 text-white shadow-md font-bold
                       md:bg-emerald-700 md:text-white
                       dark:bg-emerald-750 dark:text-emerald-50 
                       md:dark:bg-emerald-800 md:dark:border md:dark:border-emerald-600
                       md:pointer-events-none`
                    : `border border-slate-400 bg-slate-100 text-slate-800 
                       hover:bg-slate-200 hover:text-slate-900 
                       
                       dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 
                       dark:hover:bg-slate-500 dark:hover:text-slate-200
                       
                       md:border border-slate-300 md:bg-slate-50 md:hover:bg-slate-100
                       md:dark:border-slate-750 md:dark:bg-slate-950 md:dark:hover:bg-slate-900`;
                return (
                    <Link
                        key={category}
                        href={href}
                        scroll={false}
                        className={`${baseStyle} ${desktopStyle} ${statusStyle}`}
                    >
                        <span className="flex items-center gap-2">
                            {isActive && (
                                <span className="hidden h-2 w-2 rounded-full bg-white md:block dark:bg-blue-400" />
                            )}
                            {category}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
