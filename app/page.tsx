// Updated page.tsx
import React from 'react'
import Navbar from './home/components/Navbar'
import HeroSection from "@/app/home/components/HeroSection";
import Skills from "@/app/home/components/Skills";
import Projects from "@/app/home/components/Projects";
import WorkExperience from "@/app/home/components/WorkExperience";
import Footer from "@/app/home/components/footer";

export default function Page() {
    return(
        <div className="min-h-screen bg-black overflow-hidden text-white">
            <div className="dark:bg-black bg-black dark:bg-grid-white/[0.05] bg-grid-white/[0.05]">
                <div className="max-w-7xl mx-auto p-5  ">
                    <Navbar/>
                    <HeroSection/>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-5">
                <Skills/>
                <WorkExperience/>
                <Projects/>
            </div>
            
            <div>
                <Footer/>
            </div>
        </div>
    )
}