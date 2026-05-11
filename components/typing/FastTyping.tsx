"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Keyboard } from 'lucide-react';

const FastTyping = () => {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog and runs through the forest with incredible speed and precision that would make even the fastest typists jealous of their supernatural abilities.",
    "In the depths of cyberspace where algorithms dance and data flows like rivers of light, programmers type with such velocity that their keyboards seem to catch fire from the sheer friction of their impossible fingers moving faster than human thought itself can process.",
    "When the universe throws challenges at your feet and the world demands solutions that don't exist in any textbook, you sit down at your keyboard and create reality from nothing but ones and zeros, typing at speeds that make time itself seem to slow down and wait for your genius to catch up.",
    "In the dead of night when normal humans sleep, developers are awake battling bugs that hide in shadows of code, their fingers flying across keyboards like possessed wizards casting spells that bring applications to life from the void of empty screens.",
    "The matrix doesn't control you, you control the matrix. With every keystroke, you're not just typing code, you're bending reality itself to your will, creating digital worlds where your imagination becomes the only limitation.",
    "Quantum computing represents the next frontier in computational power, promising to revolutionize everything from cryptography to drug discovery through the manipulation of quantum states that exist in superposition.",
    "Neural networks trained on massive datasets using backpropagation algorithms combined with attention mechanisms and transformer architectures have fundamentally changed natural language processing.",
    "Distributed systems engineering requires understanding of CAP theorem, consensus algorithms like Raft and Paxos, eventual consistency models, and the challenges of maintaining data integrity.",
    "The intersection of artificial intelligence and quantum computing creates unprecedented opportunities for solving complex optimization problems that were previously considered computationally intractable.",
    "Machine learning models trained on billions of parameters can generate human-like text, create stunning artwork, and even compose music that rivals human composers in emotional depth and complexity."
  ];

  const currentText = sampleTexts[currentTextIndex];
  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  const correctWords = typedText.trim().split(' ').filter(word => word.length > 0).length;

  useEffect(() => {
    // Select random text on mount
    setCurrentTextIndex(Math.floor(Math.random() * sampleTexts.length));
  }, []);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTypedText(value);
    
    if (value.length <= currentText.length) {
      let correct = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === currentText[i]) {
          correct++;
        }
      }
      setCorrectChars(correct);
      setTotalChars(value.length);
    }

    // When text is completed, move to next random text
    if (value === currentText) {
      setTimeout(() => {
        const newIndex = Math.floor(Math.random() * sampleTexts.length);
        setCurrentTextIndex(newIndex);
        setTypedText('');
        setCorrectChars(0);
        setTotalChars(0);
      }, 1000);
    }
  };

  const getCharacterColor = (index: number) => {
    if (index >= typedText.length) return 'text-gray-500';
    return typedText[index] === currentText[index] ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Simple Header */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-white mb-2">
              INSANE TYPING
            </h2>
            <p className="text-gray-400">Type like your keyboard is on fire!</p>
          </div>
        </div>

        {/* Simple Stats */}
        <div className="flex gap-8 text-center mb-6">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-3xl font-bold text-blue-400">{correctWords}</div>
            <div className="text-sm text-gray-400">Words</div>
          </div>
        </div>
      </motion.div>

      {/* Main Typing Area */}
      <div className="w-full max-w-4xl bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
        {/* Text Display */}
        <div className="mb-6">
          <div className="bg-gray-800 rounded-xl p-6 font-mono text-lg leading-relaxed">
            {currentText.split('').map((char, index) => (
              <span
                key={index}
                className={`transition-all duration-100 ${getCharacterColor(index)}`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Typing Input */}
        <div className="mt-6">
          <input
            ref={inputRef}
            type="text"
            value={typedText}
            onChange={handleInputChange}
            placeholder="Start typing here..."
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none font-mono text-lg"
            autoFocus
          />
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center max-w-2xl"
      >
        <p className="text-gray-400 text-sm">
          <span className="text-orange-400 font-medium">Pro Tip:</span> Type so fast that your keyboard starts smoking! 
          Just start typing and watch the characters turn green for correct and red for incorrect. 
          When you complete a text, a new random text will appear automatically!
        </p>
      </motion.div>
    </div>
  );
};

export default FastTyping;
