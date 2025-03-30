'use client'
import Link from 'next/link';
import React from 'react';
import { SiGeeksforgeeks, SiGithub, SiLinkedin } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

export default function Footer() {
    const socials = [
        {
            link: "https://www.linkedin.com/in/saptash-chaubey-711a3322a/",
            label: "LinkedIn",
            Icon: SiLinkedin,
            color: "text-blue-600 hover:text-blue-500",
        },
        {
            link: "https://github.com/Scoder6",
            label: "GitHub",
            Icon: SiGithub,
            color: "text-gray-800 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-300",
        },
        {
            link: "https://www.geeksforgeeks.org/user/matulchae54m/",
            label: "GeeksForGeeks",
            Icon: SiGeeksforgeeks,
            color: "text-green-600 hover:text-green-500",
        },
        {
            link: "mailto:matulchaubey669@gmail.com",
            label: "Email",
            Icon: MdEmail,
            color: "text-red-500 hover:text-red-400",
        },
    ];

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-16 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    {/* Social Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
                        {socials.map((social, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`${social.color} transition-colors duration-300`}
                                >
                                    <social.Icon className="h-6 w-6" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Copyright and additional links */}
                    <div
                        className="flex flex-col md:flex-row items-center gap-4 text-center text-gray-600 dark:text-gray-400 text-sm">
                        <span>© {new Date().getFullYear()} Saptash Chaubey. All rights reserved.</span>
                        <span className="hidden md:block">•</span>
                        <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <span className="hidden md:block">•</span>

                        <Link href="/offer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            What I can Offer
                        </Link>
                    </div>

                    {/* Back to top button */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="mt-6 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                        Back to top ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}