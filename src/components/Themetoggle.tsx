"use client";

import { useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    // 2. 버튼 클릭 시 dark 클래스를 껐다 켰다(Toggle) 하는 함수
    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-lg transition-colors"
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}