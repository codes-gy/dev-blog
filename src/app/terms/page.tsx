import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-16 dark:bg-slate-950">
            <article className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm md:rounded-2xl md:p-12 dark:border-slate-800 dark:bg-slate-900">
                {/* 상단 헤더 */}
                <header className="border-b border-slate-100 pb-4 dark:border-slate-800">
                    <h1 className="text-base font-bold tracking-tight text-slate-900 md:text-3xl dark:text-slate-50">
                        서비스 이용약관
                    </h1>
                    <p className="mt-1 text-[11px] text-slate-400 md:mt-2 md:text-base dark:text-slate-500">
                        시행일자: 2026년 6월 18일
                    </p>
                </header>

                {/* 법적 필수 본문 */}
                <div className="mt-5 flex flex-col gap-5 text-[13px] leading-relaxed text-slate-600 md:mt-10 md:gap-8 md:text-base dark:text-slate-300">
                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 1 조 (목적)
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            본 약관은 운영진이 제공하고 운영하는 인터넷 서비스(이하 &quot;서비스&quot;)를 이용함에 있어,
                            이용자와 운영진 간의 권리, 의무, 책임 사항 및 서비스 이용 절차에 관한 기본적인 사항을
                            규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 2 조 (약관의 효력 및 변경)
                        </h2>
                        <div className="space-y-1 text-slate-500 dark:text-slate-400">
                            <p>
                                1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이
                                발생합니다.
                            </p>
                            <p>2. 운영자는 관계 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
                            <p>
                                3. 약관이 개정될 경우 운영자는 적용 일자 및 개정 사유를 명시하여 최소 7일 전부터 서비스
                                내에 공지합니다. 이용자가 개정 약관 적용일 이후에도 서비스를 계속 사용하는 경우 변경된
                                약관에 동의한 것으로 간주합니다.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 3 조 (용어의 정의)
                        </h2>
                        <div className="space-y-1 text-slate-500 dark:text-slate-400">
                            <p>
                                1. <strong>이용자:</strong> 본 약관에 따라 운영자가 제공하는 서비스를 이용하는 회원 및
                                비회원을 말합니다.
                            </p>
                            <p>
                                2. <strong>콘텐츠:</strong> 서비스 내에 게시된 글, 사진, 동영상, 댓글, 디자인, 코드 등
                                일체의 정보 및 자료를 말합니다.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 4 조 (서비스의 제공 및 이용제한)
                        </h2>
                        <div className="space-y-1 text-slate-500 dark:text-slate-400">
                            <p>
                                1. 서비스는 운영자의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간
                                제공함을 원칙으로 합니다.
                            </p>
                            <p>
                                2. 운영자는 시스템 정기 점검, 설비의 증설 및 교체, 서비스 설비의 장애 등 부득이한 사유가
                                발생한 경우 서비스의 전부 또는 일부를 사전 공지 후 일시적으로 중단할 수 있습니다. 단,
                                예측할 수 없는 사유로 인한 중단일 경우 사후에 공지합니다.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 5 조 (이용자의 게시물 및 저작권)
                        </h2>
                        <div className="space-y-2 text-slate-500 dark:text-slate-400">
                            <p>1. 서비스에 게시된 모든 콘텐츠의 저작권은 원저작자에게 귀속됩니다.</p>
                            <p>
                                2. 이용자는 서비스를 이용함으로써 얻은 정보를 운영자의 사전 승낙 없이 복제, 송신, 배포,
                                기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
                            </p>
                            <p>
                                3. 운영자는 이용자가 등록하는 내용물이 다음 각 호에 해당한다고 판단되는 경우 사전 통지
                                없이 삭제하거나 등록 거부를 할 수 있습니다.
                            </p>
                            <ul className="mt-1 list-none space-y-0.5 pl-3 text-[12px] text-slate-400 md:text-sm dark:text-slate-500">
                                <li>• 타인을 비방하거나 명예를 훼손하는 내용인 경우</li>
                                <li>• 공공질서 및 미풍양속에 위반되는 내용인 경우</li>
                                <li>• 운영자 또는 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 6 조 (광고 게재에 관한 조항)
                        </h2>
                        <div className="space-y-1 text-slate-500 dark:text-slate-400">
                            <p>1. 운영자는 서비스의 운영과 관련하여 서비스 화면에 광고를 게재할 수 있습니다.</p>
                            <p>
                                2. 서비스를 이용하는 이용자는 서비스 이용 시 노출되는 구글 애드센스 등 네트워크 광고
                                게재에 대해 동의하는 것으로 간주합니다.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 7 조 (운영자의 면책 및 책임 제한)
                        </h2>
                        <div className="space-y-1 text-slate-500 dark:text-slate-400">
                            <p>
                                1. 본 서비스에서 제공하는 모든 정보는 단순 참고용이며, 운영자는 콘텐츠의 정확성과
                                신뢰성을 100% 보장하지 않습니다. 콘텐츠를 바탕으로 행한 행위의 결과는 이용자 본인에게
                                책임이 있습니다.
                            </p>
                            <p>
                                2. 운영자는 천재지변, 기간통신사업자의 서비스 중단, 해킹 공격 등 불가항력적인 사유로
                                서비스를 제공할 수 없는 경우 발생한 손해에 대하여 책임을 면합니다.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-1 text-[13px] font-bold text-slate-800 md:mb-2 md:text-lg dark:text-slate-200">
                            제 8 조 (준거법 및 관할법원)
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            본 약관의 해석 및 이용자와 운영자 간의 분쟁에 대해서는 대한민국 법률을 준거법으로 적용하며,
                            발생한 소송이 제기되는 경우 운영자의 관할 법원을 합의 관할 법원으로 합니다.
                        </p>
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
