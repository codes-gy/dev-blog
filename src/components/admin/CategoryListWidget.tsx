import React from 'react';

interface CategoryListWidgetProps {
    categories: string[];
}

export default function CategoryListWidget({ categories }: CategoryListWidgetProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-50">보유 카테고리 목록</h3>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <span
                        key={category}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                        {category}
                    </span>
                ))}
            </div>
        </div>
    );
}
