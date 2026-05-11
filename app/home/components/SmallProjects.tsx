"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

interface SmallProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
}

const SmallProjects = () => {
  const projects: SmallProject[] = [
    {
      id: 1,
      title: "CodeSync",
      description: "Production-grade real-time collaborative code editor with live cursor tracking, multi-language support, and WebSocket-powered synchronization. Built for remote pair programming with enterprise-level rate limiting, JWT auth, and MongoDB persistence.",
      tags: ["Socket.IO", "MongoDB", "Express", "React", "JWT", "Rate Limiting"],
      demoUrl: "#",
      codeUrl: "https://github.com/Scoder6/codesync",
    },
    {
      id: 2,
      title: "TaskFlow AI",
      description: "Intelligent project management platform with OpenAI-powered task prioritization, real-time notifications, automated email reminders, and productivity analytics. Features PostgreSQL + Redis dual-database architecture with cron-scheduled AI insights.",
      tags: ["OpenAI GPT", "PostgreSQL", "Redis", "Node.js", "Next.js", "Socket.IO"],
      demoUrl: "#",
      codeUrl: "https://github.com/Scoder6/taskflow",
    },
    {
      id: 7,
      title: "Tic Tac Toe",
      description: "Classic game with AI opponent and multiplayer support",
      tags: ["React", "Game Logic", "AI"],
      demoUrl: "https://scoder6.github.io/Tic-Tac-Toe_Game/",
      codeUrl: "https://github.com/Scoder6/Tic-Tac-Toe_Game",
    },
    {
      id: 8,
      title: "Andaman Atolls",
      description: "Travel guide website for Andaman Islands tourism",
      tags: ["Next.js", "Tailwind", "Travel"],
      demoUrl: "https://attols-voyage-hub.vercel.app/",
      codeUrl: "https://github.com/Scoder6",
    },
    {
      id: 9,
      title: "StratifyAI",
      description: "AI marketing team platform with revenue analytics dashboard",
      tags: ["Next.js", "AI", "Dashboard"],
      demoUrl: "https://stratifyai-prod.vercel.app/",
      codeUrl: "https://github.com/Scoder6",
    },
    {
      id: 10,
      title: "Champion of Andaman",
      description: "Sports championship platform for Andaman tournaments",
      tags: ["Next.js", "Sports", "Events"],
      demoUrl: "https://championofandaman.com/",
      codeUrl: "https://github.com/Scoder6",
    },
    {
      id: 11,
      title: "Finance Dashboard",
      description: "Personal finance tracking with expense analytics",
      tags: ["Next.js", "Finance", "Charts"],
      demoUrl: "https://finance-rho-wheat.vercel.app/",
      codeUrl: "https://github.com/Scoder6",
    },
    {
      id: 12,
      title: "Artistly",
      description: "Digital art portfolio and creator marketplace",
      tags: ["Next.js", "Art", "Marketplace"],
      demoUrl: "https://artistly-kappa.vercel.app/",
      codeUrl: "https://github.com/Scoder6/Artistly",
    },
    {
      id: 13,
      title: "Event Calendar",
      description: "Dynamic event management with drag-and-drop scheduling",
      tags: ["Next.js", "Calendar", "Drag-Drop"],
      demoUrl: "https://dynamic-event-calendar-nine.vercel.app/",
      codeUrl: "https://github.com/Scoder6",
    },
    {
      id: 14,
      title: "JEE Practice App",
      description: "Exam preparation platform with practice tests and analytics",
      tags: ["Next.js", "Education", "Quiz"],
      demoUrl: "https://jee-practice-app-eight.vercel.app/",
      codeUrl: "https://github.com/Scoder6/JEE-practice",
    },
    {
      id: 15,
      title: "Noted",
      description: "Minimalist notes app with markdown support and cloud sync",
      tags: ["Next.js", "Notes", "Markdown"],
      demoUrl: "https://noted-notes.vercel.app/",
      codeUrl: "https://github.com/Scoder6/Noted-Notes",
    },
    {
      id: 16,
      title: "Publisher Hub",
      description: "Content management system for publishers and authors",
      tags: ["Next.js", "CMS", "Editor"],
      demoUrl: "https://v0-publisher-hub-frontend-ui.vercel.app/",
      codeUrl: "https://github.com/Scoder6",
    },
    {
      id: 17,
      title: "Canvas Edit",
      description: "Browser-based image editor with filters and tools",
      tags: ["Next.js", "Canvas", "Image Editor"],
      demoUrl: "https://canvas-edit-beta.vercel.app/",
      codeUrl: "https://github.com/Scoder6/canvas_eDIT",
    },
    {
      id: 18,
      title: "Bharat Hyper Mart",
      description: "E-commerce platform for local Indian marketplace",
      tags: ["Next.js", "E-commerce", "Shopping"],
      demoUrl: "https://bharat-hyper-mart.vercel.app/",
      codeUrl: "https://github.com/Scoder6",
    },
    {
      id: 19,
      title: "Car Dealership Software",
      description: "Complete dealership management with inventory and dashboard",
      tags: ["Next.js", "Automotive", "Dashboard"],
      demoUrl: "https://v0-car-dealership-software-blue.vercel.app/dashboard",
      codeUrl: "https://github.com/Scoder6",
    },
  ];

  return (
    <section id="small-projects" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center rounded-full bg-secondary px-4 py-1 text-sm font-medium text-primary mb-4">
            <ExternalLink className="w-4 h-4 mr-2" />
            QUICK BUILDS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5">
            Small{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Weekend hacks, experiments, and learning projects. Small scope, big learnings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                {project.demoUrl && project.demoUrl !== "#" ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-44 overflow-hidden border-b border-border group/card relative bg-secondary"
                  >
                    <img
                      src={`https://api.microlink.io/?url=${encodeURIComponent(project.demoUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover object-top group-hover/card:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.classList.add('fallback-active');
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground shadow-lg">
                        <ExternalLink className="w-3 h-3" />
                        Visit Live Site
                      </span>
                    </div>
                  </a>
                ) : (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-44 overflow-hidden border-b border-border group/card relative"
                    style={{
                      background: `linear-gradient(135deg, ${['#10b981', '#3b82f6', '#8b5cf6'][project.id % 3]}20, ${['#3b82f6', '#8b5cf6', '#10b981'][project.id % 3]}30)`
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Code className="w-10 h-10 text-foreground/40 mb-2" />
                      <span className="text-sm font-medium text-foreground/60">View on Code</span>
                    </div>
                  </a>
                )}
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View Code"
                      >
                        <Code className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallProjects;
