'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Code2, Terminal, Zap, Layers, Globe, Cpu, Database, Shield } from 'lucide-react';
import Link from 'next/link';

// Crazy floating code elements
const CrazyCodeElements = () => {
  const [elements, setElements] = useState<Array<{id: number, content: string, x: number, y: number, delay: number, size: string, color: string}>>([]);

  useEffect(() => {
    const crazyElements = [
      // Left side elements with more variety
      { content: 'const dev = () => { return "awesome"; };', delay: 0, size: 'text-xs', color: 'text-green-400/40' },
      { content: 'if (coffee) { code(); }', delay: 0.5, size: 'text-sm', color: 'text-blue-400/40' },
      { content: 'while (alive) { code(); }', delay: 1, size: 'text-xs', color: 'text-purple-400/40' },
      { content: 'function hack() { return true; }', delay: 1.5, size: 'text-sm', color: 'text-red-400/40' },
      { content: 'const matrix = [[0,1],[1,0]]', delay: 2, size: 'text-xs', color: 'text-yellow-400/40' },
      { content: 'import { everything } from "universe"', delay: 2.5, size: 'text-xs', color: 'text-cyan-400/40' },
      { content: 'class Developer extends Human { }', delay: 3, size: 'text-sm', color: 'text-pink-400/40' },
      { content: 'const api = fetch("/everything")', delay: 3.5, size: 'text-xs', color: 'text-orange-400/40' },
      { content: 'docker run --rm universe', delay: 4, size: 'text-xs', color: 'text-indigo-400/40' },
      { content: 'git commit -m "fixed everything"', delay: 4.5, size: 'text-sm', color: 'text-teal-400/40' },
      { content: 'const server = deploy();', delay: 5, size: 'text-xs', color: 'text-green-400/40' },
      { content: 'const cache = clear();', delay: 5.5, size: 'text-sm', color: 'text-blue-400/40' },
      { content: 'const build = compile();', delay: 6, size: 'text-xs', color: 'text-purple-400/40' },
      { content: 'const test = unit();', delay: 6.5, size: 'text-sm', color: 'text-red-400/40' },
      { content: 'const deploy = production();', delay: 7, size: 'text-xs', color: 'text-yellow-400/40' },
      
      // Right side elements with more variety
      { content: 'npm install universe', delay: 7.5, size: 'text-xs', color: 'text-cyan-400/40' },
      { content: 'const quantum = superposition()', delay: 8, size: 'text-sm', color: 'text-pink-400/40' },
      { content: 'while (!success) { try(); }', delay: 8.5, size: 'text-xs', color: 'text-orange-400/40' },
      { content: 'const brain = neuralNetwork()', delay: 9, size: 'text-sm', color: 'text-indigo-400/40' },
      { content: 'const data = await fetch("infinity")', delay: 9.5, size: 'text-xs', color: 'text-teal-400/40' },
      { content: 'class AI extends Consciousness { }', delay: 10, size: 'text-sm', color: 'text-green-400/40' },
      { content: 'const future = predict()', delay: 10.5, size: 'text-xs', color: 'text-blue-400/40' },
      { content: 'const code = { clean: true }', delay: 11, size: 'text-sm', color: 'text-purple-400/40' },
      { content: 'const bug = feature();', delay: 11.5, size: 'text-xs', color: 'text-red-400/40' },
      { content: 'const deploy = now();', delay: 12, size: 'text-sm', color: 'text-yellow-400/40' },
      { content: 'const fix = hotfix();', delay: 12.5, size: 'text-xs', color: 'text-cyan-400/40' },
      { content: 'const merge = rebase();', delay: 13, size: 'text-sm', color: 'text-pink-400/40' },
      { content: 'const release = v1.0();', delay: 13.5, size: 'text-xs', color: 'text-orange-400/40' },
      { content: 'const production = live();', delay: 14, size: 'text-sm', color: 'text-indigo-400/40' },
      { content: 'const monitor = metrics();', delay: 14.5, size: 'text-xs', color: 'text-teal-400/40' },
    ];

    const positionedElements = crazyElements.map((el, index) => ({
      id: index,
      content: el.content,
      x: Math.random() * 15, // Left side (0-15%)
      y: Math.random() * 80 + 10, // Random vertical position
      delay: el.delay,
      size: el.size,
      color: el.color
    }));

    // Add right side elements
    const rightSideElements = crazyElements.map((el, index) => ({
      id: index + 100,
      content: el.content,
      x: 75 + Math.random() * 20, // Right side (75-95%)
      y: Math.random() * 80 + 10,
      delay: el.delay + 15,
      size: el.size,
      color: el.color
    }));

    setElements([...positionedElements, ...rightSideElements]);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute font-mono ${element.size} ${element.color} animate-pulse whitespace-nowrap`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
};

export default function CVPage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/saptashCV.pdf';
    link.download = 'saptashCV.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-16 w-36 h-36 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
        
        {/* Floating tech icons */}
        <div className="absolute top-1/3 left-1/4 text-green-400/30 animate-bounce" style={{ animationDelay: '8s' }}><Cpu className="w-8 h-8" /></div>
        <div className="absolute top-1/2 right-1/4 text-blue-400/30 animate-bounce" style={{ animationDelay: '10s' }}><Database className="w-8 h-8" /></div>
        <div className="absolute bottom-1/3 left-1/3 text-purple-400/30 animate-bounce" style={{ animationDelay: '12s' }}><Shield className="w-8 h-8" /></div>
        <div className="absolute bottom-1/4 right-1/3 text-pink-400/30 animate-bounce" style={{ animationDelay: '14s' }}><Globe className="w-8 h-8" /></div>
      </div>
      
      <CrazyCodeElements />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Enhanced Header with glassmorphism */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20">
              <Code2 className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">
                Curriculum Vitae
              </h1>
              <p className="text-gray-300 text-xl font-medium">Download My Professional CV</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Ready for Download</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mb-10">
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-10 py-5 text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/30"
            >
              <Download className="w-6 h-6 mr-3" />
              Download CV PDF
            </Button>
            
            <Link
              href="/"
              className="inline-flex items-center px-10 py-5 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 rounded-2xl text-white font-medium shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/30"
            >
              <ArrowLeft className="w-6 h-6 mr-3" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Enhanced CV Preview Container with glassmorphism */}
        <div className="flex justify-center items-center mb-12">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-8xl w-full border-2 border-white/20">
            <div className="bg-gradient-to-br from-gray-50/50 to-white/90 rounded-2xl p-6 border border-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-sm font-medium text-gray-600">Live CV Preview</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-2"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                    <span className="text-xs text-white font-bold">PDF</span>
                  </div>
                </div>
              </div>
              
              <iframe
                src="/saptashCV.pdf"
                className="w-full h-[85vh] border-0 rounded-xl shadow-inner"
                title="CV Preview"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Download Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 px-10 py-6 bg-gradient-to-r from-slate-800/80 via-purple-800/80 to-slate-700/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-200">Quick Download</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full">
                <span className="text-sm text-white font-bold">Instant</span>
              </div>
            </div>
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Get CV Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
