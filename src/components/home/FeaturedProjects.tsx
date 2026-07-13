import ProjectCard from '@/src/components/home/ProjectCard';

export default function FeaturedProjects() {
    return (
        <section className="mb-16">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                ✨ 주요 프로젝트
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">(Featured Projects)</span>
            </h3>
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
                            { label: 'DB CPU 점유율', value: '45% 감소' },
                        ],
                        features: [
                            'Redis Sorted Set(ZSET)의 Score(Timestamp)를 활용한 순차 대기 순번 발급 로직 구축',
                            'Spring WebFlux 기반 논블로킹(Non-blocking) 대기열 상태 폴링 API 구현',
                            '검증된 진입 토큰 발행 및 세션 자동 만료 TTL 스케줄러 개발',
                        ],
                        troubleshooting: {
                            problem:
                                '초기 동시 접근 테스트 시 Thread Blocking으로 인해 Redis Connection Pool 병목 및 응답 지연 발생',
                            action: 'Spring MVC 구조를 Reactive Non-blocking WebFlux 구조로 전환하고 Lettuce Reactive Redis Template으로 커넥션 풀 최적화',
                            result: '동시 접속자 5,000명 기준 시스템 다운 없이 평균 응답 시간을 15ms 이내로 안정화',
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
                            'Discord API 연동을 통한 포럼 게시글 CRUD 명령어 핸들러 구축',
                            '디스코드 스레드 상태 변경 이벤트를 감지하여 외부 백엔드 API로 웹훅 전송',
                            '사용자 권한 검증 미들웨어 구축을 통해 관리자 전용 포럼 제어 로직 구현',
                        ],
                        troubleshooting: {
                            problem:
                                '디스코드 API의 Strict Rate Limit 정책으로 인해 순간적인 다량 명령어 발생 시 429 Error 발생',
                            action: 'In-memory Queue를 활용해 디스코드 API 요청 버퍼링 및 Throttling 재시도 로직 구현',
                            result: 'API 요청 성공률 99.9% 달성 및 Rate Limit 차단 이슈 완전 해결',
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
                            { label: 'Lighthouse Performance', value: '98점' },
                            { label: 'SEO 점수 (Lighthouse)', value: '100점' },
                        ],
                        features: [
                            'Notion API 기반 블록 데이터 파싱 및 React 컴포넌트 커스텀 렌더링',
                            'Server-Sent Events(SSE) 및 ISR 기법으로 노션 데이터 변경 시 실시간 화면 자동 갱신',
                            'SEO 최적화를 위한 Dynamic OpenGraph 메타태그 및 Sitemap 자동 생성',
                        ],
                        troubleshooting: {
                            problem: 'Notion API의 긴 응답 속도로 인해 초기 페이지 로딩(TTFB) 시간이 2.5초 이상 지연',
                            action: 'Next.js Data Cache 및 Tag 기반 Invalidation 전략을 적용하여 서버 사이드 렌더링 최적화',
                            result: 'TTFB 로딩 시간을 0.3초 대로 단축하고 성능 점수 98점 확보',
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
                            { label: 'DB 쿼리 수행 시간', value: '35% 단축' },
                            { label: '운영 장애율', value: '0건 유지' },
                        ],
                        features: [
                            '계약 내역 및 가입 정보 다중 조인 MyBatis 복합 쿼리 리팩토링',
                            'Oracle DB 실행 계획 분석 및 복합 인덱스 재설계',
                            '계약 상태 변경 트랜잭션의 데이터 정합성 보장을 위한 동시성 제어',
                        ],
                        troubleshooting: {
                            problem:
                                '월말/분기말 배치 작업 및 특정 기간 계약 조회 시 Full Table Scan으로 인한 DB Server Hang 현상 발생',
                            action: '파티셔닝 테이블 활용 및 병목이 발생하는 인덱스 재구성, 서브쿼리 구조 개선',
                            result: '슬로우 쿼리 수행 시간을 4.2초에서 1.1초로 약 70% 단축하고 시스템 안정성 확보',
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
                            '웹 및 모바일 앱을 통해 실시간 출결 상태를 수집·연산하고, 등·하원 이벤트 발생 즉시 학부모에게 알림톡/SMS 메시지를 자동 발송하는 스마트 출결 솔루션입니다.',
                        metrics: [
                            { label: '일평균 처리 데이터', value: '50만 건+' },
                            { label: '알림 발송 처리 속도', value: '< 1초' },
                            { label: 'DB 쿼리 부하', value: '85% 감소' },
                        ],
                        features: [
                            '출결 관리 솔루션 웹사이트 운영 및 서버 인프라 환경 구축·유지보수',
                            '출결 이벤트 수신 즉시 학부모 대상 메시지를 생성하고 비동기 메시지 큐를 통해 순차 발송하는 알림 파이프라인 구축',
                            '실시간 출결 현황/알림 수신 여부 조회를 위한 RESTful API 구현',
                            '외부 알림 API 연동 실패 시 자동 재시도 및 Fallback 발송 메커니즘 개발',
                        ],
                        troubleshooting: {
                            problem: '강의 시작 등 트래픽 폭주로 Out of Memory 및 DB 커넥션 풀 고갈 현상 발생',
                            action: '조회가 집중되는 학생/강의 기본 데이터를 Redis 캐시 레이어로 이전하여 DB 직접 조회를 차단하고, 알림 발송 로직을 비동기 큐 처리 구조로 전환',
                            result: 'DB 부하 85% 감소 및 JVM Heap Overflow 발생률 0건 달성',
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
                            '전자정부프레임워크 최신 사양 및 Java 기반 인프라로 전환하며, 백엔드 RESTful API 를 재설계 및 신규 개발한 시스템 재구축 프로젝트입니다.',
                        metrics: [
                            { label: '마이그레이션 데이터', value: '100% 무손실' },
                            { label: 'API 표준화율', value: '100% 달성' },
                            { label: 'API 응답 속도', value: '50% 개선' },
                        ],
                        features: [
                            '기존 DB 데이터를 신규 데이터베이스 스키마 구조로 추출·변환·적재하는 배치 모듈 구현',
                            '수강 신청, 결제, 강의 데이터 처리를 위한 RESTful API 백엔드 구축 및 슬로우 쿼리 리팩토링',
                            'Spring AOP 기반 공통 로깅, 예외 처리, 요청 파라미터 유효성 검증 미들웨어 구축',
                            '인덱스 재구성 및 실행 계획 분석을 통한 DB 접근 로직 최적화',
                        ],
                        troubleshooting: {
                            problem:
                                '기존 DB의 비정규화된 테이블 구조와 중복 키값으로 인해 데이터 이전 중 FK 참조 오류 및 누락 발생 위험',
                            action: '데이터 마이그레이션 전용 검증 스크립트 작성 및 단계별 데이터 검증 파이프라인 구축',
                            result: '300만 건의 데이터를 불일치율 0%로 이전 완료하고 API 응답 속도를 기존 대비 50% 단축(600ms → 300ms)',
                        },
                        demoUrl: 'https://little.chunjae.co.kr/',
                    }}
                />
            </div>
        </section>
    );
}
