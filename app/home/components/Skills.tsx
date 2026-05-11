"use client"
import React from 'react';
import Title from "@/app/home/components/Title";
import {HoverEffect} from "@/components/ui/card-hover-effect";
import { Cloud } from "lucide-react";
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
    SiCloudinary,
    SiGraphql,
    SiRedis,
    SiDocker,
    SiMysql,
    SiMui,
    SiApachecassandra,
    SiExpo,
    SiVite,
    SiHtml5,
    SiCss,
    SiJavascript
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
            text: "Node.js",
            Icon: SiNodedotjs,
        },
        {
            text: "C++",
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
        },
        {
            text: "GraphQL",
            Icon: SiGraphql,
        },
        {
            text: "AWS",
            Icon: Cloud,
        },
        {
            text: "Redis",
            Icon: SiRedis,
        },
        {
            text: "Docker",
            Icon: SiDocker,
        },
        {
            text: "MySQL",
            Icon: SiMysql,
        },
        {
            text: "Material-UI",
            Icon: SiMui,
        },
        {
            text: "Apache Cassandra",
            Icon: SiApachecassandra,
        },
        {
            text: "Expo",
            Icon: SiExpo,
        },
        {
            text: "Vite",
            Icon: SiVite,
        },
        {
            text: "HTML5",
            Icon: SiHtml5,
        },
        {
            text: "CSS3",
            Icon: SiCss,
        },
        {
            text: "JavaScript",
            Icon: SiJavascript,
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
        },
        {
            text: "GraphQL",
            Icon: SiGraphql,
        },
        {
            text: "AWS",
            Icon: Cloud,
        },
        {
            text: "Redis",
            Icon: SiRedis,
        },
        {
            text: "Docker",
            Icon: SiDocker,
        },
        {
            text: "MySQL",
            Icon: SiMysql,
        },
        {
            text: "Material UI",
            Icon: SiMui,
        },
        {
            text: "Cassandra",
            Icon: SiApachecassandra,
        },
        {
            text: "Expo",
            Icon: SiExpo,
        },
        {
            text: "Vite",
            Icon: SiVite,
        },
        {
            text: "JavaScript",
            Icon: SiJavascript,
        },
        {
            text: "HTML5",
            Icon: SiHtml5,
        },
        {
            text: "CSS3",
            Icon: SiCss,
        }
    ];

    return(
        <div id="skills-section" className="max-w-3xl mx-auto px-4">
            <Title text={'Skills '} className="flex flex-col items-center justify-center -rotate-6"/>

            <HoverEffect items={skills}/>
        </div>
    )
}