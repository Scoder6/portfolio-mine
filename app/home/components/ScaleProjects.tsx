"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, ChevronRight, Database, Users, Globe } from "lucide-react";

interface ScaleProject {
  id: number;
  title: string;
  description: string;
  scale: string;
  metrics: string[];
  icon: React.ElementType;
  color: string;
}

const ScaleProjects = () => {
  const projects: ScaleProject[] = [
    {
      id: 1,
      title: "Teaching Platform",
      description:
        "Scalable education platform serving 1000+ teachers and students with real-time features.",
      scale: "1000+ Users",
      metrics: [
        "Real-time chat & broadcasting",
        "Payment gateway integration",
        "Firebase backend",
        "React Native mobile apps",
      ],
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Cab Booking System",
      description:
        "Full-stack ride-hailing platform with live tracking, billing, and driver management.",
      scale: "Production Ready",
      metrics: [
        "Google Maps API integration",
        "Real-time geolocation",
        "Invoice generation system",
        "Apache Cassandra database",
      ],
      icon: Globe,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "SAM Model Optimization",
      description:
        "Custom optimized computer vision model for production deployment.",
      scale: "AI/ML System",
      metrics: [
        "Inference speed improved",
        "Memory footprint reduced",
        "Production architecture",
        "Custom optimization algorithms",
      ],
      icon: Database,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="scale-projects" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center rounded-full bg-secondary px-4 py-1 text-sm font-medium text-primary mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            PRODUCTION SCALE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5">
            Scale{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Systems designed for real users, real load, real production environments.
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto italic">
            * Some production-scale applications are not publicly listed until marketing begins. 
            There will be a time when users discover these systems — but that time is yet to come.
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  {/* Gradient accent */}
                  <div
                    className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${project.color}`}
                  />

                  <div className="flex flex-col md:flex-row gap-6 md:items-center">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} p-4 flex-shrink-0`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          {project.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white`}
                        >
                          {project.scale}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {project.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScaleProjects;
