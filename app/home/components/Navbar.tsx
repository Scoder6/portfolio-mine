"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SiGeeksforgeeks, SiGithub } from "react-icons/si";
import LinkedinIcon from "./LinkedinIcon";
import { Sun, Moon, Download } from "lucide-react";
import { useTheme } from "next-themes";
import {cn} from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const socials = [
        {
            link: "https://www.linkedin.com/in/saptash-chaubey-624b33408/",
            label: "Linkedin",
            Icon: LinkedinIcon,
        },
        {
            link: "https://github.com/Scoder6",
            label: "Github",
            Icon: SiGithub,
        },
        {
            link: "https://www.geeksforgeeks.org/user/matulchae54m/",
            label: "Geeks For Geeks",
            Icon: SiGeeksforgeeks,
        },
    ];

    return (
        <nav id="navbar" className={cn("py-10 mb-20 flex justify-between items-center", className)}>
            <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-2">
  <span className="inline-flex items-center gap-3 flex-wrap">
                        <span className="underline underline-offset-8 decoration-green-500">{"I'm Saptash Chaubey."}</span>
                        <span className="relative inline-block w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-green-500 shadow-lg">
                            <Image 
                                src="/images/profile.png" 
                                alt="Saptash Chaubey" 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </span>
                    </span>
                    </h1>
            <div className="flex items-center gap-5">
                <Link
                    href="/cv"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors font-medium"
                    aria-label="Download CV"
                >
                    <Download className="h-4 w-4" />
                    <span>CV</span>
                </Link>
                {socials.map((social, index) => {
                    const Icon = social.Icon;
                    return (
                        <Link
                            href={social.link}
                            key={index}
                            aria-label={social.label}
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            <Icon className="h-5 w-5 hover:scale-125 transition-transform"/>
                        </Link>
                    );
                })}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5 text-yellow-400" />
                        ) : (
                            <Moon className="h-5 w-5 text-slate-700" />
                        )}
                    </button>
                )}
            </div>
        </nav>
    );
}
