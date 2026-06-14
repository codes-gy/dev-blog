import ProjectCard from '@/src/components/home/ProjectCard';

export default function FeaturedProjects() {
    return (
        <section className="mb-16">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                ✨ 주요 프로젝트
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">(Featured Projects)</span>
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* 프로젝트 카드 1 */}
                <ProjectCard
                    title="Notion 기반 실시간 웹 CMS 블로그"
                    description="Next.js App Router와 Notion API, SSE 웹훅을 결합하여 데이터 갱신 시 실시간으로 화면이 리프레시되는 초경량 블로그 입니다"
                    techStack="Next.js, TypeScript, TailwindCSS, SSE"
                    status="Live"
                />
                {/* 프로젝트 카드 2 */}
                <ProjectCard
                    title="DB손해보험 홈페이지 시스템 운영 및 API 고도화"
                    description="엔터프라이즈급 금융 계약 관리 시스템을 안정적으로 운영·유지보수하고, 대용량 트랜잭션 데이터 처리 최적화 및 백엔드 API 기능 고도화를 수행했습니다."
                    techStack="Java 8, Spring, MyBatis, Oracle"
                    status="Live"
                />
                <ProjectCard
                    title="실시간 사용자 출결 정보 및 데이터 처리 엔진"
                    description="복잡한 대용량 사용자 출결 상태 및 타임 트래킹 데이터셋을 실시간으로 유연하게 파싱, 연산, 관리하는 서버 사이드 코어 로직을 설계하고 구현했습니다."
                    techStack="Java 8, Spring, MyBatis, MySQL"
                    status="Completed"
                />
                {/*
                개인 프로젝트, 팀 프로젝트, 서비스 
                */}
                <ProjectCard
                    title="리틀천재 공식 웹사이트 재구축 및 관리 기능 고도화"
                    description="천재교육 리틀천재의 공식 웹사이트 인프라를 전면 재구축하고, 안정적인 서비스 제공을 위한 백엔드 기능 개발 및 데이터 마이그레이션을 수행했습니다."
                    techStack="Java 8, Spring, MyBatis, MS-SQL"
                    status="Live"
                />
            </div>
        </section>
    );
}
