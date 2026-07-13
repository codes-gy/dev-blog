export default function CapabilityList() {
    return (
        <div>
            <h4 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-200">💡 핵심 역량</h4>
            <ul className="list-inside list-disc space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <li>Spring Boot 및 Node.js 기반 RESTful API 설계 및 구현</li>
                <li>TypeScript 기반 안정성 확보 및 예외 처리</li>
                <li>RDBMS 데이터 모델링 및 기본 쿼리 최적화</li>
                <li>Jest 기반의 단위/통합 테스트 작성</li>
                <li>CI/CD 파이프라인 자동화 구축</li>
            </ul>
        </div>
    );
}
