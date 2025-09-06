// app/home/components/WorkExperience.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
  metrics: { value: string; description: string }[];
}

const WorkExperience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: "Full Stack App Developer Intern",
      company: "Spiraldevs Automation Industries Pvt Ltd",
      duration: "May 2024 - July 2024",
      description: [
        "Enhanced driver and rider profile pages using Ionic, Angular, TypeScript, CSS, and Tailwind",
        "Incorporated Google APIs for real-time geolocation tracking",
        "Created a feature to generate and download detailed ride receipts using Spring Boot and Java",
        "Optimized backend data handling using Apache Cassandra"
      ],
      skills: ["Java", "Kotlin", "Ionic", "Angular", "Spring Boot", "Apache Cassandra", "Google APIs"],
      metrics: [
        { value: "30%", description: "UI/UX improvement" },
        { value: "95%", description: "Location accuracy enhancement" },
        { value: "40%", description: "Reduction in billing discrepancies" },
        { value: "25%", description: "Database query efficiency increase" }
      ]
    },
    {
      id: 2,
      role: "Full Stack Developer Intern",
      company: "Futurewise IT Solutions",
      duration: "Aug 2024 - Nov 2024",
      description: [
        "Delivered 3+ responsive websites for foreign clients using HTML, CSS, TypeScript, Next.js, and React",
        "Planned and implemented dynamic UI components with Acertinity UI, Lobehub, and Daisy UI",
        "Expanded and optimized SQL-based backend systems",
        "Collaborated with a team of 3+ developers to meet project deadlines and client expectations"
      ],
      skills: ["Go", "Next.js", "React", "TypeScript", "SQL", "Tailwind CSS"],
      metrics: [
        { value: "90%", description: "Client satisfaction improvement" },
        { value: "20%", description: "Reduction in development time" },
        { value: "30%", description: "Query performance improvement" }
      ]
    },
    // {
    //   id: 3,
    //   role: "Software Engineer Intern",
    //   company: "Erpixo",
    //   duration: "Apr 2025 - Aug 2025",
    //   description: [
    //     "Developed a full-stack website and application similar to Binance using Expo React Native, React with Vite",
    //     "Utilized shadcn, TypeScript, GraphQL, Node.js, and PostgreSQL for development",
    //     "Created MVP with React Native, Node.js, GraphQL, TypeScript, and Tailwind",
    //     "Converted Figma designs to frontend code following Agile development methodologies through Jira"
    //   ],
    //   skills: [ "React Native", "Node.js", "GraphQL", "PostgreSQL", "React", "Expo", "Framer Motion"],
    //   metrics: [
    //     { value: "3+", description: "Full-stack projects delivered" },
    //     { value: "Agile", description: "Development methodology" },
    //     { value: "Figma", description: "Design to code implementation" }
    //   ]
    // }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gradient-to-b from-black ">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#2a2a2a_1px,transparent_0)] bg-[size:40px_40px]"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-900 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-900 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-5">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center rounded-full bg-gray-800 px-4 py-1 text-sm font-medium text-blue-400 mb-4">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            CAREER JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5 text-white">
            Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Experience</span>
          </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Through my internships, I&apos;ve delivered measurable results and gained hands-on experience with modern technologies.
            </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Company selector - Vertical Timeline Style */}
          <div className="lg:w-2/5">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>
              
              <div className="space-y-8 pl-12">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={exp.id}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute -left-12 top-2 w-8 h-8 rounded-full flex items-center justify-center ${
                      index === activeIndex 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' 
                        : 'bg-gray-700'
                    }`}>
                      {index === activeIndex && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setActiveIndex(index)}
                      className={`text-left w-full p-5 rounded-xl transition-all duration-300 border ${
                        index === activeIndex
                          ? 'bg-gray-800 border-blue-500/30 shadow-lg shadow-blue-500/10'
                          : 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                      }`}
                    >
                      <p className="text-sm text-blue-400 font-medium">{exp.duration}</p>
                      <h3 className="font-bold text-white mt-1">{exp.role}</h3>
                      <p className="text-gray-400 text-sm mt-1">{exp.company}</p>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Experience content */}
          <div className="lg:w-3/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 shadow-xl h-full relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-900 rounded-full filter blur-3xl opacity-10"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-900 rounded-full filter blur-3xl opacity-10"></div>
                
                <div className="relative">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {experiences[activeIndex].role}
                      </h3>
                      <p className="text-lg text-blue-400 mt-1">
                        {experiences[activeIndex].company}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        {experiences[activeIndex].duration}
                      </p>
                    </div>
                    <div className="text-5xl opacity-10 font-bold text-white">
                      0{activeIndex + 1}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Key Responsibilities & Achievements
                    </h4>
                    <ul className="space-y-3">
                      {experiences[activeIndex].description.map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-blue-400 mr-3 mt-1 flex-shrink-0 text-lg">●</span>
                          <span className="text-gray-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Impact Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {experiences[activeIndex].metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{metric.description}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeIndex].skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-300 border border-gray-700"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;