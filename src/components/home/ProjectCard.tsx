interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string;
    status: 'Live' | 'Completed' | 'InProgress';
}

const statusMeta: Record<ProjectCardProps['status'], { label: string; className: string }> = {
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
};

const statusKoreanMap: Record<ProjectCardProps['status'], string> = {
    Live: '운영중',
    Completed: '완료',
    InProgress: '진행중',
};

const statusColorMap: Record<ProjectCardProps['status'], string> = {
    Live: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    Completed: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    InProgress: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
};

export default function ProjectCard({ title, description, techStack, status }: ProjectCardProps) {
    return (
        <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition duration-150 hover:border-blue-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400">
            <div className="mb-2 flex items-start justify-between">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{title}</h4>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${statusColorMap[status]}`}>
                    {statusKoreanMap[status] || status}
                </span>
            </div>
            <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">{description}</p>
            <div className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{techStack}</div>
        </div>
    );
}
