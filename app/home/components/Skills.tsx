"use client"
import React from 'react';
import Title from "@/app/home/components/Title";
import {HoverEffect} from "@/components/ui/card-hover-effect";
import {
    SiAngular,
    SiExpress,
    SiGit,
    SiIonic,
    SiNextdotjs,
    SiReact,
    SiGo,
    SiSpringboot,
    SiTailwindcss,
    SiTypescript,
    SiNodedotjs,
    SiCplusplus,
    SiKotlin,
    SiFirebase,
    SiCloudinary

} from "react-icons/si";

export default function Skills() {

    const skills = [
        {
            text: "React",
            Icon: SiReact,
        },
        {
            text: "Next.js",
            Icon: SiNextdotjs,
        },
        {
            text: "Angular",
            Icon: SiAngular,
        },
        {
            text: "Go",
            Icon: SiGo,
        },
        {
            text: "TypeScript",
            Icon: SiTypescript,
        },
        {
            text: "Tailwind CSS",
            Icon: SiTailwindcss,
        },
        {
            text: "Express.js",
            Icon: SiExpress,
        },
        {
            text: "SpringBoot",
            Icon: SiSpringboot,
        },
        {
            text: "Ionic",
            Icon: SiIonic,
        },
        {
            text: "Git",
            Icon: SiGit,
        },
        {
            text: "Node.js",
            Icon: SiNodedotjs,
        },
        {
            text: "C/C++",
            Icon: SiCplusplus,
        },
        {
            text: "Kotlin",
            Icon: SiKotlin,
        },
        {
            text: "Firebase",
            Icon: SiFirebase,
        },
        {
            text: "Cloudinary",
            Icon: SiCloudinary,
        }
    ];

    return(
        <div className="max-w-5xl mx-auto px-8">
            <Title text={'Skills 🎯'} className="flex flex-col items-center justify-center -rotate-6"/>

            <HoverEffect items={skills}/>
        </div>
    )
}