'use client';

import { useEffect } from 'react';
import { CheckCircle2, ExternalLink, TrendingUp, X } from 'lucide-react';
import { ProjectCardProps } from './ProjectCard';

function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
            />
        </svg>
    );
}

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    statusLabel: string;
    statusClassName: string;
    tags: string[];
    details: NonNullable<ProjectCardProps['details']>;
}

export default function ProjectDetailModal({
    isOpen,
    onClose,
    title,
    statusLabel,
    statusClassName,
    tags,
    details,
}: ProjectDetailModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm duration-200"
            onClick={onClose}
        >
            <div
                className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8 dark:border-slate-800 dark:bg-slate-900"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            >
                {/* 닫기 버튼 */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* 모달 헤더 */}
                <div className="mb-6 pr-8">
                    <span
                        className={`mb-2 inline-block rounded border px-2.5 py-0.5 text-[11px] font-bold ${statusClassName}`}
                    >
                        {statusLabel}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 md:text-2xl dark:text-slate-50">{title}</h3>
                </div>

                {/* 수치적 성과 하이라이트 (Metrics) */}
                {details.metrics && details.metrics.length > 0 && (
                    <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 md:grid-cols-3 dark:border-blue-900/50 dark:bg-blue-950/40">
                        {details.metrics.map((metric, idx) => (
                            <div key={idx} className="flex flex-col">
                                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                    {metric.label}
                                </span>
                                <span className="text-base font-extrabold text-blue-600 md:text-lg dark:text-blue-400">
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-6 text-xs leading-relaxed text-slate-700 md:text-sm dark:text-slate-300">
                    {/* 프로젝트 개요 */}
                    <div>
                        <h5 className="mb-1.5 font-bold text-slate-900 dark:text-slate-100">개요</h5>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-300">{details.overview}</p>
                    </div>

                    {/* 주요 기능 및 역할 */}
                    <div>
                        <h5 className="mb-2 font-bold text-slate-900 dark:text-slate-100">주요 기능 및 수행 역할</h5>
                        <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                            {details.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 트러블슈팅 경험 */}
                    {details.troubleshooting && (
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                            <h5 className="mb-3 flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                                <TrendingUp className="h-4 w-4 text-blue-500" /> 기술적 문제 해결
                            </h5>
                            <div className="space-y-2 text-xs md:text-sm">
                                <div>
                                    <span className="font-semibold text-rose-600 dark:text-rose-400">문제: </span>
                                    <span className="text-slate-600 dark:text-slate-400">
                                        {details.troubleshooting.problem}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">해결: </span>
                                    <span className="text-slate-600 dark:text-slate-400">
                                        {details.troubleshooting.action}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">결과: </span>
                                    <span className="text-slate-600 dark:text-slate-400">
                                        {details.troubleshooting.result}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 사용 기술 */}
                    <div>
                        <h5 className="mb-2 font-bold text-slate-900 dark:text-slate-100">사용 기술</h5>
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 외부 링크 (GitHub / Live Demo) */}
                {(details.githubUrl || details.demoUrl) && (
                    <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                        {details.githubUrl && (
                            <a
                                href={details.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <GithubIcon className="h-4 w-4" /> GitHub Repository
                            </a>
                        )}
                        {details.demoUrl && (
                            <a
                                href={details.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                            >
                                <ExternalLink className="h-4 w-4" /> Live Demo
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
