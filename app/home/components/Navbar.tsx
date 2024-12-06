import Link from 'next/link'; // Import Next.js Link component
import React from 'react';
import { SiGeeksforgeeks, SiGithub, SiLinkedin } from "react-icons/si";
import {cn} from "@/lib/utils";

export default function Navbar( className: {className?: string }) {
    const socials = [
        {
            link: "https://www.linkedin.com/in/saptash-chaubey-711a3322a/",
            label: "Linkedin",
            Icon: SiLinkedin,
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
        <nav className={cn("py-10 flex justify-between items-center", className)}>
            <h1 className="text-2xl font-bold underline underline-of fset-8 decoration-green-500 -rotate-2">Saptash Chaubey🧔🏻</h1>

            <div className="flex items-center gap-5"> {/* Tailwind classes for styling */}
                {socials.map((social, index) => {
                    const Icon = social.Icon; // Retrieve the component
                    return (
                        <Link
                            href={social.link}
                            key={index}
                            aria-label={social.label}


                        >
                            <Icon className="h-5 w-5 hover:scale-125"/> {/* Render the component */}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
