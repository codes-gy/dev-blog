import { BlockObjectResponse, Client, isFullBlock, isFullPage } from '@notionhq/client';
import type {
    PageObjectResponse,
    QueryDataSourceParameters,
    QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints';
import 'server-only';

export const dynamic = 'force-dynamic';

export interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    publishedAt: string;
    category: string;
}

export interface PaginatedPosts {
    posts: Post[];
    nextCursor: string | null;
}

export const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID;

type PageProperty = PageObjectResponse['properties'][string];
type RichTextItem = { plain_text: string };
type NotionBlockWithText =
    | { type: 'heading_1'; heading_1: { rich_text: RichTextItem[] } }
    | { type: 'heading_2'; heading_2: { rich_text: RichTextItem[] } }
    | { type: 'heading_3'; heading_3: { rich_text: RichTextItem[] } }
    | { type: 'paragraph'; paragraph: { rich_text: RichTextItem[] } }
    | {
          type: 'code';
          code: {
              rich_text: RichTextItem[];
              language: string;
          };
      }
    | {
          type: 'bulleted_list_item';
          bulleted_list_item: {
              rich_text: RichTextItem[];
              children?: BlockObjectResponse[];
          };
      }
    | {
          type: 'numbered_list_item';
          numbered_list_item: {
              rich_text: RichTextItem[];
              children?: BlockObjectResponse[];
          };
      };

interface ExtendedBlockObjectResponse extends Omit<BlockObjectResponse, 'type'> {
    type: string;
    bulleted_list_item?: {
        rich_text: RichTextItem[];
        children?: BlockObjectResponse[];
    };
    numbered_list_item?: {
        rich_text: RichTextItem[];
        children?: BlockObjectResponse[];
    };

    [key: string]: unknown; // any 대신 안전한 unknown 사용
}

function getText(prop: PageProperty | undefined): string {
    if (!prop) return '';

    if (prop.type === 'title') {
        return prop.title[0]?.plain_text ?? '';
    }

    if (prop.type === 'rich_text') {
        return prop.rich_text[0]?.plain_text ?? '';
    }

    return '';
}

function getSelect(prop: PageProperty | undefined): string {
    if (!prop || prop.type !== 'select') return '';
    return prop.select?.name ?? '';
}

function getDate(prop: PageProperty | undefined): string {
    if (!prop || prop.type !== 'date') return '';
    return prop.date?.start ?? '';
}

function getCover(page: PageObjectResponse): string {
    const fallback = 'https://app.notion.com/images/page-cover/rijksmuseum_mignons_1660.jpg';

    if (!page.cover) return fallback;

    if (page.cover.type === 'external') {
        return page.cover.external.url;
    }

    if (page.cover.type === 'file') {
        return page.cover.file.url;
    }

    return fallback;
}

export async function getBlogPosts(
    pageSize: number = 6,
    startCursor?: string,
    category?: string,
    searchText?: string,
): Promise<PaginatedPosts> {
    if (!DATA_SOURCE_ID) {
        console.error('NOTION_DATA_SOURCE_ID가 없습니다.');
        return {
            posts: [],
            nextCursor: null,
        };
    }

    try {
        type DataSourceFilter = QueryDataSourceParameters['filter'];
        type DataSourceAndFilterList = Extract<DataSourceFilter, { and: unknown }>['and'];
        type NotionFilterItem = DataSourceAndFilterList[number];
        const filterAndArray: NotionFilterItem[] = [
            {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
        ];
        if (category && category !== '전체') {
            filterAndArray.push({
                property: 'Category',
                select: {
                    equals: category,
                },
            });
        }
        if (searchText && searchText.trim() !== '') {
            filterAndArray.push({
                property: 'Title',
                rich_text: {
                    contains: searchText.trim(),
                },
            });
        }

        const response: QueryDataSourceResponse = await notion.dataSources.query({
            data_source_id: DATA_SOURCE_ID,
            page_size: pageSize, //한 번에 호출할 최대 게시글 개수
            start_cursor: startCursor, //주소창에서 넘겨받은 다음 페이지 시작점 커서 ID
            filter: {
                and: filterAndArray,
            },
            sorts: [
                {
                    property: 'PublishedAt',
                    direction: 'descending',
                },
            ],
        });

        const posts = response.results.filter(isFullPage).map((page): Post => {
            const props = page.properties;

            return {
                id: page.id,
                title: getText(props['Title']) || '제목 없음',
                slug: getText(props['Slug']),
                description: getText(props['Summary']) || '본문 요약문이 없습니다.',
                category: getSelect(props['Category']) || '일반',
                publishedAt: getDate(props['PublishedAt']) || '날짜 미정',
                coverImage: getCover(page),
            };
        });
        return {
            posts,
            nextCursor: response.next_cursor ?? null,
        };
    } catch (error: unknown) {
        console.error('노션 데이터를 가져오는 중 에러:', error);
        return {
            posts: [],
            nextCursor: null,
        };
    }
}

export async function getBlogPost(slug: string): Promise<Post | null> {
    if (!DATA_SOURCE_ID) {
        console.error('NOTION_DATA_SOURCE_ID가 없습니다.');
        return null;
    }
    try {
        const response: QueryDataSourceResponse = await notion.dataSources.query({
            data_source_id: DATA_SOURCE_ID,
            filter: {
                and: [
                    {
                        property: 'Published',
                        checkbox: { equals: true },
                    },
                    {
                        property: 'Slug',
                        rich_text: { equals: slug }, //  주소창의 slug와 노션의 Slug가 일치하는지 필터링
                    },
                ],
            },
        });

        // 만약 조건에 맞는 글이 노션에 없다면 null을 반환
        if (response.results.length === 0) {
            return null;
        }

        const page = response.results[0];

        // 데이터가 페이지 형태가 맞는지 검증 (isFullPage 활용)
        if (!isFullPage(page)) return null;

        const props = page.properties;

        // 목록 조회와 동일하게 데이터를 매핑해서 리턴합니다.
        return {
            id: page.id,
            title: getText(props['Title']) || '제목 없음',
            slug: getText(props['Slug']),
            description: getText(props['Summary']) || '본문 요약문이 없습니다.',
            category: getSelect(props['Category']) || '일반',
            publishedAt: getDate(props['PublishedAt']) || '날짜 미정',
            coverImage: getCover(page),
        };
    } catch (error) {
        console.error('상세 페이지 데이터를 가져오는 중 에러:', error);
        return null;
    }
}

export async function getPostContent(blockId: string): Promise<string> {
    try {
        // 1. 모든 블록을 담을 배열과 페이징 처리를 위한 변수 선언
        async function fetchAllChildBlocks(id: string): Promise<BlockObjectResponse[]> {
            const blocks: BlockObjectResponse[] = [];
            let hasMore = true;
            let cursor: string | undefined = undefined;

            while (hasMore) {
                const response = await notion.blocks.children.list({
                    block_id: id,
                    start_cursor: cursor,
                    page_size: 100,
                });

                const fullBlocks = response.results.filter(isFullBlock);
                blocks.push(...fullBlocks);

                hasMore = response.has_more;
                cursor = response.next_cursor ?? undefined;
            }

            for (const block of blocks) {
                if (block.has_children && block.type !== 'child_database') {
                    try {
                        const childBlocks = await fetchAllChildBlocks(block.id);

                        // Extended 인터페이스 가드를 통해 안전하게 자식 데이터 주입
                        const extendedBlock = block as ExtendedBlockObjectResponse;
                        if (extendedBlock.type === 'bulleted_list_item' && extendedBlock.bulleted_list_item) {
                            extendedBlock.bulleted_list_item.children = childBlocks;
                        } else if (extendedBlock.type === 'numbered_list_item' && extendedBlock.numbered_list_item) {
                            extendedBlock.numbered_list_item.children = childBlocks;
                        }
                    } catch (e) {
                        console.warn(`자식 블록 로드 실패 (${block.id}):`, e);
                    }
                }
            }
            return blocks;
        }

        const allBlocks = await fetchAllChildBlocks(blockId);

        // 자식 노드가 뚫려있는 블록 데이터를 다루기 위한 서브 렌더러 함수
        function renderBlocksToHtml(blocks: BlockObjectResponse[]): string {
            let html = '';

            for (const block of blocks) {
                const type = block.type;
                const typedBlock = block as unknown as NotionBlockWithText;

                switch (type) {
                    case 'heading_1': {
                        if (typedBlock.type !== 'heading_1') continue;
                        const text = typedBlock.heading_1.rich_text.map((t) => t.plain_text).join('');
                        html += `<h1 class="text-3xl font-bold my-6 text-slate-900 dark:text-slate-50">${text}</h1>`;
                        break;
                    }

                    case 'heading_2': {
                        if (typedBlock.type !== 'heading_2') continue;
                        const text = typedBlock.heading_2.rich_text.map((t) => t.plain_text).join('');
                        html += `<h2 class="text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100 block" style="display: block !important; visibility: visible !important;">${text}</h2>`;
                        break;
                    }

                    case 'heading_3': {
                        if (typedBlock.type !== 'heading_3') continue;
                        const text = typedBlock.heading_3.rich_text.map((t) => t.plain_text).join('');
                        html += `<h3 class="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-200 block" style="display: block !important; visibility: visible !important;">${text}</h3>`;
                        break;
                    }

                    case 'paragraph': {
                        if (typedBlock.type !== 'paragraph') continue;
                        const text = typedBlock.paragraph.rich_text.map((t) => t.plain_text).join('');
                        if (text.trim() !== '') {
                            html += `<p class="my-3 text-slate-700 dark:text-slate-300 leading-relaxed">${text}</p>`;
                        }
                        break;
                    }

                    case 'bulleted_list_item': {
                        if (typedBlock.type !== 'bulleted_list_item') continue;
                        const text = typedBlock.bulleted_list_item.rich_text.map((t) => t.plain_text).join('');
                        html += `<li class="ml-4 list-disc text-slate-700 dark:text-slate-300 my-1">${text}`;

                        if (typedBlock.bulleted_list_item.children) {
                            html += `<ul class="ml-4">${renderBlocksToHtml(typedBlock.bulleted_list_item.children)}</ul>`;
                        }
                        html += '</li>';
                        break;
                    }

                    case 'numbered_list_item': {
                        if (typedBlock.type !== 'numbered_list_item') continue;
                        const text = typedBlock.numbered_list_item.rich_text.map((t) => t.plain_text).join('');
                        html += `<li class="ml-4 list-decimal text-slate-700 dark:text-slate-300 my-1">${text}`;

                        if (typedBlock.numbered_list_item.children) {
                            html += `<ol class="ml-4">${renderBlocksToHtml(typedBlock.numbered_list_item.children)}</ol>`;
                        }
                        html += '</li>';
                        break;
                    }

                    case 'image': {
                        // 노션 API에서 준 이미지 블록의 내부 데이터 타입을 안전하게 꺼내기 위해 unknown 캐스팅 활용
                        const imageBlock = block as unknown as {
                            type: 'image';
                            image:
                                | {
                                      type: 'external';
                                      external: { url: string };
                                  }
                                | { type: 'file'; file: { url: string } };
                        };

                        if (imageBlock.type !== 'image') continue;

                        let imageUrl = '';
                        const imgData = imageBlock.image;

                        // 1. 이미지 URL 추출 (외부 링크 vs 직접 업로드 파일)
                        if (imgData.type === 'external') {
                            imageUrl = imgData.external.url;
                        } else if (imgData.type === 'file') {
                            imageUrl = imgData.file.url;
                        }

                        // 2. URL이 정상적으로 존재할 때만 HTML 태그 생성
                        if (imageUrl) {
                            html += `
                                    <div class="my-6 flex flex-col items-center justify-center">
                                        <img 
                                            src="${imageUrl}" 
                                            alt="블로그 본문 이미지" 
                                            class="notion-image rounded-2xl border border-slate-200 dark:border-slate-800 max-w-full h-auto object-cover shadow-sm cursor-zoom-in transition hover:opacity-90"
                                            loading="lazy"
                                        />
                                    </div>
                                `;
                        }
                        break;
                    }

                    case 'code': {
                        if (typedBlock.type !== 'code') continue;

                        const code = typedBlock.code.rich_text.map((t) => t.plain_text).join('');
                        const language = typedBlock.code.language || 'plain text';

                        html += `
    <div class="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-slate-800">
      <div class="border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
        ${language}
      </div>
      <pre class="overflow-x-auto p-4 text-sm leading-relaxed text-slate-100"><code>${escapeHtml(code)}</code></pre>
    </div>
  `;
                        break;
                    }

                    default: {
                        // 🎯 [수정] default 문 안에 남아있던 가짜 any 객체 서치 로직을 완전 삭제하고
                        // unknown 타입캐스팅을 이용해 안전하게 자식 요소를 재귀 렌더링하도록 변경
                        const fallbackBlock = block as ExtendedBlockObjectResponse;
                        const blockInternalData = fallbackBlock[type];

                        if (
                            blockInternalData &&
                            typeof blockInternalData === 'object' &&
                            'children' in blockInternalData
                        ) {
                            const nestedChildren = (
                                blockInternalData as {
                                    children?: BlockObjectResponse[];
                                }
                            ).children;
                            if (nestedChildren && Array.isArray(nestedChildren)) {
                                html += renderBlocksToHtml(nestedChildren);
                            }
                        }
                        break;
                    }
                }
            }
            return html;
        }

        return renderBlocksToHtml(allBlocks);
    } catch (error) {
        console.error('본문 데이터를 가져오는 중 에러 발생:', error);
        return '<p>본문을 불러오는 데 실패했습니다.</p>';
    }
}

export function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date); // 예시 결과: 2026년 6월 10일
    } catch {
        return dateString;
    }
}

export async function getAllCategories(): Promise<string[]> {
    if (!DATA_SOURCE_ID) return ['전체'];
    try {
        const response: QueryDataSourceResponse = await notion.dataSources.query({
            data_source_id: DATA_SOURCE_ID,
            page_size: 100,
            filter: {
                property: 'Published',
                checkbox: { equals: true },
            },
        });

        const categoriesSet = new Set<string>();
        categoriesSet.add('전체'); // 기본값으로 '전체'는 무조건 포함

        response.results.filter(isFullPage).forEach((page) => {
            const category = getSelect(page.properties['Category']);
            if (category) {
                categoriesSet.add(category);
            }
        });

        // Set을 다시 배열로 바꾸고 가나다순 정렬하여 반환
        return Array.from(categoriesSet).sort((a, b) => {
            if (a === '전체') return -1;
            if (b === '전체') return 1;
            return a.localeCompare(b);
        });
    } catch (error) {
        console.error('카테고리 목록을 가져오는 중 에러:', error);
        return ['전체'];
    }
}

function escapeHtml(text: string): string {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
