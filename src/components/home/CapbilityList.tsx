export default function CapabilityList() {
    return (
        <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                💡 Core Capabilities
            </h4>
            <ul className="list-inside list-disc space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <li>Next.js / React 기반 웹 서비스 아키텍처 설계</li>
                <li>TypeScript를 활용한 타입 안정성 및 고품질 코드 유지</li>
                <li>RESTful API 및 확장성 있는 DB 모델링</li>
                <li>CI/CD 파이프라인 구축 및 Vercel/AWS 인프라 배포</li>
            </ul>
        </div>
    );
}
