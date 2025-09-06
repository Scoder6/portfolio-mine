import React from 'react';
import Link from "next/link";
import { Button as MovingBorderBtn} from "@/components/ui/moving-border";
import Title from "@/app/home/components/Title";

export default function HeroSection() {

    return(
        <div className="min-h-[60vh] flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row items-center justify-between">
            <div className="space-y-10 text-center lg:text-left">
                <h1 className="text-4xl lg:text-7xl font-bold">
                    Nice to meet you! 👋🏻
                    <br /> {" "} <span className="underline underline-offset-8 decoration-green-500">{"I'm Saptash Chaubey."}</span>
                </h1>

                <p className="md:w-96 text-lg text-gray-300">
                    {
                        "Software Engineer crafting high-performance systems and scalable architectures that solve complex problems at scale."
                    }
                </p>

                <Link href={"mailto:matulchaubey669@gmail.com"} className="inline-block group">
                 <Title className="mb-10" text={'Contact Me 📬'}/>
                </Link>
            </div>
            
            <div className="relative">
                {/* Grid background only on the right side */}
                <div className="absolute inset-0 -z-10 bg-black bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>
                
                <div className="w-72 h-72 space-y-34 -rotate-[30deg]">
                    <div className="flex gap-3 translate-x-8">
                        <div className="w-32 h-32 rounded-2xl bg-green-500"></div>
                        <div className="w-32 h-32 rounded-full bg-indigo-500"></div>
                    </div>

                    <div className="flex gap-3 -translate-x-8 mt-3">
                        <div className="w-32 h-32 rounded-2xl bg-indigo-500 gap"></div>
                        <div className="w-32 h-32 rounded-full bg-green-500"></div>
                    </div>

                    <div className="glow absolute top-[40%] right-1/2 -z-10"></div>
                </div>

                <div className="absolute bottom-5 sm:bottom-14 left-0 sm:-left-10">
                    <MovingBorderBtn borderRadius="0.5rem" className="p-3 font-semibold">
                        <p>📢 Available For Work</p>
                    </MovingBorderBtn>
                </div>
            </div>
        </div>
    )
}