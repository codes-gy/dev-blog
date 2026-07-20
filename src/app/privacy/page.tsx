import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-16 dark:bg-slate-950">
            <article className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm md:rounded-2xl md:p-12 dark:border-slate-800 dark:bg-slate-900">
                {/* 상단 헤더 */}
                <header className="border-b border-slate-100 pb-4 dark:border-slate-800">
                    <h1 className="text-base font-bold tracking-tight text-slate-900 md:text-3xl dark:text-slate-50">
                        개인정보처리방침
                    </h1>
                    <p className="mt-1 text-[11px] text-slate-400 md:mt-2 md:text-base dark:text-slate-500">
                        시행일자: 2026년 6월 18일
                    </p>
                </header>

                {/* 법적 필수 본문 */}
                <div className="mt-5 flex flex-col gap-5 text-[13px] leading-relaxed text-slate-600 md:mt-10 md:gap-8 md:text-base dark:text-slate-300">
                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            1. 개인정보의 처리 목적 및 수집 항목
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            본 블로그는 별도의 회원가입 없이 콘텐츠를 자유롭게 이용할 수 있습니다. 단, 사용자가
                            &apos;문의하기&apos; 시스템을 이용하는 경우 원활한 회신을 위해 이메일 주소를 수집합니다.
                            또한, 인터넷 서비스 이용과정에서 **방문자의 IP 주소, 쿠키, 서비스 이용 기록, 방문 기록**이
                            시스템에 의해 자동으로 생성되어 수집될 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            2. 쿠키(Cookie) 및 구글 애드센스 광고 안내
                        </h2>
                        <p className="mb-2 text-slate-500 dark:text-slate-400">
                            본 블로그는 구글(Google, Inc.)에서 제공하는 웹 분석 및 광고 게재 시스템인 **구글
                            애드센스(Google AdSense)**를 사용하고 있습니다.
                        </p>
                        <ul className="list-disc space-y-1 pl-4 text-slate-500 dark:text-slate-400">
                            <li>
                                구글을 포함한 제3자 판매자는 쿠키(Cookie)를 사용하여 사용자의 이전 방문 기록을 바탕으로
                                맞춤형 광고를 게재합니다.
                            </li>
                            <li>
                                구글의 광고 쿠키를 사용하여 구글 및 파트너사는 본 사이트 또는 다른 사이트의 방문 기록을
                                토대로 사용자에게 알맞은 광고를 제공할 수 있습니다.
                            </li>
                            <li>
                                사용자는 브라우저 설정에서 쿠키 수집을 거부하거나,{' '}
                                <a
                                    href="https://tools.google.com/dlpage/gaoptout"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-500 underline hover:text-blue-600"
                                >
                                    구글 광고 설정
                                </a>
                                을 통해 맞춤형 광고 게재를 비활성화할 수 있습니다.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            3. 개인정보의 보유 및 파기 절차
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            문의하기를 통해 접수된 이메일 및 데이터는 답변 및 사용자 피드백 처리가 완료된 후 지체 없이
                            영구 파기됩니다. 관계 법령에 의해 특별히 보존할 필요가 있는 경우가 아니라면 어떠한 수집
                            개인정보도 장기 보유하지 않는 것을 원칙으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            4. 이용자의 권리와 그 행사방법
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            이용자는 언제든지 본 블로그에 수집된 본인의 이메일 정보 등에 대해 열람, 수정, 혹은 삭제를
                            요청할 수 있습니다. 상단 혹은 푸터 메뉴의 &apos;문의하기&apos; 창구를 통해 연락해 주시면
                            관리자는 지체 없이 즉각 파기 및 수정 조치하겠습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            5. 권익침해 구제방법
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            이용자는 개인정보침해에 대한 신고나 상담이 필요한 경우 아래의 정부 기관에 문의하여 도움을
                            받으실 수 있습니다.
                        </p>
                        <ul className="mt-1 list-none space-y-0.5 pl-1 text-[12px] text-slate-500 md:text-sm dark:text-slate-400">
                            <li>• 개인정보침해신고센터 (국번없이 118 / privacy.kisa.or.kr)</li>
                            <li>• 대검찰청 사이버범죄수사과 (국번없이 1301 / spo.go.kr)</li>
                            <li>• 경찰청 사이버수사국 (국번없이 182 / ecrm.cyber.go.kr)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            6. 개인정보 보호책임자 및 안내
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            본 블로그는 이용자의 개인정보를 보호하고 관련 불만을 처리하기 위하여 아래와 같이 관리자를
                            지정하고 있습니다.
                        </p>
                        <div className="mt-2 rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-[11px] md:mt-3 md:p-4 md:text-sm dark:border-slate-800 dark:bg-slate-950/50">
                            <p>
                                • <strong>담당자:</strong> 블로그 운영진
                            </p>
                            <p className="mt-1">
                                • <strong>문의처:</strong> 사이트 내 &apos;문의하기&apos; 페이지 양식 이용
                            </p>
                        </div>
                    </section>
                </div>

                <footer className="mt-6 border-t border-slate-100 pt-4 text-center md:mt-12 md:pt-8 dark:border-slate-800">
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
