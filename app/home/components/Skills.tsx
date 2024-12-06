"use client"
import React from 'react';
import Title from "@/app/home/components/Title";
import {HoverEffect} from "@/components/ui/card-hover-effect";
import {
    SiAngular,
    SiApifox,
    SiExpress, SiGit, SiIonic,
    SiNextdotjs,
    SiReact,
    SiRedux, SiSpringboot,
    SiTailwindcss,
    SiTypescript
} from "react-icons/si";

export default function Skills() {

    const skills = [
        {
            text: "React",
            Icon: SiReact,
        },{
            text: "Next.js",
            Icon: SiNextdotjs,
        },{
            text: "Angular",
            Icon: SiAngular,
        },{
            text: "Redux",
            Icon: SiRedux,
        },{
            text: "TypeScript",
            Icon: SiTypescript,
        },{
            text: "Tailwind CSS",
            Icon: SiTailwindcss,
        },{
            text: "Express.js",
            Icon: SiExpress,
        },{
            text: "SpringBoot",
            Icon: SiSpringboot,
        },{
            text: "Ionic",
            Icon: SiIonic,
        },{
            text: "Git",
            Icon: SiGit,
        }
    ]

    return(
        <div className="max-w-5xl mx-auto px-8">
            <Title text={'Skills 🎯'} className="flex flex-col items-center justify-center -rotate-6"/>

            <HoverEffect items={skills}/>
        </div>
    )
}