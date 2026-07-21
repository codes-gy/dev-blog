import { PageProperty } from '@/src/types/notion';
import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID;

export function escapeHtml(text: string): string {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

export function getText(prop: PageProperty | undefined): string {
    if (!prop) return '';

    if (prop.type === 'title') {
        return prop.title.map((t) => t.plain_text).join('');
    }

    if (prop.type === 'rich_text') {
        return prop.rich_text.map((t) => t.plain_text).join('');
    }

    return '';
}

export function getSelect(prop: PageProperty | undefined): string {
    if (!prop || prop.type !== 'select') return '';
    return prop.select?.name ?? '';
}

export function getDate(prop: PageProperty | undefined): string {
    if (!prop || prop.type !== 'date') return '';
    return prop.date?.start ?? '';
}

export function getCover(page: PageObjectResponse): string {
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
