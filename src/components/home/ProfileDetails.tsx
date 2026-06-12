import CapabilityList from '@/src/components/home/CapbilityList';
import TimelineList from '@/src/components/home/TimelineList';

export default function ProfileDetails() {
    return (
        <div className="w-full flex-1">
            <h2 className="mb-4 text-center text-2xl font-bold text-slate-950 md:text-left dark:text-slate-50">
                &#34;복잡한 문제를 단순하고 견고한 코드로 해결합니다.&#34;
            </h2>
            <p className="mb-6 text-justify text-sm leading-relaxed text-slate-600 md:text-left dark:text-slate-400">
                안녕하세요! 사용자 경험(UX) 최적화와 안정적인 인프라 설계에
                관심이 많은 개발자입니다. 단순히 작동하는 기능을 만드는 것에
                안주하지 않고, 프레임워크의 내부 동작 원리를 이해하며 비즈니스
                가치를 극대화할 수 있는 아키텍처를 고민합니다. 기술 블로그를
                통해 새로 배운 지식을 정제하여 공유하고 있습니다.
            </p>
            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 dark:border-slate-800">
                <CapabilityList />
                <TimelineList />
            </div>
        </div>
    );
}
