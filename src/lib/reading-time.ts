/**
 * 게시글 본문 HTML을 받아 예상 읽는 시간(분)을 계산합니다.
 * 한글 위주 콘텐츠 기준으로 분당 약 500자를 읽는다고 가정합니다.
 * (영문 단어 기준 WPM 계산은 한글 블로그 특성상 부정확해서 글자 수 기반으로 계산합니다.)
 */
export function estimateReadingMinutes(html: string): number {
    const plainText = html
        .replace(/<[^>]+>/g, ' ') // 태그 제거
        .replace(/&[a-zA-Z#0-9]+;/g, ' ') // HTML 엔티티 제거
        .replace(/\s+/g, ' ')
        .trim();

    const CHARS_PER_MINUTE = 500;
    const minutes = Math.ceil(plainText.length / CHARS_PER_MINUTE);

    return Math.max(1, minutes);
}
