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
                        ⭐️ 담당 역할
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
                                <span className="block text-[14px] font-medium text-slate-800 dark:text-slate-100">
                                    🟦{m.label}
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
                                    className={`w-18.75 shrink-0 rounded py-0.5 text-center text-[10px] font-bold tracking-wider uppercase md:text-[11px] ${item.color}`}
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
                            {/*
                            <p>
                                증빙 서류 제출 간소화 연동, 챗봇 상담 채널 연계, 사고보험금 청구 간소화, 상품
                                공시, 보장분석, 보험계약대출, 해지환급금, 자동차 사고접수, 출동 위치정보조회, 보험금
                                청구,상품비교, 보험료선납, 상품 장바구니, 완전판매 모니터링, 이벤트, 보험가입전
                                적합/적정 확인, 보험증권 프로세스,주민등록등본 스크래핑, 보험분석
                            </p>
                            */}
                        </div>

                        <ProjectSection
                            overview="대고객 공식 홈페이지 시스템 운영 및 고도화, 대용량 보험 계약/대출 조회 쿼리 성능 개선 프로세스 담당"
                            responsibilities={[
                                '비대면 채널 완전판매 모니터링 시스템 개발',
                                '보험가입전 적합성 및 적정성 자가진단 프로세스 개발',
                                '주민등록등본 등 스크래핑 엔진 API 연동을 통한 증빙 서류 제출 간소화 개발',
                                '보험료 납입시 가상계좌 발급 연계 시스템 개발',
                                '자동차 사고접수 프로세스 개발',
                                '자동차 사고 출동 위치정보조회 솔루션 API 연계 파이프라인 구현',
                                '보험 상품 가격 공시 시스템 개발',
                                '보험 보장분석 개발',
                                '홈페이지 보험증권(이메일, PDF, 모바일증권) 발급 개발',
                            ]}
                            metrics={[
                                {
                                    label: '보험 대출',
                                    value: '테이블 풀 스캔이 발생하던 쿼리에 인덱스를 적용하여 기존 대비 DB I/O 비용 45% 절감 ',
                                },
                                {
                                    label: '상품 가격 공시',
                                    value: '상품 공통 모듈 적용으로 기존 배포 기간을 14일에서 7일로 50% 단축',
                                },
                                {
                                    label: '보험 증권',
                                    value: '파일 I/O 병목 구간 개선 및 비동기 처리로 기존 대비 발급 속도 45% 개선',
                                },
                                {
                                    label: '증빙 서류 제출 간소화',
                                    value: '등본 등 비정형 데이터 스크래핑 파싱 에러율 기존 8.2%에서 1% 이내로 감소',
                                },
                                {
                                    label: '자동차 사고접수',
                                    value: '파일 검증 모듈을 추가하여 비정상 파일 업로드 시도 차단',
                                },
                                {
                                    label: '완전판매 모니터링',
                                    value: '고객용 온라인 설문 채널을 개발하여 수기로 하던 모니터링 참여 과정을 간소화하고, 배치 기반의 대량 데이터 수집 및 상담사 자동 배정 연동 프로세스를 구현',
                                },
                            ]}
                            troubleshooting={{
                                situation:
                                    '지하주차장 또는 주변에 건물이 없는 장소에서 사고 접수를 하면 기사님에게 이상한 위치 좌표가 전달되는 문제 확인',
                                task: '현장 기사님에게 전달되는 좌표의 오차 범위를 감소가 필요',
                                action: '기기의 GPS 정보 외에도 주변 기지국/Wi-Fi 기반의 위치 보정 파라미터까지 같이 받아서, 백엔드에서 삼각측량 기반 보정 알고리즘을 거치도록 설계 및 개발',
                                result: '음영 지역에서의 좌표 오차 범위를 200m 이내로 축소',
                                takeaway: '수집된 데이터의 제한을 백엔드에서 보정하여 해결하는 경험',
                            }}
                        />
                    </section>

                    <section className="relative border-l-2 border-slate-200 pl-5 md:pl-7 dark:border-slate-800">
                        <div className="absolute top-2.5 -left-1.75 h-3 w-3 rounded-full bg-blue-400" />

                        <div className="mb-5">
                            <div className="flex flex-wrap items-baseline gap-x-2">
                                <h2 className="text-base font-bold text-slate-900 md:text-2xl dark:text-slate-100">
                                    전사 자원 관리 및 통합 대시보드 구축
                                </h2>
                                <span className="text-[12px] font-bold text-blue-600 md:text-base dark:text-blue-400">
                                    백엔드 개발자
                                </span>
                            </div>
                            <p className="mt-0.5 text-[12px] text-slate-400 md:text-sm dark:text-slate-500">
                                2021.04 ~ 2021.11
                            </p>
                            {/*
                            <p>
                                전자 결재 문서 승인, 역할 기반 검증, 부서별 예산 집행률 및 비용 추이 통계 API,
                                운영 핵심 지표(KPI), SSE 기반 실시간 대시보드 인앱 알림, 웹훅 연동, 다단계 결재선 진행
                                현황 시각화
                            </p>
                            */}
                        </div>

                        <ProjectSection
                            overview="사내 업무 효율화를 위한 전사 자원 관리 및 통합 대시보드 구축"
                            responsibilities={[
                                '전자결재 시스템 개발',
                                'SSE 기반 알림 개발',
                                '증명서 신청 및 결재 완료 시 자동 PDF 생성 API 개발',
                                '근태 및 휴가 관리 개발',
                                '화의실 예약 시스템 개발',
                                '헬프 데스크 시스템 개발',
                                '회의록 자동 생성',
                            ]}
                            metrics={[
                                {
                                    label: '전자결재 시스템',
                                    value: '수기 및 서면으로 진행되던 기존 결재 방식에서 웹에서 결재가 가능하도록 기능을 추가하여 결재 소요 시간을 기존 대비 50% 이상 단축',
                                },
                                {
                                    label: '회의실 예약 시스템',
                                    value: '오프라인 관리 방식을 실시간 예약 시스템으로 변경하고 회의실 이용 효율성을 기존 대비 30% 향상',
                                },
                                {
                                    label: '사내 대시보드',
                                    value: '기존 부서별 분산된 수기 데이터 관리 방식을 실시간 KPI 통합 시각화 솔루션 구축으로 전환하여 데이터 기반 의사결정 프로세스 시간을 기존 대비 30% 단축',
                                },
                                {
                                    label: '회의록 생성',
                                    value: '수기 작성과 녹음 청취로 많은 시간이 소요되던 기존 방식에 AI 음성인식 등 핵심 요약 기능을 추가하여 회의록 작성 시간을 기존 대비 70% 감소',
                                },
                                {
                                    label: '헬프데스크 시스템',
                                    value: '문의 분류와 배정을 수동으로 처리하던 기존 방식에 문의 유형별 담당 부서 자동 추천 기능을 추가하여 대응 시간을 기존 대비 40% 단축',
                                },
                                {
                                    label: '실시간 알림 시스템',
                                    value: '확인이 늦어 공백이 생기던 기존 환경에 중요도별 푸시 알림 기능을 추가하여 업무 및 장애 대응 속도를 기존 대비 2배 개선',
                                },
                            ]}
                            troubleshooting={{
                                situation:
                                    "서비스 전체 알림이 포화 상태일때, '서버 장애 긴급 알림'이 몇 분 뒤에 발송되는 문제를 확인",
                                task: '중요한 알림이 밀리지 않고 즉시 발송되도록 우선순위를 지정이 필요',
                                action: 'RabbitMQ Priority Queue를 적용해서 알림 메시지에 우선순위 등급을 매기고, 긴급 알림 전용 스레드를 따로 생성',
                                result: '긴급 장애 알림 전달 지연을 30초 이내로 감소',
                                takeaway: '작업 특성에 따라 큐 채널을 분리하고 우선순위를 두는 경험',
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
                            {/*
                            <p>
                                마이페이지 학습 진도율 및 통계, 커뮤니티 게시판 계층형 아키텍처, 도서 유형별
                                상품 카탈로그 모델링, 소셜 로그인 및 통합 회원가입, 추첨 이벤트, 게시판 커서 기반
                                페이징, 연령별·발달단계별 맞춤 큐레이션
                            </p>
                            */}
                        </div>

                        <ProjectSection
                            overview="전자정부프레임워크 최신 사양 기반 인프라 재구축, 공통 모듈 설계 및 대량 도서 카탈로그 배치 처리 고도화"
                            responsibilities={[
                                '학습 진도율 데이터 집계 시스템 개발',
                                '연령별 맞춤 상품 추천 API 개발',
                                '네이버 및 카카오 OAuth2 연동을 통한 간편 로그인 및 통합 회원가입 API 개발',
                                '계층형 구조 커뮤니티 API 개발',
                                '유아 도서 신규 등록, 이미지 멀티파트 업로드 API 개발',
                                '자녀 프로필 다중 등록 및 수정 API 개발',
                                '도서 베스트셀러 및 최근 급상승 검색 키워드 순위 실시간 반환 API 개발',
                                '관리자화면 컨텐츠 배포 시스템 개발',
                                '학습 음원 다운로드 API 개발',
                            ]}
                            metrics={[
                                {
                                    label: '연령별 맞춤 상품',
                                    value: '최신순 상품 노출 방식을 연령별 데이터 기반 맞춤 추천 API 개발로 고도화하여 추천 상품 클릭 전환율을 기존 대비 25% 향상시켰습니다.',
                                },
                                {
                                    label: '유아 도서 등록',
                                    value: '단일 파일 중심의 제한적인 등록 방식을 멀티파트 이미지 다중 업로드 개발로 개선하여 관리자의 콘텐츠 등록 소요 시간을 기존 대비 50% 감소',
                                },
                                {
                                    label: '학습 음원 다운로드',
                                    value: '네트워크 불안정 시 다운로드 끊김 및 파일 깨짐 현상을 이어받기 기능 및 검증 API 개발로 보완하여 다운로드 완료 성공률을 기존 대비 85% 향상',
                                },
                                {
                                    label: '전체 API 개발 공수',
                                    value: '공통 로직 부재로 인한 중복 코드 양산 구조를 모듈화 및 리팩토링으로 개선하여 전체 API 개발 공수를 기존 대비 15일 단축했습니다.',
                                },
                                {
                                    label: '콘텐츠 반영 속도',
                                    value: '배포 스케줄에 의존하던 게시글 반영 방식을 배포 없는 CMS 실시간 노출 기능으로 개선하여 콘텐츠 실시간 반영 대기 시간을 기존 대비 90% 이상 단축',
                                },
                                {
                                    label: '통합 회원가입 이탈률',
                                    value: '회원 인증 절차로 인한 유저 이탈 문제를 소셜 간편 로그인 API 적용으로 회원가입 이탈률 기존 대비 35% 감소',
                                },
                            ]}
                            troubleshooting={{
                                situation:
                                    '관리자가 메인 배너나 콘텐츠를 잘못 입력해 배포했을 때, 이전 상태로 되돌리는 기능이 없어 일일이 수기 입력함',
                                task: '오배포 시 버튼 하나로 이전 버전으로 롤백하는 시스템이 필요했습니다',
                                action: '테이블에 버전관리 스키마를 설계하고, 클릭 한 번으로 과거 버전 스냅샷을 최신버전으로 변경하는 롤백 API를 개발',
                                result: '콘텐츠 배포 실수 시 복구 시간을 30분에서 10초로 감소',
                                takeaway:
                                    '운영 도구를 만들 때는 오배포 상황을 대비한 버전 관리와 롤백을 꼭 염두에 두어야 함을 깨달음',
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
                            {/*
                            <p>
                                행정 데이터 증빙, 단말기 연동 실시간 출결 이벤트, 출결 사유 증빙 첨부, 맞춤형
                                학사 캘린더, 수강생 대량 임포트 및 매핑, 온라인 수업, 출결 상태 실시간 모니터링 대시보드
                            </p>
                            */}
                        </div>

                        <ProjectSection
                            overview="웹/모바일 단말기 연동 실시간 출결 이벤트 처리 및 대외 알림 파이프라인 구축"
                            responsibilities={[
                                '학교 및 교육청 제출용 문서 다운로드 개발',
                                '수강생 정보 일괄 처리를 위해 청크 단위 엑셀 대용량 업로드 개발',
                                '맞춤형 학사 캘린더 개발',
                                '단말기의 고유 코드 매핑 및 기기 등록 승인 API 개발',
                                '강의 개설, 강사 배정 API 개발',
                                '단말기 출결 시 메시지 알림 API 개발',
                                '알림톡 발송 실패 시 일반 SMS 문자로 자동 전환 발송 API 개발',
                                '출결 상태 요약 대시보드 개발',
                            ]}
                            metrics={[
                                {
                                    label: '대용량 엑셀 업로드',
                                    value: '일괄 등록 시 전체 데이터를 한 번에 파싱하던 방식을 청크 단위 분할 처리로 개선해 메모리 초과 오류 제거 및 기존 대비 업로드 속도 50% 향상',
                                },
                                {
                                    label: '제출용 문서 생성',
                                    value: 'DB 반복 조회 구조의 문서 템플릿 렌더링 방식을 쿼리 튜닝 및 데이터를 미리 계산하는 방식으로 변경하여 문서 생성 소요 시간을 기존 대비 40% 감소',
                                },
                                {
                                    label: '단말기 인증 및 보안',
                                    value: '단말기 고유 코드 매핑 API 고도화로 비인가 기기의 부정한 접근 취약점 차단',
                                },
                                {
                                    label: '학사 캘린더 일정',
                                    value: '다중 조인으로 얽힌 일정 데이터를 복합 인덱스 설계로 최적화하여 캘린더 화면 로딩 시간을 기존 대비 45% 단축',
                                },
                                {
                                    label: '알림톡/SMS 발송',
                                    value: '알림톡 발송 실패 시 일반 SMS로 자동 우회하는 비동기 폴백 구조를 설계하여 안정성 확보',
                                },
                                {
                                    label: '출결 현황 대시보드',
                                    value: '강의별 출결 요약 데이터의 집계 쿼리 최적화 및 캐싱을 적용하여 실시간 대시보드 API 응답 시간을 기존 대비 60% 단축',
                                },
                            ]}
                            troubleshooting={{
                                situation:
                                    '교육청 지침이 바뀌어 문서 서식이 달라질 때마다, 백엔드의 PDF 생성 Java 코드를 일일이 수정하고 배포함',
                                task: '서식이 바뀌어도 Java 코드 수정 없이 유연하게 대응하는 구조가 필요',
                                action: 'HTML 기반의 템플릿(Thymeleaf)을 사용하고, 백엔드는 데이터만 넘겨주면 HTML을 PDF로 변환해 주는 구조로 변경',
                                result: '서식이 바뀌어도 Java 코드 수정 없이 HTML 템플릿만 수정해서 대응',
                                takeaway: '파일 생성 로직과 서식 레이아웃을 분리해 두는 패턴을 경험',
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
