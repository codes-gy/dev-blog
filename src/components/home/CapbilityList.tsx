export default function CapabilityList() {
    return (
        <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">💡 Core Capabilities</h4>
            <ul className="list-inside list-disc space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <li>Java 및 Node.js 기반의 대규모/실시간 백엔드 API 아키텍처 설계</li>
                <li>TypeScript 및 Next.js 중심의 타입 안정성 높은 웹 서비스 구현</li>
                <li>관계형 DB 모델링 및 쿼리 최적화 능력을 통한 정합성 확보</li>
                <li>CI/CD 파이프라인 구축 및 Vercel/AWS 인프라 배포 및 운영</li>
            </ul>
        </div>
    );
}
