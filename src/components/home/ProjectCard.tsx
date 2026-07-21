'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ExternalLink, TrendingUp, X } from 'lucide-react';
import ProjectDetailModal from '@/src/components/home/ProjectDetailModal';

export interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string;
    status: 'Live' | 'Completed' | 'InProgress' | 'Deprecated';
    details?: {
        overview: string;
        // 핵심 성과
        metrics?: {
            label: string;
            value: string;
        }[];
        // 주요 기능 및 역할
        features: string[];
        // 트러블슈팅 경험
        troubleshooting?: {
            situation: string;
            task: string;
            action: string;
            result: string;
        };
        githubUrl?: string;
        demoUrl?: string;
    };
}

const statusConfig: Record<ProjectCardProps['status'], { label: string; className: string }> = {
    Live: {
        label: '운영중',
        className: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    },
    Completed: {
        label: '완료',
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    },
    InProgress: {
        label: '진행중',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    },
    Deprecated: {
        label: '종료',
        className: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    },
};

export default function ProjectCard({ title, description, techStack, status, details }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { label, className } = statusConfig[status];
    const tags = techStack.split(',').map((tag) => tag.trim());

    return (
        <>
            <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition duration-150 hover:border-blue-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400">
                <div>
                    <div className="mb-2 flex items-start justify-between">
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{title}</h4>
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${className}`}>{label}</span>
                    </div>
                    <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">{description}</p>
                </div>
                <div>
                    {details && (
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            자세히 보기 <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    )}
                    <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3 dark:border-slate-800/80">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {details && (
                <ProjectDetailModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={title}
                    statusLabel={label}
                    statusClassName={className}
                    tags={tags}
                    details={details}
                />
            )}
        </>
    );
}
