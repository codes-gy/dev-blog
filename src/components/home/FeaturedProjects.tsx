import ProjectCard from '@/src/components/home/ProjectCard';

export default function FeaturedProjects() {
    return (
        <section className="mb-16">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                ✨ 주요 프로젝트
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">
                    (Featured Projects)
                </span>
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* 프로젝트 카드 1 */}
                <ProjectCard
                    title="Notion 기반 실시간 웹 CMS 블로그"
                    description="Next.js App Router와 Notion API, SSE 웹훅을 결합하여 데이터 갱신 시 실시간으로 화면이 리프레시되는 초경량 블로그 입니다"
                    techStack="Next.js, TypeScript, TailwindCSS, SSE"
                    status="Live"
                    statusColor="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                />
                {/* 프로젝트 카드 2 */}
                <ProjectCard
                    title="AI 기반 일정 관리 스케줄러"
                    description="자연어로 일정을 입력하면 대형 언어 모델이 컨텍스트를 분석하여 타임라인에 자동으로 일정을 파싱 및 정렬해주는 웹 앱입니다"
                    techStack="React, Node.js, OpenAI API, PostgreSQL"
                    status="Completed"
                    statusColor="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                />
                <ProjectCard
                    title="AI 기반 일정 관리 스케줄러"
                    description="자연어로 일정을 입력하면 대형 언어 모델이 컨텍스트를 분석하여 타임라인에 자동으로 일정을 파싱 및 정렬해주는 웹 앱입니다"
                    techStack="React, Node.js, OpenAI API, PostgreSQL"
                    status="Completed"
                    statusColor="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                />
                {/*
                개인 프로젝트, 팀 프로젝트, 서비스 
                */}
                <ProjectCard
                    title="AI 기반 일정 관리 스케줄러"
                    description="자연어로 일정을 입력하면 대형 언어 모델이 컨텍스트를 분석하여 타임라인에 자동으로 일정을 파싱 및 정렬해주는 웹 앱입니다"
                    techStack="React, Node.js, OpenAI API, PostgreSQL"
                    status="Completed"
                    statusColor="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                />
            </div>
        </section>
    );
}
