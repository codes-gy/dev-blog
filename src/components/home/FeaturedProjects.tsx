import Link from 'next/link';
import ProjectCard from '@/src/components/home/ProjectCard';

export default function FeaturedProjects() {
    return (
        <section className="mb-16">
            <div className="mb-8 flex items-center justify-between">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                    ✨ 주요 프로젝트
                    <span className="text-xs font-normal text-slate-400 dark:text-slate-500">(Featured Projects)</span>
                </h3>
                <Link
                    href="/resume"
                    className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline dark:text-blue-400"
                >
                    경력기술서 보기
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ProjectCard
                    title="Spring WebFlux & Redis 기반 대기열 관리 시스템"
                    description="트래픽 폭주 상황에서도 안정적인 순차 진입을 보장하기 위해 Redis Sorted Set(ZSET) 기반 대기열 서버를 설계·구현했습니다."
                    techStack="Spring WebFlux, Java, Redis, Reactive Streams"
                    status="Live"
                    details={{
                        overview:
                            '대규모 이벤트 및 동시 접속 트래픽 발생 시 메인 RDB 부하를 차단하고, 요청을 순차 진입시키는 리액티브 대기열 미들웨어 서버입니다.',
                        metrics: [
                            { label: '동시 요청 처리량', value: '+300% 향상' },
                            { label: '평균 응답 속도', value: '15ms 유지' },
                            { label: '대기열 처리 지연율', value: '0.01% 미만' },
                        ],
                        features: [
                            'Redis Sorted Set(ZSET)의 Score(Timestamp)를 활용한 순차 대기 순번 발급 로직 구축',
                            'Spring WebFlux 기반 논블로킹 대기열 상태 폴링 API 구현',
                            '검증된 진입 토큰 발행 및 세션 자동 만료 TTL 스케줄러 개발',
                            '실시간 대기 순번 밀어넣기 파이프라인 개발',
                            '요청 헤더 및 쿠키 내 대기열 진입 토큰 위변조 방지 HMAC 암호화 검증 구현',
                            'K6을 활용한 최대 10,000 TPS 부하 테스트 수행 및 병목 지점 개선',
                        ],
                        troubleshooting: {
                            situation: '대규모 동시 접근 테스트 시 순간적인 트래픽 폭주 발생으로 대기열 인입 지연 발생',
                            task: '스레드 블로킹 현상 및 DB Connection Pool 고갈 문제가 확인됨',
                            action: 'Spring WebFlux의 Reactive Non-blocking 스택과 Lettuce Reactive Redis Template을 도입하여 구조 전환.',
                            result: '동시 접속자 6,000명 기준 시스템 다운 없이 평균 응답 시간 15ms 유지.',
                        },
                        githubUrl: 'https://github.com/codes-gy/waiting-api',
                    }}
                />
                <ProjectCard
                    title="포스트 자동화 및 관리 디스코드 Bot"
                    description="커뮤니티 및 포럼 스레드 내 게시글의 CRUD(생성·조회·수정·삭제) 기능을 디스코드 명령어 기반으로 제어할 수 있는 봇 서비스 및 백엔드 연동 로직을 개발했습니다."
                    techStack="Node.js, TypeScript, Discord.js, REST API, Redis"
                    status="Live"
                    details={{
                        overview: '디스코드 채팅방 내에서 커뮤니티 포럼 스레드를 관리하는 봇 서비스입니다.',
                        metrics: [
                            { label: '포럼 수동 관리 시간', value: '80% 절감' },
                            { label: '명령어 응답 속도', value: '< 200ms' },
                            { label: '커뮤니티 운영 생산성', value: '2.5배 증가' },
                        ],
                        features: [
                            'Discord API 연동을 통한 포럼 스레드 CRUD 자동화 파이프라인 구축',
                            '디스코드 슬래시 명령어 기반 인터페이스 적용',
                            '사용자 권한 검증 미들웨어 구축을 통해 관리자 전용 제어 구현',
                            '자주 조회되는 포럼 스레드 데이터의 빠른 조회를 위해 Redis에 캐싱레이어 추가 구현',
                            'Jest 및 Supertest를 활용한 단위 테스트 작성',
                            '포럼 스레드 활동 수치 및 커뮤니티 운영 통계 집계 기능 구현',
                        ],
                        troubleshooting: {
                            situation: '운영 환경에서 순간적인 이벤트로 명령어 인입량이 급증하는 상황 발생.',
                            task: 'Discord API의 Rate Limit 정책으로 인한 HTTP 429 에러 방지 필요.',
                            action: 'In-memory Queue 버퍼링 구조를 도입하여 요청을 순차적으로 대기시키고, Discord API 처리 제한을 넘지 않도록 안전하게 지연 및 재시도 기능 구현 ',
                            result: '트래픽 폭주 상황에서도 429 에러 발생 0건 달성 및 API 요청 성공률 99.9% 달성',
                        },
                        githubUrl: 'https://github.com/codes-gy/discord-bot',
                    }}
                />
                <ProjectCard
                    title="Notion 기반 실시간 웹 CMS 블로그"
                    description="Next.js App Router와 Notion API, SSE 웹훅을 결합하여 데이터 갱신이 실시간으로 발생하는 블로그입니다"
                    techStack="Next.js, TypeScript, Tailwind CSS, SSE"
                    status="Live"
                    details={{
                        overview:
                            '노션을 CMS로 활용하여 글 작성 후 별도 빌드/재배포 없이 웹에 실시간으로 반영되는 기술 블로그입니다.',
                        metrics: [
                            { label: '콘텐츠 반영 시간', value: '< 1초' },
                            { label: '운영 시스템 장애 발생률', value: '0건 유지' },
                            { label: 'SEO 점수', value: '100점' },
                        ],
                        features: [
                            'Notion API 기반 블록 데이터 파싱 및 React 컴포넌트 개발',
                            '노션 데이터 변경 시 실시간 화면 자동 갱신',
                            'SEO 최적화를 위한 Dynamic OpenGraph 메타태그 및 Sitemap 자동 생성 구현',
                            'Shiki 라이브러리 활용을 통한 코드 블록 하이라이팅 구현',
                            'GitHub Actions 기반 CI/CD 자동화',
                            'next-themes 및 Tailwind CSS 기반 다크모드 및 반응형 레이아웃 구현',
                            '좋아요 기능 추가',
                            'Giscus 연동을 통한 GitHub API 기반 댓글 기능 구현',
                            'Cookie 및 IP 기반 조회수 중복 증가 방지 로직 구현',
                            '링크 복사 및 소셜 공유 기능 구현',
                            'Google AdSense 연동으로 수익화 및 광고영역 최적화 구현',
                            'Google Analytics 연동으로 트래픽 데이터 수집 및 사용자 행동 추적 구현',
                        ],
                        troubleshooting: {
                            situation:
                                '노션에서 글을 수정했을 때 블로그에 즉시 반영되지 않고, 사이트를 재빌드하거나 캐시 만료를 기다려야 하는 문제 발생.',
                            task: '재배포 과정 없이 노션에서 수정을 하면 해당 게시글 페이지의 캐시만 빠르게 갱신하는 기능이 필요',
                            action: 'Notion Database와 SSE 웹훅 연동 파이프라인을 구현하고, 노션에서 수정 이벤트 감지 시 해당 포스트의 캐시만 핀포인트로 즉시 파기/재생성하도록 구현',
                            result: '글 작성 및 수정 후 별도의 배포 과정 없이 즉시 반영되는 CMS 기능 구현',
                        },
                        githubUrl: 'https://github.com/codes-gy/dev-blog',
                    }}
                />
                <ProjectCard
                    title="금융/보험 계약 관리 및 시스템 운영 및 API 고도화"
                    description="금융/보험 계약 관리 시스템을 안정적으로 운영·유지보수하고, 대용량 트랜잭션 데이터 처리 최적화 및 백엔드 API 기능 고도화를 수행했습니다."
                    techStack="Java, Spring, MyBatis, Oracle, TFS"
                    status="Live"
                    details={{
                        overview:
                            '수백만 건의 대용량 금융 계약 데이터 조회 및 대고객 백엔드 API 시스템을 운영·유지보수하고 고도화한 프로젝트입니다.',
                        metrics: [
                            { label: '증빙 서류 제출', value: '자동화' },
                            { label: '배치 처리 수행 시간', value: '4시간 → 3분으로 단축' },
                            { label: '대외기관 API 오류 발생 건수', value: '0건 유지' },
                        ],
                        features: [
                            '비대면 채널 완전판매 모니터링 시스템 개발 및 불완전판매 방지 제어 로직 구현',
                            '주민등록등본 등 스크래핑 엔진 API 연동을 통한 증빙 서류 제출 간소화 개발',
                            '보험료 납입시 가상계좌 동적 발급 및 실시간 입금 확인 백엔드 API 구축',
                            'GPS 기반 자동차 긴급 출동/사고접수 프로세스 개발',
                            '보험 상품 가격 공시 시스템 연동 개발',
                            '홈페이지 보험증권(이메일, PDF, 모바일증권) 발급 개발',
                            '보험가입전 적합성 및 적정성 자가진단 프로세스 개발',
                        ],
                        troubleshooting: {
                            situation:
                                '지하주차장 또는 주변에 건물이 없는 장소에서 사고 접수를 하면 기사님에게 정확하지 않은 위치 좌표가 전달되는 문제가 확인됨',
                            task: '현장 기사님에게 전달되는 좌표의 오차 범위를 축소가 필요',
                            action: '기기의 GPS 정보 외에도 주변 기지국/Wi-Fi 기반의 위치 보정 파라미터까지 같이 받아서, 백엔드에서 삼각측량 기반 보정 알고리즘을 거치도록 개발 및 설계',
                            result: '음영 지역에서의 좌표 오차 범위를 200m 이내로 축소',
                        },
                        demoUrl: 'https://www.idbins.com',
                    }}
                />
                <ProjectCard
                    title="학원/교육기관 B2B 출결 자동화 서비스"
                    description="웹 및 모바일 환경에서 학생들의 출결을 실시간으로 기록하고, 즉시 학부모에게 출석/하원 알림을 자동 발송하는 시스템 및 알림 파이프라인을 구축했습니다."
                    techStack="Java, Spring, MyBatis, MySQL, GIT"
                    status="Deprecated"
                    details={{
                        overview:
                            '웹 및 모바일 앱을 통해 실시간 출결 상태를 수집·연산하고, 등·하원 이벤트 발생 즉시 학부모에게 알림톡/SMS 메시지를 자동 발송하는 출결 솔루션',
                        metrics: [
                            { label: '엑셀 업로드 발송 성공', value: '300만건/3분' },
                            { label: '출결 처리 속도', value: '0.5초 미만' },
                            { label: '서식 변경 대응 공수', value: '70% 달성' },
                        ],
                        features: [
                            '출결 관리 솔루션 웹사이트 운영 및 서버 인프라 환경 구축·유지보수',
                            '학교 및 교육청 제출용 문서 다운로드 개발',
                            '강생 정보 일괄 처리를 위해 청크 단위 엑셀 대용량 업로드 개발',
                            '맞춤형 학사 캘린더 개발',
                            '단말기의 고유 코드 매핑 및 기기 등록 승인 API 개발',
                            '강의 개설, 강사 배정 API 개발',
                            '단말기 출결 시 메시지 알림 API 개발',
                            '알림톡 발송 실패 시 일반 SMS 문자로 자동 전환 발송 API 개발',
                            '출결 상태 요약 대시보드 개발',
                            'Thymeleaf 기반 PDF 변환 엔진 구축으로 서식 변경 공수 절감',
                        ],
                        troubleshooting: {
                            situation:
                                '교육청 지침이 바뀌어 문서 서식이 달라질 때마다, 백엔드의 PDF 생성 Java 코드를 일일이 수정하고 배포',
                            task: '서식이 바뀌어도 Java 코드 수정 없이 대응방안 필요',
                            action: 'HTML 기반의 템플릿(Thymeleaf)을 사용하고, 백엔드는 데이터만 넘겨주면 HTML을 PDF로 변환해 주는 구조로 변경',
                            result: '서식이 바뀌어도 Java 코드 수정 없이 HTML 템플릿만 수정해서 대응 가능',
                        },
                    }}
                />
                <ProjectCard
                    title="교육 플랫폼 웹사이트 재구축 및 백엔드 기능 고도화"
                    description="공식 웹사이트 인프라 전면 재구축을 진행하며 안정적인 서비스 제공을 위한 백엔드 API 신규 개발 및 데이터 마이그레이션을 수행했습니다."
                    techStack="Java, Spring, MyBatis, MS-SQL"
                    status="Live"
                    details={{
                        overview:
                            '전자정부프레임워크 최신 사양 및 Java 기반 인프라로 전환하며, 백엔드 RESTful API 를 재설계 및 신규 개발한 시스템 재구축 프로젝트',
                        metrics: [
                            { label: '컨텐츠 복구 시간', value: '99% 감소' },
                            { label: '화면 로딩 속도', value: '1.2초 달성' },
                            { label: '보안 취약점 지적 건수', value: '0건' },
                        ],
                        features: [
                            '학습 진도율 데이터 집계 시스템 개발',
                            '회원 연령 및 구매 이력 기반 맞춤 API 구현',
                            '네이버 및 카카오 OAuth2 연동을 통한 간편 로그인 및 통합 회원가입 API 개발',
                            '계층형 구조 커뮤니티 API 개발',
                            '유아 도서 신규 등록, 이미지 멀티파트 업로드 API 개발',
                            '자녀 프로필 다중 등록 및 수정 API 개발',
                            '도서 베스트셀러 및 최근 급상승 검색 키워드 순위 실시간 반환 API 개발',
                            '관리자화면 컨텐츠 배포 시스템 개발',
                            '학습 음원 다운로드 API 개발',
                            '과거 스냅샷으로 롤백 버전 관리 DB 스키마 및 API 개발',
                            '검색 성능 향상을 위한 MS-SQL 인덱싱 최적화',
                            '데이터 마이그레이션 스크립트 작성 및 검증',
                        ],
                        troubleshooting: {
                            situation:
                                '관리자가 메인 배너나 콘텐츠를 잘못 입력해 배포했을 때, 이전 상태로 되돌리는 기능이 없어 일일이 수기 입력함',
                            task: '오배포 시 빠르게 이전 버전으로 롤백하는 시스템 필요',
                            action: '테이블에 버전관리 스키마를 설계하고, 과거 버전 스냅샷을 최신버전으로 변경하는 롤백 API를 개발',
                            result: '콘텐츠 배포 실수 시 복구 시간을 30분에서 10초로 감소',
                        },
                        demoUrl: 'https://little.chunjae.co.kr/',
                    }}
                />
            </div>
        </section>
    );
}
