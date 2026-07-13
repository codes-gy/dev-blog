import Image from 'next/image';
import { User } from 'lucide-react';

export default function ProfileAvatar() {
    return (
        <div className="flex shrink-0 flex-col items-center">
            <div className="relative mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md dark:border-slate-800 dark:bg-slate-800">
                <Image
                    src="/FILE000.jpg"
                    alt="Profile avatar"
                    width={128}
                    height={128}
                    priority
                    className="h-full w-full object-cover transition duration-300"
                />
            </div>
            {/*<div className="relative mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md dark:border-slate-800 dark:bg-slate-800">*/}
            {/*    <User className="h-16 w-16 text-slate-400 transition duration-300 hover:scale-110 dark:text-slate-500" />*/}
            {/*</div>*/}
            <span className="text-xl font-bold text-slate-800 dark:text-slate-200">지근영</span>
            <span className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">Backend Developer</span>
        </div>
    );
}
