'use client';
import { useTranslations } from 'use-intl';
import ProjectCard from '@/src/components/home/ProjectCard';

export default function FeaturedProjects() {
    const tHome = useTranslations('Home');
    const tProj = useTranslations('Projects');
    return (
        <section className="mb-16">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                {tHome('featuredProjects')}
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                    ({tHome('featuredProjectsSub')})
                </span>
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* 프로젝트 카드 1 */}
                <ProjectCard
                    title={tProj('project1.title')}
                    description={tProj('project1.description')}
                    techStack={tProj('project1.techStack')}
                    status={tProj('project1.state') as 'Live' | 'Completed' | 'InProgress'}
                    statusColor="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                />
                {/* 프로젝트 카드 2 */}
                <ProjectCard
                    title={tProj('project2.title')}
                    description={tProj('project2.description')}
                    techStack={tProj('project2.techStack')}
                    status={tProj('project2.state') as 'Live' | 'Completed' | 'InProgress'}
                    statusColor="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                />
                <ProjectCard
                    title={tProj('project3.title')}
                    description={tProj('project3.description')}
                    techStack={tProj('project3.techStack')}
                    status={tProj('project3.state') as 'Live' | 'Completed' | 'InProgress'}
                    statusColor="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                />
                {/*
                개인 프로젝트, 팀 프로젝트, 서비스 
                */}
                <ProjectCard
                    title={tProj('project4.title')}
                    description={tProj('project4.description')}
                    techStack={tProj('project4.techStack')}
                    status={tProj('project4.state') as 'Live' | 'Completed' | 'InProgress'}
                    statusColor="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                />
            </div>
        </section>
    );
}
