import CapabilityList from '@/src/components/home/CapabilityList';
import TimelineList from '@/src/components/home/TimelineList';

export default function ProfileDetails() {
    return (
        <div className="w-full flex-1">
            <h2 className="mb-4 text-center text-2xl font-bold text-slate-950 md:text-left dark:text-slate-50">
                Java & Node.js 개발자 지근영입니다.
            </h2>
            <div className="mb-6 space-y-2 text-justify text-sm leading-relaxed text-slate-600 md:text-left dark:text-slate-400">
                <p>
                    Node.js/TypeScript, Spring boot 적용 가이드 등 실무 및 학습 과정에서 검증한 문제 및 해결 방법을
                    기록하고 있습니다.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 dark:border-slate-800">
                <CapabilityList />
                <TimelineList />
            </div>
        </div>
    );
}
