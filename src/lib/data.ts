import { BlockObjectResponse, Client, isFullBlock, isFullPage } from '@notionhq/client';
import type {
    PageObjectResponse,
    QueryDataSourceParameters,
    QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints';
import 'server-only';
import { createHighlighter } from 'shiki';

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

type NotionRichTextProperty = Extract<PageProperty, { rich_text: unknown }>;
type NotionRichTextItem = NotionRichTextProperty['rich_text'][number];

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
      }
    | {
          type: 'callout';
          callout: {
              rich_text: RichTextItem[];
              icon?:
                  | { type: 'emoji'; emoji: string }
                  | { type: 'external'; external: { url: string } }
                  | {
                        type: 'file';
                        file: { url: string };
                    }
                  | null;
              color: string;
              children?: BlockObjectResponse[];
          };
      }
    | {
          type: 'table';
          table: {
              children?: BlockObjectResponse[];
          };
      }
    | {
          type: 'table_row';
          table_row: {
              cells: RichTextItem[][];
          };
      }
    | {
          type: 'quote';
          quote: {
              rich_text: RichTextItem[];
          };
      };
const NOTION_BG_STYLES: Record<string, { light: string; dark: string }> = {
    gray_background: {
        light: 'background-color: #f1f1ef; color: #37352f;',
        dark: 'background-color: rgba(255, 255, 255, 0.05); color: #e3e3e3;',
    },
    brown_background: {
        light: 'background-color: #f4eee1; color: #442a1e;',
        dark: 'background-color: rgba(140, 74, 44, 0.15); color: #f3d6c6;',
    },
    orange_background: {
        light: 'background-color: #fbecdd; color: #49290e;',
        dark: 'background-color: rgba(217, 115, 13, 0.15); color: #fad0a8;',
    },
    yellow_background: {
        light: 'background-color: #fbf3db; color: #40320d;',
        dark: 'background-color: rgba(223, 171, 1, 0.15); color: #fbeea4;',
    },
    green_background: {
        light: 'background-color: #edf3ec; color: #1d3829;',
        dark: 'background-color: rgba(11, 110, 79, 0.15); color: #bdecda;',
    },
    blue_background: {
        light: 'background-color: #e8f4fc; color: #0b2a4a;',
        dark: 'background-color: rgba(0, 122, 255, 0.15); color: #c6e2ff;',
    },
    purple_background: {
        light: 'background-color: #f3edf8; color: #2b1440;',
        dark: 'background-color: rgba(144, 59, 245, 0.15); color: #e8dbfc;',
    },
    pink_background: {
        light: 'background-color: #f9edf2; color: #49162e;',
        dark: 'background-color: rgba(193, 23, 112, 0.15); color: #f9dbec;',
    },
    red_background: {
        light: 'background-color: #faecec; color: #4c1111;',
        dark: 'background-color: rgba(224, 62, 62, 0.15); color: #fcdbdb;',
    },
    default: {
        light: 'background-color: #f1f1ef; color: #37352f;',
        dark: 'background-color: rgba(255, 255, 255, 0.05); color: #e3e3e3;',
    },
    default_background: {
        light: 'background-color: #f1f1ef; color: #37352f;',
        dark: 'background-color: rgba(255, 255, 255, 0.05); color: #e3e3e3;',
    },
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
        const highlighter = await createHighlighter({
            themes: ['github-light', 'github-dark-dimmed'],
            langs: ['typescript', 'javascript', 'python', 'html', 'css', 'json', 'bash', 'markdown', 'tsx'],
        });

        // 모든 블록을 담을 배열과 페이징 처리를 위한 변수 선언
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
                        const extendedBlock = block as ExtendedBlockObjectResponse;

                        if (!extendedBlock[block.type]) {
                            extendedBlock[block.type] = { children: [], rich_text: [] };
                        }
                        const internalData = extendedBlock[block.type] as { children?: BlockObjectResponse[] };
                        internalData.children = childBlocks;
                    } catch (e) {
                        console.warn(`자식 블록 로드 실패 (${block.id}):`, e);
                    }
                }
            }
            return blocks;
        }

        const allBlocks = await fetchAllChildBlocks(blockId);

        function renderRichText(richTextArray: NotionRichTextItem[]): string {
            if (!richTextArray) return '';
            return richTextArray
                .map((t) => {
                    let text = escapeHtml(t.plain_text);

                    // 서식 적용
                    if (t.annotations.bold) text = `<strong>${text}</strong>`;
                    if (t.annotations.italic) text = `<em>${text}</em>`;
                    if (t.annotations.strikethrough) text = `<del>${text}</del>`;
                    if (t.annotations.underline) text = `<span class="underline">${text}</span>`;
                    if (t.annotations.code) {
                        text = `<code class="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-mono text-sm border border-slate-200 dark:border-slate-700">${text}</code>`;
                    }

                    // 링크 처리
                    if (t.href) {
                        text = `<a href="${t.href}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline hover:text-blue-800">${text}</a>`;
                    }

                    return text;
                })
                .join('');
        }

        // 자식 노드가 뚫려있는 블록 데이터를 다루기 위한 서브 렌더러 함수
        function renderBlocksToHtml(blocks: BlockObjectResponse[]): string {
            let html = '';
            let isInsideList = false;
            let currentListType: 'ul' | 'ol' | null = null;

            const closeListIfNeeded = () => {
                if (isInsideList && currentListType) {
                    html += `</${currentListType}>`;
                    isInsideList = false;
                    currentListType = null;
                }
            };

            for (const block of blocks) {
                const type = block.type;
                const typedBlock = block as unknown as NotionBlockWithText;

                if (type !== 'bulleted_list_item' && type !== 'numbered_list_item') {
                    closeListIfNeeded();
                }

                switch (type) {
                    case 'heading_1': {
                        if (typedBlock.type !== 'heading_1') continue;
                        const text = renderRichText(typedBlock.heading_1.rich_text as NotionRichTextItem[]);
                        html += `<h1 class="text-3xl font-bold my-6 text-slate-900 dark:text-slate-50">${text}</h1>`;
                        break;
                    }

                    case 'heading_2': {
                        if (typedBlock.type !== 'heading_2') continue;
                        const text = renderRichText(typedBlock.heading_2.rich_text as NotionRichTextItem[]);
                        html += `<h2 class="text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100 block" 
                        style="display: block !important; visibility: visible !important;">
                            ${text}
                        </h2>`;
                        break;
                    }

                    case 'heading_3': {
                        if (typedBlock.type !== 'heading_3') continue;
                        const text = renderRichText(typedBlock.heading_3.rich_text as NotionRichTextItem[]);
                        html += `<h3 class="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-200 block" style="display: block !important; visibility: visible !important;">${text}</h3>`;
                        break;
                    }

                    case 'paragraph': {
                        if (typedBlock.type !== 'paragraph') continue;
                        const text = renderRichText(typedBlock.paragraph.rich_text as NotionRichTextItem[]);
                        if (text.trim() !== '') {
                            html += `<p class="my-4 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-8">${text}</p>`;
                        }
                        break;
                    }

                    case 'bulleted_list_item': {
                        if (typedBlock.type !== 'bulleted_list_item') continue;

                        if (!isInsideList || currentListType !== 'ul') {
                            closeListIfNeeded();
                            html +=
                                '<ul class="list-disc pl-6 my-4 space-y-2 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-8">';
                            isInsideList = true;
                            currentListType = 'ul';
                        }
                        const text = renderRichText(typedBlock.bulleted_list_item.rich_text as NotionRichTextItem[]);
                        html += `<li class="text-slate-700 dark:text-slate-300 my-1">${text}`;

                        if (typedBlock.bulleted_list_item.children) {
                            html += `<ul class="ml-4">${renderBlocksToHtml(typedBlock.bulleted_list_item.children)}</ul>`;
                        }
                        html += '</li>';
                        break;
                    }

                    case 'numbered_list_item': {
                        if (typedBlock.type !== 'numbered_list_item') continue;

                        if (!isInsideList || currentListType !== 'ol') {
                            closeListIfNeeded();
                            html +=
                                '<ol class="list-decimal pl-6 my-4 space-y-2 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-8">';
                            isInsideList = true;
                            currentListType = 'ol';
                        }

                        const text = renderRichText(typedBlock.numbered_list_item.rich_text as NotionRichTextItem[]);
                        html += `<li class="text-slate-700 dark:text-slate-300 my-1">${text}`;

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

                        const codeContent = typedBlock.code.rich_text.map((t) => t.plain_text).join('');
                        let language = typedBlock.code.language || 'txt';

                        if (language === 'c++') language = 'cpp';
                        if (language === 'plain text') language = 'txt';

                        let highlightedHtml = '';
                        try {
                            // 💡 단일 CSS 변수 대신 라이트/다크 듀얼 테마를 직접 지정합니다.
                            highlightedHtml = highlighter.codeToHtml(codeContent, {
                                lang: language,
                                themes: {
                                    light: 'github-light',
                                    dark: 'github-dark-dimmed',
                                },
                            });
                        } catch (err) {
                            highlightedHtml = `<pre><code>${escapeHtml(codeContent)}</code></pre>`;
                        }

                        html += `
                            <div class="my-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                              <div class="border-b border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100/50 dark:bg-slate-900/80 flex justify-between items-center select-none">
                                <span>${language.toUpperCase()}</span>
                              </div>
                              <div class="shiki-wrapper p-4 overflow-x-auto text-sm leading-relaxed">
                                ${highlightedHtml}
                              </div>
                            </div>
                        `;
                        break;
                    }
                    case 'callout': {
                        if (typedBlock.type !== 'callout') continue;

                        const calloutData = typedBlock.callout;

                        // 1. 텍스트 내 서식 복원
                        const text = renderRichText(calloutData.rich_text as NotionRichTextItem[]);

                        // 2. Tailwind 우회를 위한 고유 HEX 코드 변수 추출
                        const notionColorKey =
                            calloutData.color === 'default' ? 'default_background' : calloutData.color;
                        const colorStyle =
                            NOTION_BG_STYLES[notionColorKey] ||
                            NOTION_BG_STYLES['default_background'] ||
                            NOTION_BG_STYLES['default'];

                        const bgLight = colorStyle?.light?.match(/background-color:\s*([^;]+)/)?.[1] || '#f1f1ef';
                        const textLight = colorStyle?.light?.match(/color:\s*([^;]+)/)?.[1] || '#37352f';
                        const bgDark =
                            colorStyle?.dark?.match(/background-color:\s*([^;]+)/)?.[1] || 'rgba(255, 255, 255, 0.05)';
                        const textDark = colorStyle?.dark?.match(/color:\s*([^;]+)/)?.[1] || '#e3e3e3';

                        const inlineStyles = `
        --nbg-l: ${bgLight}; --ntx-l: ${textLight};
        --nbg-d: ${bgDark}; --ntx-d: ${textDark};
    `.trim();

                        let iconHtml = '';
                        if (calloutData.icon) {
                            if (calloutData.icon.type === 'emoji') {
                                iconHtml = `<span class="text-xl flex-shrink-0 select-none">${calloutData.icon.emoji}</span>`;
                            } else if (calloutData.icon.type === 'external') {
                                iconHtml = `<img src="${calloutData.icon.external.url}" class="w-5 h-5 object-contain flex-shrink-0" alt="icon" />`;
                            } else if (calloutData.icon.type === 'file') {
                                iconHtml = `<img src="${calloutData.icon.file.url}" class="w-5 h-5 object-contain flex-shrink-0" alt="icon" />`;
                            }
                        }

                        let childrenHtml = '';
                        if (calloutData.children && calloutData.children.length > 0) {
                            childrenHtml = `<div class="mt-2 space-y-1 notion-callout-children">${renderBlocksToHtml(calloutData.children)}</div>`;
                        }

                        // 3. 인라인 스타일 주입 구조로 가공하여 렌더링
                        html += `
    <div class="my-4 flex gap-3 p-4 rounded-xl border
                border-slate-200/50 dark:border-slate-800/30
                bg-slate-100 text-slate-800
                dark:bg-slate-800/70 dark:text-slate-100">
        ${iconHtml}
        <div class="flex-1 min-w-0 leading-relaxed text-sm md:text-base">
            <div class="font-bold text-slate-900 dark:text-white">
                ${text}
            </div>
            ${childrenHtml}
        </div>
    </div>
`;
                        break;
                    }
                    case 'table': {
                        const tableBlock = block as unknown as {
                            type: 'table';
                            table: {
                                children?: BlockObjectResponse[];
                            };
                        };

                        if (tableBlock.type !== 'table') continue;

                        const rows = tableBlock.table.children ?? [];

                        html += `
        <div class="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table class="w-full border-collapse text-sm">
                <tbody>
                    ${renderBlocksToHtml(rows)}
                </tbody>
            </table>
        </div>
    `;
                        break;
                    }
                    case 'table_row': {
                        const rowBlock = block as unknown as {
                            type: 'table_row';
                            table_row: {
                                cells: RichTextItem[][];
                            };
                        };

                        if (rowBlock.type !== 'table_row') continue;

                        const cellsHtml = rowBlock.table_row.cells
                            .map((cell) => {
                                const text = renderRichText(cell as unknown as NotionRichTextItem[]);

                                return `
                <td class="border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-slate-200 align-top">
                    ${text}
                </td>
            `;
                            })
                            .join('');

                        html += `<tr>${cellsHtml}</tr>`;
                        break;
                    }

                    case 'quote': {
                        if (typedBlock.type !== 'quote') continue;

                        // 1. 인용문 텍스트 내 서식(볼드, 링크 등) 복원
                        const text = renderRichText(typedBlock.quote.rich_text as NotionRichTextItem[]);

                        // 2. 텍스트가 비어있지 않을 때만 HTML 생성
                        if (text.trim() !== '') {
                            html += `
            <blockquote class="my-6 pl-4 border-l-4 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-8">
                ${text}
            </blockquote>
        `;
                        }
                        break;
                    }

                    default: {
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
            closeListIfNeeded();
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
