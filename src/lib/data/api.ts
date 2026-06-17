import { Post } from '@/src/types/notion';
import { PaginatedPosts } from '@/src/types/notion';
import { isFullPage } from '@notionhq/client';
import type { QueryDataSourceParameters, QueryDataSourceResponse } from '@notionhq/client/build/src/api-endpoints';
import 'server-only';
import { DATA_SOURCE_ID, getCover, getDate, getSelect, getText, notion } from '@/src/lib/data/config';

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
                notionUrl: page.url,
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
            notionUrl: page.url,
        };
    } catch (error) {
        console.error('상세 페이지 데이터를 가져오는 중 에러:', error);
        return null;
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
