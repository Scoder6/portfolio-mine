"use client";

import React from 'react'
import Navbar from './home/components/Navbar'
import HeroSection from "@/app/home/components/HeroSection";
import Skills from "@/app/home/components/Skills";
import WorkExperience from "@/app/home/components/WorkExperience";
import SmallProjects from "@/app/home/components/SmallProjects";
import ScaleProjects from "@/app/home/components/ScaleProjects";
import Hobbies from "@/app/home/components/Hobbies";
import FunZone from "@/app/home/components/FunZone";
import Footer from "@/app/home/components/footer";
import WelcomeModal from "@/app/home/components/WelcomeModal";

export default function Page() {
    return(
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <WelcomeModal />
            <div className="bg-background dark:bg-grid-white/[0.05] bg-grid-slate-200/[0.5] dark:bg-grid-white/[0.05]">
                <div className="max-w-7xl mx-auto p-5">
                    <Navbar/>
                    <HeroSection/>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-5">
                <Skills/>
                <WorkExperience/>
                <SmallProjects/>
                <ScaleProjects/>
                <Hobbies/>
                <FunZone/>
            </div>
            
            <div>
                <Footer/>
            </div>
        </div>
    )
}