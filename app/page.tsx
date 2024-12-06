import React from 'react'
import Navbar from './home/components/Navbar'
import HeroSection from "@/app/home/components/HeroSection";
import Skills from "@/app/home/components/Skills";
import Projects from "@/app/home/components/Projects";
import Footer from "@/app/home/components/footer";

export default function Page() {
    return(

        <div className="min-h-screen bg-black overflow-hidden text-white">

            <div className="dark:bg-white bg-black dark:bg-grid-black/[0.2] bg-grid-white/[0.05]">
                <div className="max-w-7xl mx-auto p-5  ">
                    <Navbar/>
                    <HeroSection/>
                </div>

                <div className=" h-10 xl:h-32 bg-gradient-to-t from-black absolute -bottom-5 left-0 xl:bottom-0 w-full">

                </div>

            </div>

            <div className=" max-w-7xl mx-auto p-5  ">
                <Skills/>

                <Projects/>

                <Footer/>

            </div>

            <div>

            </div>


        </div>
    )
}