'use client';
import { useTranslations } from 'use-intl';

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string;
    status: 'Live' | 'Completed' | 'InProgress';
    statusColor: string;
}

export default function ProjectCard({ title, description, techStack, status, statusColor }: ProjectCardProps) {
    const tStates = useTranslations('Projects.states');
    return (
        <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition duration-150 hover:border-blue-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400">
            <div className="mb-2 flex items-start justify-between">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{title}</h4>
                {/*
                    bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                */}
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${statusColor}`}>{tStates(status)}</span>
            </div>
            <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">{description}</p>
            <div className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{techStack}</div>
        </div>
    );
}
