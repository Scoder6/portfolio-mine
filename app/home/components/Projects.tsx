import React from 'react'
import {
    SiAngular,
    SiApachecassandra,
    SiCss3,
    SiHtml5,
    SiIonic, SiJavascript, SiNextdotjs, SiReact,
    SiSpringboot, SiTailwindcss,
    SiTypescript
} from "react-icons/si";
import Title from "@/app/home/components/Title";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {DirectionAwareHover} from "@/components/ui/direction-aware-hover";

export default function Projects(){

    const projects = [
        {
            title: 'Cabs24',
            tech: [SiAngular, SiIonic, SiApachecassandra, SiSpringboot, SiTypescript],
            link: "",
            cover: "/cabs24.png",
            background: "bg-indigo-500",
        }, {
            title: 'Andaman Attols',
            tech: [SiHtml5, SiCss3, SiJavascript],
            link: "https://scoder6.github.io/Andaman-Attols/",
            cover: "/andaman-attols.png",
            background: "bg-green-500",
        }, {
            title: 'Futurewise-frontend',
            tech: [SiNextdotjs, SiHtml5, SiReact, SiCss3, SiTypescript, SiTailwindcss],
            link: "",
            cover: "/futurewise-frontend.png",
            background: "bg-cyan-400",
        }, {
            title: 'Tic-tac-toe',
            tech: [SiHtml5, SiCss3, SiJavascript],
            link: "https://github.com/Scoder6/Tic-Tac-Toe_Game",
            cover: "/tic-tac-toe.png",
            background: "bg-pink-500",
        },
    ]

    return (

        <div className="py-10 p-5 sm:p-0">
            <Title text={'Projects 💼'} className="flex flex-col items-center justify-center -rotate-6"/>

            <div className="grid grid-cols-1 sm:grid-cols-2 pt-20 gap-5">
                {projects.map((project, index) =>{
                    return (<Link href={project.link} key={index}>
                        <div className={cn("p-5 rounded-md", project.background)}>
                            <DirectionAwareHover
                            imageUrl={project.cover}
                            className="w-full space-y-5 cursor-pointer"
                            >
                                <div className="space-y-5">

                                <h1 className="text-2xl font-bold">{project.title}</h1>

                                <div>
                                    {project.tech.map((Icon, index)=> {
                                        return <Icon  className="w-8 h-8" key={index}/>;
                                    })}
                                </div>
                                </div>
                            </DirectionAwareHover>
                        </div>
                    </Link>
                );

            })}

        </div>
    </div>
    );
}