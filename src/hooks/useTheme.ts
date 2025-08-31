// hooks/useTheme.ts
"use client";
import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        if (localStorage.theme === "light") {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        } else {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        } else {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }
    };

    return { theme, toggleTheme };
}
