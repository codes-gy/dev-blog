import { Link } from '@/src/navigation';

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    publishedAt: string;
    category: string;
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const pureSlug = post.slug.includes('/') ? post.slug.split('/').pop() : post.slug;
    return (
        <Link
            href={`/posts/${pureSlug}`}
            key={post.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 dark:hover:border-blue-400"
        >
            {/* 카드 상단: 이미지 구역 */}
            {/* aspect-[16/9]: 유튜브 화면 비율처럼 가로세로를 16:9 정사각형 직사각형으로 고정 */}
            {/* overflow-hidden: 이미지가 모서리 둥근 테두리 밖으로 삐져나가지 않게 잘라냄 */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-200 dark:bg-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.coverImage}
                    alt={post.title}
                    // group-hover:scale-105: 마우스를 카드 어디에든 올리면 이미지 크기만 105%로 부드럽게 커짐 (시각 효과)
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* 카테고리 태그 배지 */}
                {/* absolute: 이미지 좌측 상단에 둥둥 떠 있게 고정 */}
                <span className="absolute top-4 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm dark:bg-slate-950/80">
                    {post.category}
                </span>
            </div>

            {/* 카드 하단: 텍스트 정보 구역 */}
            <div className="p-6">
                {/* 날짜 표시 */}
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{post.publishedAt}</span>

                {/* 글 제목 */}
                {/* group-hover:text-blue-600: 마우스를 올리면 글자색이 세련된 파란색으로 변경됨 */}
                <h2 className="mt-2 mb-3 line-clamp-1 text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-200">
                    {post.title}
                </h2>

                {/* 글 간략 요약 */}
                {/* line-clamp-2: 본문 내용이 아무리 길어도 정확히 딱 '2줄'만 보여주고 뒤는 '...' 처리함 */}
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {post.description}
                </p>

                {/* 읽기 버튼 디자인 */}
                <div className="mt-4 flex items-center border-t border-slate-400 pt-4 text-sm font-semibold text-blue-500 dark:border-slate-700">
                    더 읽어보기 <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
            </div>
        </Link>
    );
}
