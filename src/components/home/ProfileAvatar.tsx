'use client';
import Image from 'next/image';

export default function ProfileAvatar() {
    return (
        <div className="flex flex-shrink-0 flex-col items-center">
            {/*<div*/}
            {/*    className="mb-4 flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-4xl font-bold text-white shadow-md">*/}
            {/*    👨‍💻*/}
            {/*</div>*/}
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
            <span className="text-xl font-bold text-slate-800 dark:text-slate-200">지근영</span>
            <span className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">Full-Stack Developer</span>
        </div>
    );
}
