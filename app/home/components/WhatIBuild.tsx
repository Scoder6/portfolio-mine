"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Building2, Code2, Rocket, Users, Zap } from "lucide-react";

interface BuildItem {
  id: number;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  status: "Live" | "In Development" | "Client Project" | "Closed";
  icon: React.ElementType;
  color: string;
}

const WhatIBuild = () => {
  const builds: BuildItem[] = [
    {
      id: 1,
      title: "SAM Model",
      category: "AI / Machine Learning",
      description:
        "Built and heavily optimized a SAM (Segment Anything Model) for computer vision tasks. Achieved significant performance improvements through custom optimizations.",
      highlights: [
        "Custom optimization algorithms",
        "Improved inference speed",
        "Reduced memory footprint",
        "Production-ready architecture",
      ],
      status: "In Development",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "PaintBharat",
      category: "Business Platform",
      description:
        "Built a comprehensive business platform serving the Indian market. End-to-end solution with modern tech stack and scalable architecture.",
      highlights: [
        "Full-stack platform development",
        "Scalable architecture",
        "Business process automation",
        "Market-specific optimizations",
      ],
      status: "Live",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "FataCode",
      category: "Software Services",
      description:
        "Software services venture delivering custom solutions to clients. Successfully closed multiple client projects with focus on quality and timely delivery.",
      highlights: [
        "Multiple closed client projects",
        "Custom software solutions",
        "End-to-end service delivery",
        "Client satisfaction focused",
      ],
      status: "Closed",
      icon: Code2,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Development":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Client Project":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <section id="builds" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>
      </div>

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
            BEYOND PROJECTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5">
            What I{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Build
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond internship projects, I have built businesses, optimized AI
            models, and delivered client solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {builds.map((build, index) => {
            const Icon = build.icon;
            return (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${build.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                ></div>

                <div className="relative bg-card border border-border rounded-2xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        build.status
                      )}`}
                    >
                      {build.status}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${build.color} p-3 mb-5`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground font-medium mb-2">
                    {build.category}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {build.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                    {build.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Key Highlights
                    </p>
                    <ul className="space-y-2">
                      {build.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <Zap className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom decoration */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      <span>
                        {build.status === "Closed"
                          ? "Multiple clients served"
                          : build.status === "Live"
                          ? "Active users"
                          : "Optimization focused"}
                      </span>
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

export default WhatIBuild;
