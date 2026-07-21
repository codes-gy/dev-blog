# Notion 기반 실시간 웹 CMS 블로그

> **Notion Headless CMS**와 **Next.js 15 App Router**를 사용해 구축한 기술 블로그입니다.

---

## 🛠️ Tech Stack (기술 스택)

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Notion API
- **Deployment**: Vercel

---

## ⚡ Core Architecture & Highlights

- **프로필 배제 & 성과 중심 레이아웃**: 개인 신상 정보 대신 `Technical Capabilities` 및 정량적 성과 중심의 `Featured Projects`를 최상단에 노출
- **Notion Headless CMS 연동**: 노션 데이터베이스의 게시 상태(`Published`)를 감지하여 정적/동적 아티클 자동 빌드
- **최적화된 렌더링**: Next.js App Router 기반 ISR/Dynamic Caching 적용으로 빠른 초기 로딩 속도 유지

---

## 📡 Notion CMS 연동 스키마

노션 데이터베이스에서 글을 수신하기 위해 아래 속성(Properties)을 기준으로 동작합니다:

| Property 명 | Type | 역할 |
| :--- | :--- | :--- |
| **title** / **Title** | `Title` / `RichText` | 포스팅 제목 |
| **Slug** | `RichText` | URL 식별자 (e.g. `/posts/webflux-queue`) |
| **Summary** | `RichText` | 포스트 카드 및 상세 상단 요약문 |
| **Category** | `Select` | 기술 태그 (e.g. `Backend`, `Database`, `Architecture`) |
| **Published** | `Checkbox` | `true` 상태의 포스트만 블로그에 실시간 노출 |
| **PublishedAt** | `Date` | 게시일 (`YYYY년 MM월 DD일` 포맷 변환) |

---

## 🚀 시작하기

### 1. 환경 변수 설정 (`.env.local`)
프로젝트 루트 경로에 `.env.local` 파일을 생성하고 노션 API 키를 설정합니다.

```env
NOTION_API_KEY=your_notion_secret_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here