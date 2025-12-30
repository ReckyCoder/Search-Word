'use client';

import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Header() {

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

     // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => setMounted(true), [])

    if (!mounted) return null;


    return (
        <div className="p-4 w-full flex justify-end bg-zinc-50 dark:bg-black">
            {theme === 'light' ? 
            (
                <MoonIcon className="w-8 cursor-pointer text-black" onClick={() => setTheme('dark')}/>
            ) 
            : 
            (
                <SunIcon className="w-8 cursor-pointer text-white" onClick={() => setTheme('light')}/>
            )
            }
        </div>
    )
}
