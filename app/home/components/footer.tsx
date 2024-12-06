import Link from 'next/link'; // Import Next.js Link component
import React from 'react';
import { SiGeeksforgeeks, SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer( ) {
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

            <div className="flex items-center justify-center mt-8 gap-5"> {/* Tailwind classes for styling */}
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
    );
}
