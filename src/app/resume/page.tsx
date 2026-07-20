import React from 'react';

interface ProjectDetailProps {
    overview: string;
    responsibilities: string[]; // 담당 업무
    metrics: { label: string; value: string }[];
    troubleshooting: {
        situation: string; // Situation: 문제 상황
        task: string; // Task: 과제 및 목표
        action: string; // Action: 수행 행동
        result: string; // Result: 최종 결과
        takeaway: string; // Takeaway: 교훈 및 역량 성장
    };
}

function ProjectSection({ overview, responsibilities, metrics, troubleshooting }: ProjectDetailProps) {
    return (
        <div className="rounded-xl border border-slate-100 bg-slate-50/40 p-5 shadow-sm md:p-7 dark:border-slate-800/80 dark:bg-slate-950/30">
            <div className="mt-1 space-y-6 text-[13px] md:space-y-8 md:text-[14px] lg:text-[15px]">
                {/* 개요 */}
                <div className="space-y-2">
                    <span className="block text-sm font-bold tracking-tight text-slate-900 md:text-[16px] dark:text-slate-100">
                        ⭐️ 프로젝트 개요
                    </span>
                    <p className="leading-relaxed tracking-normal text-slate-600 dark:text-slate-300">{overview}</p>
                </div>

                {/* 핵심 성과 */}
                <div className="space-y-2">
                    <span className="block text-sm font-bold tracking-tight text-slate-900 md:text-[16px] dark:text-slate-100">
                        🎉 핵심 성과
                    </span>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {metrics.map((m, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/50"
                            >
                                <span className="block text-[11px] font-medium text-slate-800 dark:text-slate-100">
                                    🟥{m.label}
                                </span>
                                <strong className="mt-0.5 block text-sm font-bold text-slate-800 dark:text-slate-100">
                                    {m.value}
                                </strong>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 담당 업무 */}
                <div className="space-y-2">
                    <span className="block text-sm font-bold tracking-tight text-slate-900 md:text-[16px] dark:text-slate-100">
                        🤹‍♀️ 담당 업무
                    </span>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        {responsibilities.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-400" />
                                <span>{r}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 트러블슈팅 */}
                <div className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm md:p-6 dark:border-slate-800 dark:bg-slate-900/80">
                    <span className="mb-4 block text-sm font-bold text-amber-600 md:text-[16px] dark:text-amber-400">
                        😧 트러블슈팅 (START)
                    </span>

                    <div className="space-y-4">
                        {[
                            {
                                label: 'Situation',
                                color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
                                text: troubleshooting.situation,
                            },
                            {
                                label: 'Task',
                                color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
                                text: troubleshooting.task,
                            },
                            {
                                label: 'Action',
                                color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400',
                                text: troubleshooting.action,
                            },
                            {
                                label: 'Result',
                                color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
                                text: troubleshooting.result,
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                                <span
                                    className={`w-[75px] shrink-0 rounded py-0.5 text-center text-[10px] font-bold tracking-wider uppercase md:text-[11px] ${item.color}`}
                                >
                                    {item.label}
                                </span>
                                <p className="text-[13px] leading-relaxed text-slate-600 md:text-[14px] dark:text-slate-300">
                                    {item.text}
                                </p>
                            </div>
                        ))}

                        <div className="mt-4 flex flex-col gap-1.5 border-t border-slate-100 pt-4 sm:flex-row sm:items-start sm:gap-3 dark:border-slate-800">
                            <span className="w-18.75 shrink-0 rounded bg-purple-50 py-0.5 text-center text-[10px] font-bold tracking-wider text-purple-700 uppercase md:text-[11px] dark:bg-purple-950/40 dark:text-purple-400">
                                Takeaway
                            </span>
                            <p className="text-[13px] leading-relaxed font-medium text-slate-700 md:text-[14px] dark:text-slate-200">
                                {troubleshooting.takeaway}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CareerPage() {
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-16 dark:bg-slate-950">
            <article className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:rounded-2xl md:p-12 dark:border-slate-800 dark:bg-slate-900">
                <header className="border-b border-slate-200 pb-5 dark:border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-slate-50">
                        경력기술서
                    </h1>
                    <p className="mt-1 text-[12px] text-slate-900 md:mt-2 md:text-sm dark:text-slate-50">
                        최종 수정일자: 2026년 7월 20일
                    </p>
                </header>

                <div className="mt-8 flex flex-col gap-10 md:mt-14 md:gap-16">
                    <section className="relative border-l-2 border-slate-200 pl-5 md:pl-7 dark:border-slate-800">
                        <div className="absolute top-2.5 -left-1.75 h-3 w-3 rounded-full bg-blue-500" />

                        <div className="mb-5">
                            <div className="flex flex-wrap items-baseline gap-x-2">
                                <h2 className="text-base font-bold text-slate-900 md:text-2xl dark:text-slate-100">
                                    금융/보험 계약 관리 및 시스템 운영 고도화
                                </h2>
                                <span className="text-[12px] font-bold text-blue-600 md:text-base dark:text-blue-400">
                                    백엔드 개발자
                                </span>
                            </div>
                            <p className="mt-0.5 text-[12px] text-slate-400 md:text-sm dark:text-slate-500">
                                2021.11 ~ 2025.06
                            </p>
                            <p className="mt-1.5 text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300">
                                담당역할 : 공식 홈페이지 운영, 보험상품 개발, 대용량 보험 계약 및 대출 조회 쿼리 성능
                                개선
                            </p>
                            <p>
                                키워드 :증빙 서류 제출 간소화 연동, 챗봇 상담 채널 연계, 사고보험금 청구 간소화, 상품
                                공시, 보장분석, 보험계약대출, 해지환급금, 자동차 사고접수, 출동 위치정보조회, 보험금
                                청구,상품비교, 보험료선납, 상품 장바구니, 완전판매 모니터링, 이벤트, 보험가입전
                                적합/적정 확인, 보험증권 프로세스,주민등록등본 스크래핑, 보험분석
                            </p>
                        </div>

                        <ProjectSection
                            overview="대고객 백엔드 API 시스템 고도화 및 대용량 보험 계약/대출 조회 쿼리 성능 개선 프로세스 총괄 담당"
                            responsibilities={[
                                '보험 계약 상태 변경 및 실시간 대출 연동 거래 코어 API 설계 및 개발',
                                '레거시 MyBatis 결합 복잡 쿼리 튜닝 및 인덱스 정비 작업 총괄',
                                '사용자 입력 데이터 검증을 위한 공통 유효성 인터셉터 모듈 설계 및 적용',
                                'TFS 형상관리를 활용한 상품 소스 배포 파이프라인 관리 및 운영 핫픽스 대응',
                            ]}
                            metrics={[
                                { label: '대용량 데이터 조회 속도', value: '30% 이상 향상 (3초 이내 → 2초 미만)' },
                                { label: '상품 및 배포 리드타임', value: '기존 14일에서 7일로 50% 단축' },
                                { label: '데이터 정합성 오류', value: '검증 로직 강화를 통해 0건 유지' },
                                { label: '대외 API 타임아웃 발생률', value: '기존 3.5%에서 0%로 안정화' },
                            ]}
                            troubleshooting={{
                                situation:
                                    '인프라 내 데이터 장기 누적으로 인해 대고객 보험 계약 및 대출 내역 조회 시 3초 이상의 응답 지연이 지속적으로 발생함.',
                                task: '동시 접속 피크 타임 시 DB Connection Pool 고갈 및 서버 행(Hang) 과부하 리스크를 예방하고, 평균 조회 성능을 2초 미만으로 단축해야 함.',
                                action: 'Oracle 데이터베이스 실행 계획을 분석하여 테이블 풀 스캔 및 비효율적 대량 머지 조인 구간을 도출함. 연관 서브쿼리의 반복적 접근을 ANSI JOIN 구조와 WITH 절 기반의 임시 집합 생성 방식으로 전면 수정해 인메모리 연산으로 유도함. 조회 빈도가 가장 높은 칼럼 조합을 기준으로 복합 인덱스를 재설계하고, 비즈니스 레이어 진입 전 동작하는 커스텀 어노테이션 기반 전역 마스킹 인터셉터를 구축함.',
                                result: '평균 응답 성능을 2초 미만으로 완벽히 안정화하였으며, DB 스캔 부하를 낮춰 피크 타임에도 시스템 가용성 99.9% 및 적재 정합성 오류 0건을 달성함.',
                                takeaway:
                                    '대규모 금융 인프라에서 실행 계획(Execution Plan) 분석을 통한 쿼리 튜닝과 데이터 결합 방식 변환이 시스템 안정성에 미치는 결정적인 파급력을 경험함.',
                            }}
                        />
                    </section>

                    <section className="relative border-l-2 border-slate-200 pl-5 md:pl-7 dark:border-slate-800">
                        <div className="absolute top-2.5 -left-1.75 h-3 w-3 rounded-full bg-blue-400" />

                        <div className="mb-5">
                            <div className="flex flex-wrap items-baseline gap-x-2">
                                <h2 className="text-base font-bold text-slate-900 md:text-2xl dark:text-slate-100">
                                    공공 및 기업 맞춤형 SI 프로젝트
                                </h2>
                                <span className="text-[12px] font-bold text-blue-600 md:text-base dark:text-blue-400">
                                    백엔드 개발자
                                </span>
                            </div>
                            <p className="mt-0.5 text-[12px] text-slate-400 md:text-sm dark:text-slate-500">
                                2021.04 ~ 2021.11
                            </p>
                            <p className="mt-1.5 text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300">
                                담당역할 : 사내 업무 효율화를 위한 운영 현황 대시보드 백엔드 API 설계 및 개발
                            </p>
                            <p>
                                키워드 : 전자 결재 문서 승인, 역할 기반 검증, 부서별 예산 집행률 및 비용 추이 통계 API,
                                운영 핵심 지표(KPI), SSE 기반 실시간 대시보드 인앱 알림, 웹훅 연동, 다단계 결재선 진행
                                현황 시각화
                            </p>
                        </div>

                        <ProjectSection
                            overview="사내 업무 효율화를 위한 대시보드 백엔드 API 설계 및 복합 데이터 집계 최적화"
                            responsibilities={[
                                '사내 운영지원 어드민 대시보드의 다차원 통계 집계 백엔드 엔드포인트 설계',
                                'JPA Entity 매핑 최적화 및 복잡 지표 연산을 위한 단일 DTO 직접 매핑 설계',
                                '보안 감사 대응을 위한 개인정보 식별 데이터 암호화 및 유동적 마스킹 공통 컴포넌트 개발',
                                'Swagger 기반 API 명세서 자동화 환경 구축을 통한 프론트엔드 연동 가이드 배포',
                            ]}
                            metrics={[
                                { label: '데이터 조회 및 응답 속도', value: '60% 이상 개선 (3.5초 → 1.5초 단축)' },
                                { label: '프론트엔드 연동 공수', value: 'API당 평균 4시간에서 1시간 미만으로 단축' },
                                { label: '보안 정책 적용', value: '개인정보 마스킹 공통 처리를 통한 유출 위험 차단' },
                            ]}
                            troubleshooting={{
                                situation:
                                    '운영 현황 통계 화면에서 다중 조인 및 다국적 복합 데이터 집계 연산이 겹치며 초기 페이지 로딩 속도가 3.5초 이상 지연되었고, 파편화된 백엔드 API 응답 구조로 화면 예외 연동 오류가 빈발함.',
                                task: '조회 속도를 2초 이내로 단축시키고 프론트엔드-백엔드 간 통신 규격을 공통화하여 연동 생산성을 높여야 함.',
                                action: 'JPA 환경에서 흔히 발생하는 N+1 성능 저하를 방지하기 위해 Fetch Join 및 EntityGraph를 다각도로 적용함. 통계성 데이터는 DTO 직접 조회 방식으로 분리하여 복잡한 다중 연산을 단일 쿼리로 병합함. @RestControllerAdvice와 Generic Wrapper 클래스를 설계하여 예외 처리를 규격화하고, 변동성이 낮은 요약 지표 데이터에는 @Scheduled와 연동한 로컬 인메모리 캐시 전략을 적용함.',
                                result: '평균 로딩 속도를 1.5초로 줄여 화면 지연을 완전히 극복했으며, 사내 운영팀 생산성을 확보하고 프론트엔드 통신 오류율을 0%에 가깝게 통제함.',
                                takeaway:
                                    'JPA 프레임워크 사용 시 ORM 메커니즘에 의존하기보다, 통계성 쿼리와 같이 무거운 연산은 DTO 직접 조회 및 캐싱 전략을 결합하는 유연한 아키텍처 구성이 중요함을 깨달음.',
                            }}
                        />
                    </section>

                    <section className="relative border-l-2 border-slate-200 pl-5 md:pl-7 dark:border-slate-800">
                        <div className="absolute top-2.5 -left-1.75 h-3 w-3 rounded-full bg-slate-500 dark:bg-slate-400" />

                        <div className="mb-5">
                            <div className="flex flex-wrap items-baseline gap-x-2">
                                <h2 className="text-base font-bold text-slate-900 md:text-2xl dark:text-slate-100">
                                    교육 플랫폼 웹사이트 재구축 프로젝트
                                </h2>
                                <span className="text-[12px] font-bold text-blue-600 md:text-base dark:text-blue-400">
                                    백엔드 개발자
                                </span>
                            </div>
                            <p className="mt-0.5 text-[12px] text-slate-400 md:text-sm dark:text-slate-500">
                                2018.04 ~ 2019.12
                            </p>
                            <p className="mt-1.5 text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300">
                                담당역할 : 웹사이트 재구축, 공통 모듈 설계 및 대용량 배치 처리
                            </p>
                            <p>
                                키워드 :마이페이지 학습 진도율 및 통계, 커뮤니티 게시판 계층형 아키텍처, 도서 유형별
                                상품 카탈로그 모델링, 소셜 로그인 및 통합 회원가입, 추첨 이벤트, 게시판 커서 기반
                                페이징, 연령별·발달단계별 맞춤 큐레이션
                            </p>
                        </div>

                        <ProjectSection
                            overview="전자정부프레임워크 최신 사양 기반 인프라 재구축, 공통 모듈 설계 및 대량 도서 카탈로그 배치 처리 고도화"
                            responsibilities={[
                                '대형 도서 정보 및 카탈로그 조회를 위한 RESTful API 및 페이징 레이어 신규 구현',
                                '로깅 및 전역 공통 예외 감지를 위한 Spring AOP 기반 Aspect 구조 모듈 설계',
                                '기존 필드 주입 레거시 구조의 빈 결합 상태를 생성자 주입 방식으로 전면 리팩토링',
                                '도서 검색 및 카테고리 필터링 속도 개선을 위한 MS-SQL 프로시저 및 인덱스 튜닝',
                            ]}
                            metrics={[
                                { label: '전체 API 개발 공수', value: '중복 코드 제거로 15일 단축' },
                                {
                                    label: '장애 모니터링 대응 속도',
                                    value: '로그 인프라 및 에러 등급 고도화로 50% 향상',
                                },
                                { label: '아키텍처 개선', value: '생성자 주입 방식 표준화로 순환 참조 위험 완전 제거' },
                            ]}
                            troubleshooting={{
                                situation:
                                    '로깅, 파라미터 유효성 검증, 글로벌 예외 처리 소스코드가 각 컨트롤러마다 중복 파편화되어 유지보수성이 나빠졌고, 도서 데이터가 늘어남에 따라 카탈로그 페이징 및 검색 성능이 급격히 저하됨.',
                                task: '중복 코드를 공통 모듈로 완벽히 분리하여 생산성을 높이고, 대용량 카탈로그 페이징 쿼리를 튜닝하여 런타임 안정성을 확보해야 함.',
                                action: 'Spring @Aspect(AOP)를 도입하여 비즈니스 로직과 혼재되어 있던 트레이스 로깅 및 검증 로직을 분리함. 기존의 파편화된 필드 주입 방식을 불변성이 보장되는 생성자 주입 방식으로 리팩토링하여 순환 참조를 컴파일 타임에 잡도록 설계함. MS-SQL 실행 계획을 추적하여 병목을 일으키는 정렬 및 테이블 풀 스캔 구간을 발견하고 카테고리에 최적화된 인덱스를 재구성함.',
                                result: '기존 컨트롤러 소스코드 라인을 약 30% 감축하여 가독성을 개선했으며, 전체 개발 공수를 15일 단축하고 고부하 페이징 검색 요청을 원활하게 안정화함.',
                                takeaway:
                                    'Spring 프레임워크의 AOP와 올바른 DI(의존성 주입) 기법을 활용하여 객체지향적 설계 규칙을 준수하는 것이 장기적 유지보수 관점에서 얼마나 가치 있는지 깊이 이해함.',
                            }}
                        />
                    </section>

                    <section className="relative border-l-2 border-slate-200 pl-5 md:pl-7 dark:border-slate-800">
                        <div className="absolute top-2.5 -left-1.75 h-3 w-3 rounded-full bg-slate-400 dark:bg-slate-500" />

                        <div className="mb-5">
                            <div className="flex flex-wrap items-baseline gap-x-2">
                                <h2 className="text-base font-bold text-slate-900 md:text-2xl dark:text-slate-100">
                                    학원/교육기관 B2B 출결 자동화 서비스
                                </h2>
                                <span className="text-[12px] font-bold text-blue-600 md:text-base dark:text-blue-400">
                                    백엔드 개발자
                                </span>
                            </div>
                            <p className="mt-0.5 text-[12px] text-slate-400 md:text-sm dark:text-slate-500">
                                2018.04 ~ 2019.07
                            </p>
                            <p className="mt-1.5 text-[12px] font-semibold text-slate-700 md:text-sm dark:text-slate-300">
                                담당역할 : 공식 홈페이지 운영, 실시간 출결 이벤트 처리, 대외 알림 연동 파이프라인 구축
                            </p>
                            <p>
                                키워드 : 행정 데이터 증빙, 단말기 연동 실시간 출결 이벤트, 출결 사유 증빙 첨부, 맞춤형
                                학사 캘린더, 수강생 대량 임포트 및 매핑, 온라인 수업, 출결 상태 실시간 모니터링 대시보드
                            </p>
                        </div>

                        <ProjectSection
                            overview="웹/모바일 단말기 연동 실시간 출결 이벤트 연산 처리 및 대외 알림(알림톡/SMS) 비동기 파이프라인 구축"
                            responsibilities={[
                                '하드웨어 단말기 통신 로직 및 패킷 무결성 검증용 커스텀 HandlerInterceptor 설계',
                                '대량 트래픽 쏠림 대비 ApplicationEvent 기반 알림 파이프라인 비동기 커널 핸들링 구조 구축',
                                '동일 단말기 내 연속 다중 태깅 오류 차단을 위한 메모리 기반 분산 요청 제한 로직 적용',
                                '출결 이력 원장 적재를 위한 RESTful 통신 규격 설계 및 안정적인 트랜잭션 범위 확립',
                            ]}
                            metrics={[
                                { label: '출결 데이터 / 알림 누락률', value: '트래픽 폭주 상황에서 0% 달성' },
                                { label: '피크타임 Heap 메모리', value: 'StringBuilder 변환으로 점유율 25% 감소' },
                                { label: '비즈니스 로직 연산 비용', value: '인터셉터 단 1차 검증 도입으로 35% 감소' },
                            ]}
                            troubleshooting={{
                                situation:
                                    '등하원 피크 시간대 대량 출결 요청이 쏠릴 때, 대외 알림(SMS/알림톡) API 서버의 일시적 통신 지연이 메인 톰캣 스레드와 DB 트랜잭션까지 블로킹하여 시스템 타임아웃을 유발함. 또한 학생들이 단기간에 카드를 여러 번 중복 태깅하여 데이터 정합성이 깨지는 동시성 문제가 있었음.',
                                task: '외부 인프라 장애나 지연이 메인 출결 코어 비즈니스에 영향을 주지 않도록 시스템을 격리하고, 중복 태깅 요청을 완벽히 제어해야 함.',
                                action: '스프링 내부 이벤트(ApplicationEvent)와 비동기 스레드 풀(@Async) 구조를 설계하여 출결 데이터 적재와 외부 문자 발송 파이프라인을 완전히 비동기 격리함. 통신 실패에 대비해 지수 백오프(Backoff) 기반의 리트라이 큐를 자체 제작함. 동시성 태깅 이슈는 사용자 ID 기반 단기 락(Lock) 메커니즘을 적용하여 3초 이내의 후속 요청을 멱등 처리하도록 설계했고, 소켓 데이터 패킷 유효성 검증은 HandlerInterceptor 단에서 처리하여 리소스를 아낌.',
                                result: '트래픽 밀집 피크 타임에도 데이터 및 알림 유실률 0%를 유지했으며, 불필요한 연산 비용을 35% 줄여 대시보드 실시간 동기화 지연율을 초 단위 미만으로 유지함.',
                                takeaway:
                                    '대량의 실시간 IO 트래픽이 집중되는 환경에서는 외부 API 시스템과의 결합도를 비동기 레이어로 격리 및 제어하는 아키텍처 방어벽 구축이 필수적임을 환기함.',
                            }}
                        />
                    </section>
                </div>

                <footer className="mt-8 border-t border-slate-200 pt-5 text-center md:mt-16 md:pt-10 dark:border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-6 py-2.5 text-[12px] font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98] md:px-8 md:py-3 md:text-base dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                    >
                        <span>홈으로 이동</span>
                    </a>
                </footer>
            </article>
        </div>
    );
}
