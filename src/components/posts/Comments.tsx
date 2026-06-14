'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

interface CommentsProps {
    postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
    const { resolvedTheme } = useTheme();

    const giscusTheme = resolvedTheme === 'dark' ? 'dark_dimmed' : 'light';

    const NEXT_PUBLIC_GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`;
    const NEXT_PUBLIC_GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID as string;
    const NEXT_PUBLIC_GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY as string;
    const NEXT_PUBLIC_GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID as string;

    return (
        <section className="mt-12 w-full border-t border-slate-200 pt-10 dark:border-slate-800">
            <h2 className="mb-6 text-xl font-bold text-slate-950 dark:text-slate-50">💬 댓글 작성하기</h2>

            <Giscus
                repo={NEXT_PUBLIC_GISCUS_REPO}
                repoId={NEXT_PUBLIC_GISCUS_REPO_ID}
                category={NEXT_PUBLIC_GISCUS_CATEGORY}
                categoryId={NEXT_PUBLIC_GISCUS_CATEGORY_ID}
                mapping="specific"
                term={postSlug}
                strict="1"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme={giscusTheme}
                lang="ko"
                loading="lazy"
            />
        </section>
    );
}
