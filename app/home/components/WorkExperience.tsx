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
      role: "Software Engineer",
      company: "Erpixo",
      duration: "May 2025 - Sep 2025",
      description: [
        "Worked on responsive frontend development using Next.js, ensuring optimized layouts and seamless UX across devices",
        "Developed reusable and production-level UI components to improve maintainability, scalability, and development efficiency",
        "Contributed to structured frontend architecture and clean code practices for scalable production-ready applications",
        "Optimized API integration flows by implementing efficient single-call data fetching, reducing unnecessary network requests",
        "Assisted in frontend feature implementation using TypeScript, JavaScript, and modern React-based development practices",
        "Contributed to backend-related tasks and API handling using Node.js, Express.js, and GraphQL",
        "Worked with Expo React Native for cross-platform mobile application development and feature integration",
        "Collaborated in mid-development production environments, contributing to debugging, UI improvements, and performance optimization"
      ],
      skills: ["Next.js", "React", "TypeScript", "JavaScript", "React Native", "Expo", "GraphQL", "Node.js", "Express.js", "Shadcn", "Vite", "Apollo GraphQL", "HTML", "CSS"],
      metrics: [
        { value: "Production", description: "Production-level code delivery" },
        { value: "Cross-platform", description: "Web & mobile development" },
        { value: "Optimized", description: "API performance improved" },
        { value: "Scalable", description: "Component architecture" }
      ]
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Spiraldevs Automation Industries Pvt. Ltd.",
      duration: "Feb 2025 - Apr 2025",
      description: [
        "Developed mobile application features using Expo React Native and TypeScript with focus on responsive UI and smooth UX",
        "Built backend services and REST APIs using Node.js and Express for authentication, user management, and booking workflows",
        "Implemented secure JWT-based authentication along with OTP-based signup and login flows using SMTP domain email integration",
        "Integrated Firebase services for real-time broadcasting, chat functionalities, and synchronized messaging workflows",
        "Developed teacher booking and scheduling system workflows with Razorpay test payment gateway integration",
        "Worked with AstraDB and Redis (Docker-based local setup) for efficient data management, caching, and performance optimization",
        "Utilized AWS EC2 for deployment, AWS S3 Bucket for media/file storage, and Cloudinary for optimized media handling",
        "Contributed to Docker containerization and CI/CD pipeline setup to streamline deployment and development workflows"
      ],
      skills: ["React Native", "Expo", "TypeScript", "Node.js", "Express.js", "AWS", "AWS EC2", "AWS S3", "AstraDB", "Redis", "Docker", "Firebase", "JWT", "Razorpay", "Cloudinary"],
      metrics: [
        { value: "Full Stack", description: "End-to-end feature delivery" },
        { value: "AWS Cloud", description: "Cloud deployment expertise" },
        { value: "Real-time", description: "Firebase live features" },
        { value: "Secure", description: "JWT & OTP auth systems" }
      ]
    },
    {
      id: 3,
      role: "Associate Web Developer",
      company: "Futurewise IT Solutions",
      duration: "Aug 2024 - Oct 2024",
      description: [
        "Developed and optimized responsive user interfaces using Next.js with focus on performance, scalability, and cross-device compatibility",
        "Worked on frontend component development and UI enhancements using ShadCN UI, Material UI, DaisyUI, and modern styling practices",
        "Contributed to improving application responsiveness and user experience across desktop and mobile platforms",
        "Assisted in backend feature development and API-related tasks using Go (Golang) and MySQL for efficient data handling",
        "Participated in clone-based application development to understand production-level architecture and reusable components",
        "Collaborated on frontend-backend integration, database operations, debugging, and feature implementation",
        "Gained hands-on experience working with scalable web technologies, reusable UI systems, and backend service logic"
      ],
      skills: ["Next.js", "React", "TypeScript", "Go", "MySQL", "ShadCN", "Material UI", "DaisyUI", "Tailwind CSS", "Responsive Web Design"],
      metrics: [
        { value: "Responsive", description: "Cross-device compatibility" },
        { value: "Modern UI", description: "Multiple UI frameworks" },
        { value: "Full Stack", description: "Frontend + Go backend" },
        { value: "Scalable", description: "Production architecture" }
      ]
    },
    {
      id: 4,
      role: "Full Stack Developer",
      company: "Spiraldevs Automation Industries Pvt. Ltd.",
      duration: "May 2024 - Jun 2024",
      description: [
        "Developed and contributed to CabApp, a rider-driver connectivity platform as a Full Stack Developer Intern",
        "Integrated real-time geolocation and tracking features using Google Maps APIs for accurate rider and driver location handling",
        "Built profile management and data handling workflows for both riders and drivers, including Driver License (DL) processing",
        "Implemented low-latency driver call/request flows with instant accept and reject actions for improved ride response efficiency",
        "Designed and developed billing and invoice UI modules with accurate booking data fetching and downloadable invoice generation",
        "Developed active/inactive suggestion handling and status-based user interactions to enhance application usability",
        "Worked across frontend and backend technologies using Kotlin, Java, Angular, Global CSS, and standard stylesheets",
        "Utilized Cassandra for scalable database management and efficient data storage operations"
      ],
      skills: ["Kotlin", "Java", "Spring Boot", "Angular", "Angular CLI", "Cassandra", "Google Maps API", "WebSocket", "API Development", "CSS"],
      metrics: [
        { value: "Real-time", description: "Live geolocation tracking" },
        { value: "Billing", description: "Invoice generation system" },
        { value: "Mobile", description: "Kotlin + Java development" },
        { value: "Scalable DB", description: "Cassandra implementation" }
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gradient-to-b from-background">
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
                        : 'bg-muted'
                    }`}>
                      {index === activeIndex && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setActiveIndex(index)}
                      className={`text-left w-full p-5 rounded-xl transition-all duration-300 border ${
                        index === activeIndex
                          ? 'bg-card border-blue-500/30 shadow-lg shadow-blue-500/10'
                          : 'bg-secondary border-border hover:bg-card'
                      }`}
                    >
                      <p className="text-sm text-blue-400 font-medium">{exp.duration}</p>
                      <h3 className="font-bold text-foreground mt-1">{exp.role}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{exp.company}</p>
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
                className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-xl h-full relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500 dark:bg-blue-900 rounded-full filter blur-3xl opacity-10"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-500 dark:bg-purple-900 rounded-full filter blur-3xl opacity-10"></div>
                
                <div className="relative">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {experiences[activeIndex].role}
                      </h3>
                      <p className="text-lg text-blue-400 mt-1">
                        {experiences[activeIndex].company}
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {experiences[activeIndex].duration}
                      </p>
                    </div>
                    <div className="text-5xl opacity-10 font-bold text-foreground">
                      0{activeIndex + 1}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
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
                          <span className="text-muted-foreground">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Impact Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {experiences[activeIndex].metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          className="bg-secondary rounded-xl p-4 border border-border"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeIndex].skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-secondary-foreground border border-border"
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