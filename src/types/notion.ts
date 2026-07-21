import { BlockObjectResponse } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    publishedAt: string;
    category: string;
    notionUrl?: string;
}

export interface PaginatedPosts {
    posts: Post[];
    nextCursor: string | null;
}

export type PageProperty = PageObjectResponse['properties'][string];
export type RichTextItem = { plain_text: string };

export type NotionRichTextProperty = Extract<PageProperty, { rich_text: unknown }>;
export type NotionRichTextItem = NotionRichTextProperty['rich_text'][number];

export type NotionBlockWithText =
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

export interface ExtendedBlockObjectResponse extends Omit<BlockObjectResponse, 'type'> {
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

export interface ShareButtonsProps {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
}

export interface KakaoShareContent {
    title: string;
    description: string;
    imageUrl: string;
    link: {
        mobileWebUrl: string;
        webUrl: string;
    };
}

export interface KakaoShareButton {
    title: string;
    link: {
        mobileWebUrl: string;
        webUrl: string;
    };
}

export interface KakaoSDK {
    init: (apiKey: string) => void;
    isInitialized: () => boolean;
    Share: {
        sendDefault: (options: {
            objectType: 'feed';
            content: KakaoShareContent;
            buttons?: KakaoShareButton[];
        }) => void;
    };
}

export interface AdsByGooglePush {
    (obj: Record<string, never>): void;
}

declare global {
    interface Window {
        adsbygoogle?: AdsByGooglePush[] | Record<string, unknown>[];
        Kakao?: KakaoSDK;
    }
}
