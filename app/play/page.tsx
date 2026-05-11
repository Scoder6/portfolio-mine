"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  Zap,
  Brain,
  Keyboard,
  Palette,
  Gamepad2,
  Grid3X3,
  ArrowUp,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Code,
  Target,
} from "lucide-react";

type GameType = "menu" | "memory" | "typing" | "color" | "snake" | "puzzle" | "code";

const GameCard = ({ title, description, icon: Icon, color, onClick, highScore }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative w-full p-6 rounded-3xl bg-gradient-to-br from-card to-card/80 border border-border/60 hover:border-primary/40 transition-all text-left overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10"
  >
    {/* Animated gradient background */}
    <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-all duration-500 group-hover:scale-110`} />
    <div className={`absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr ${color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-all duration-500`} />
    
    <div className="relative z-10">
      {/* Icon with glow */}
      <div className="relative mb-5">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} p-3.5 shadow-lg shadow-black/20 relative z-10`}>
          <Icon className="w-full h-full text-white" />
        </div>
        <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${color} opacity-30 blur-xl group-hover:opacity-50 transition-opacity`} />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
      
      {/* High score or play hint */}
      <div className="flex items-center justify-between">
        {highScore > 0 ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">{highScore.toLocaleString()}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-full">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">New Game</span>
          </div>
        )}
        
        <motion.div 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <ArrowRightIcon className="w-4 h-4 text-primary" />
          </div>
        </motion.div>
      </div>
    </div>
  </motion.button>
);

// CODE CHALLENGE
const CodeChallenge = ({ onBack }: { onBack: () => void }) => {
  const challenges = [
    { question: "What is the time complexity of binary search?", answer: "O(log n)", options: ["O(log n)", "O(n)", "O(n²)", "O(1)"] },
    { question: "Which data structure uses LIFO?", answer: "Stack", options: ["Queue", "Stack", "Array", "Tree"] },
    { question: "What does HTML stand for?", answer: "HyperText Markup Language", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"] },
    { question: "Which method adds an element to the end of an array in JavaScript?", answer: "push()", options: ["push()", "pop()", "shift()", "unshift()"] },
    { question: "What is the result of 2 + '2' in JavaScript?", answer: "'22'", options: ["'22'", "4", "undefined", "TypeError"] },
  ];
  
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("code-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const handleAnswer = () => {
    setShowResult(true);
    if (selectedAnswer === challenges[currentChallenge].answer) {
      setScore(score + 10);
    }
    
    setTimeout(() => {
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(currentChallenge + 1);
        setSelectedAnswer("");
        setShowResult(false);
      } else {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem("code-highscore", score.toString());
        }
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentChallenge(0);
    setScore(0);
    setSelectedAnswer("");
    setShowResult(false);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/30">
            <Code className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-600 opacity-30 blur-xl" />
        </div>
        
        <h2 className="text-4xl font-bold mb-4">
          {score > highScore ? "New High Score!" : "Quiz Complete!"}
        </h2>
        
        <div className="flex flex-col items-center gap-2 mb-8">
          <p className="text-5xl font-bold text-blue-400">{score}/50</p>
          <p className="text-muted-foreground">points</p>
        </div>
        
        {score > highScore && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl"
          >
            <p className="font-semibold text-green-600 dark:text-green-400">
              Previous best: {highScore} points
            </p>
          </motion.div>
        )}
        
        <div className="flex justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetGame} 
            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/30"
          >
            Play Again
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack} 
            className="px-8 py-4 bg-secondary/50 hover:bg-secondary rounded-2xl font-bold text-lg transition-colors"
          >
            Back to Arcade
          </motion.button>
        </div>
      </div>
    );
  }

  const challenge = challenges[currentChallenge];
  const isCorrect = selectedAnswer === challenge.answer;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentChallenge + 1} of {challenges.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-400 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-card/50 border border-border/50 rounded-3xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 p-3.5 shadow-lg shadow-purple-500/20">
            <Code className="w-full h-full text-white" />
          </div>
          <h2 className="text-2xl font-bold">Code Challenge</h2>
        </div>
        
        <p className="text-xl text-foreground mb-8 leading-relaxed">{challenge.question}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenge.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !showResult && setSelectedAnswer(option)}
              disabled={showResult}
              className={`p-4 rounded-xl font-medium transition-all border-2 ${
                showResult
                  ? option === challenge.answer
                    ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                    : option === selectedAnswer
                    ? "bg-red-500/20 border-red-500 text-red-600 dark:text-red-400"
                    : "bg-secondary/50 border-border text-muted-foreground"
                  : selectedAnswer === option
                  ? "bg-blue-500/20 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "bg-secondary/50 border-border hover:border-primary hover:bg-primary/5 text-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === challenge.answer && <Target className="w-5 h-5 text-green-500" />}
              </div>
            </motion.button>
          ))}
        </div>
        
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl border-2 ${
              isCorrect
                ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "✓ Correct! +10 points" : "✗ Incorrect. The correct answer is highlighted."}
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnswer} 
          disabled={!selectedAnswer || showResult}
          className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {showResult ? "Next Question..." : "Submit Answer"}
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack} 
          className="px-8 py-4 bg-secondary/50 hover:bg-secondary rounded-2xl font-bold text-lg transition-colors"
        >
          Back to Arcade
        </motion.button>
      </div>
    </div>
  );
};

// MEMORY MATCH
const MemoryMatch = ({ onBack }: { onBack: () => void }) => {
  const [cards, setCards] = useState<{ emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const emojis = ["🚀", "💎", "🔥", "⚡", "🎯", "🎮", "🎨", "🎵"];

  useEffect(() => {
    const saved = localStorage.getItem("memory-highscore");
    if (saved) setHighScore(parseInt(saved));
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((e) => ({ emoji: e, flipped: false, matched: false }));
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [f, s] = flipped;
      if (cards[f].emoji === cards[s].emoji) {
        setCards((c) => c.map((card, i) => (i === f || i === s ? { ...card, matched: true } : card)));
      } else {
        setTimeout(() => setCards((c) => c.map((card, i) => (i === f || i === s ? { ...card, flipped: false } : card))), 1000);
      }
      setFlipped([]);
      setMoves((m) => m + 1);
    }
  }, [flipped, cards]);

  const flip = (i: number) => {
    if (flipped.length < 2 && !cards[i].flipped && !cards[i].matched) {
      setCards((c) => c.map((card, idx) => (idx === i ? { ...card, flipped: true } : card)));
      setFlipped((f) => [...f, i]);
    }
  };

  const allMatched = cards.length > 0 && cards.every((c) => c.matched);
  const score = Math.max(100 - moves * 2, 10);

  useEffect(() => {
    if (allMatched && score > highScore) {
      setHighScore(score);
      localStorage.setItem("memory-highscore", score.toString());
    }
  }, [allMatched, score, highScore]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
      <div className="flex items-center gap-4">
        <Brain className="w-8 h-8 text-purple-400" />
        <h2 className="text-3xl font-bold">Memory Match</h2>
      </div>
      <div className="flex gap-4 text-sm">
        <span>Moves: {moves}</span>
        {highScore > 0 && <span>Best: {highScore}</span>}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => flip(i)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl font-bold transition-all ${
              card.matched ? "bg-green-500/20 text-green-400 border-2 border-green-500" : card.flipped ? "bg-primary text-white" : "bg-secondary"
            }`}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      {allMatched && <p className="text-2xl font-bold text-green-400">You Won! Score: {score}</p>}
      <div className="flex gap-3">
        <button onClick={initGame} className="px-6 py-3 bg-primary rounded-xl font-bold">{allMatched ? "Play Again" : "Restart"}</button>
        <button onClick={onBack} className="px-6 py-3 bg-secondary rounded-xl font-bold">Back</button>
      </div>
    </div>
  );
};

// TYPING SPEED
const TypingSpeed = ({ onBack }: { onBack: () => void }) => {
  const words = ["rocket", "developer", "keyboard", "speed", "chaos", "portfolio", "engineer", "typescript", "react", "coding", "javascript", "frontend", "backend", "fullstack"];
  const [current, setCurrent] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [state, setState] = useState<"ready" | "playing" | "done">("ready");
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("typing-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (state === "playing" && timeLeft > 0) {
      const t = setInterval(() => setTimeLeft((x) => x - 1), 1000);
      return () => clearInterval(t);
    } else if (timeLeft === 0) {
      setState("done");
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("typing-highscore", score.toString());
      }
    }
  }, [state, timeLeft, score, highScore]);

  const start = () => {
    setState("playing");
    setScore(0);
    setTimeLeft(30);
    setInput("");
    setCurrent(words[Math.floor(Math.random() * words.length)]);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val === current) {
      setScore((s) => s + current.length);
      setInput("");
      setCurrent(words[Math.floor(Math.random() * words.length)]);
    }
  };

  if (state === "ready") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
        <Keyboard className="w-16 h-16 text-blue-400" />
        <h2 className="text-4xl font-bold">Speed Typing</h2>
        <p className="text-muted-foreground">Type as many words as you can in 30 seconds!</p>
        {highScore > 0 && <p className="text-sm text-muted-foreground">High Score: {highScore} chars</p>}
        <div className="flex gap-3">
          <button onClick={start} className="px-8 py-4 bg-blue-500 rounded-xl font-bold text-white">Start</button>
          <button onClick={onBack} className="px-6 py-4 bg-secondary rounded-xl font-bold">Back</button>
        </div>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
        <h2 className="text-4xl font-bold">{score > highScore ? "NEW RECORD!" : "Time's Up!"}</h2>
        <p className="text-3xl font-bold text-blue-400">{score} characters</p>
        <p className="text-muted-foreground">~{Math.round(score / 5)} WPM</p>
        <div className="flex gap-3">
          <button onClick={start} className="px-6 py-3 bg-primary rounded-xl font-bold">Play Again</button>
          <button onClick={onBack} className="px-6 py-3 bg-secondary rounded-xl font-bold">Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
      <div className="flex gap-8 text-xl font-bold">
        <span>Time: {timeLeft}s</span>
        <span className="text-blue-400">Score: {score}</span>
      </div>
      <div className="text-5xl md:text-6xl font-mono font-bold">
        {current.split("").map((char, i) => (
          <span key={i} className={i < input.length ? (input[i] === char ? "text-green-400" : "text-red-400") : "text-muted-foreground"}>
            {char}
          </span>
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} className="w-full max-w-md px-6 py-4 text-2xl text-center bg-secondary rounded-xl border-2 border-border focus:border-primary outline-none" placeholder="Type here..." autoFocus />
    </div>
  );
};

// COLOR MATCH
const ColorMatch = ({ onBack }: { onBack: () => void }) => {
  const colors = [
    { name: "Red", hex: "#ef4444" },
    { name: "Blue", hex: "#3b82f6" },
    { name: "Green", hex: "#22c55e" },
    { name: "Yellow", hex: "#eab308" },
    { name: "Purple", hex: "#a855f7" },
    { name: "Pink", hex: "#ec4899" },
    { name: "Orange", hex: "#f97316" },
    { name: "Cyan", hex: "#06b6d4" },
  ];
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [state, setState] = useState<"ready" | "playing" | "done">("ready");
  const [current, setCurrent] = useState(colors[0]);
  const [options, setOptions] = useState(colors.slice(0, 4));
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("color-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const generate = () => {
    const correct = colors[Math.floor(Math.random() * colors.length)];
    const opts = [correct, ...colors.filter((c) => c.name !== correct.name).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
    setCurrent(correct);
    setOptions(opts);
  };

  const start = () => {
    setState("playing");
    setScore(0);
    setTimeLeft(30);
    generate();
  };

  useEffect(() => {
    if (state === "playing" && timeLeft > 0) {
      const t = setInterval(() => setTimeLeft((x) => x - 1), 1000);
      return () => clearInterval(t);
    } else if (timeLeft === 0) {
      setState("done");
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("color-highscore", score.toString());
      }
    }
  }, [state, timeLeft, score, highScore]);

  const guess = (color: typeof colors[0]) => {
    if (color.name === current.name) {
      setScore((s) => s + 10);
      generate();
    } else {
      setScore((s) => Math.max(0, s - 5));
    }
  };

  if (state === "ready") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
        <Palette className="w-16 h-16 text-pink-400" />
        <h2 className="text-4xl font-bold">Color Match</h2>
        <p className="text-muted-foreground">Identify the shown color!</p>
        {highScore > 0 && <p className="text-sm text-muted-foreground">High Score: {highScore}</p>}
        <div className="flex gap-3">
          <button onClick={start} className="px-8 py-4 bg-pink-500 rounded-xl font-bold text-white">Start</button>
          <button onClick={onBack} className="px-6 py-4 bg-secondary rounded-xl font-bold">Back</button>
        </div>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
        <h2 className="text-4xl font-bold">{score > highScore ? "NEW RECORD!" : "Time's Up!"}</h2>
        <p className="text-3xl font-bold text-pink-400">{score} points</p>
        <div className="flex gap-3">
          <button onClick={start} className="px-6 py-3 bg-primary rounded-xl font-bold">Play Again</button>
          <button onClick={onBack} className="px-6 py-3 bg-secondary rounded-xl font-bold">Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
      <div className="flex gap-8 text-xl font-bold">
        <span>Time: {timeLeft}s</span>
        <span className="text-pink-400">Score: {score}</span>
      </div>
      <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl shadow-2xl" style={{ backgroundColor: current.hex }} />
      <div className="grid grid-cols-2 gap-3">
        {options.map((c) => (
          <button key={c.name} onClick={() => guess(c)} className="px-6 py-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl font-bold transition-colors">
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// SNAKE
const SnakeGame = ({ onBack }: { onBack: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const directionRef = useRef({ dx: 1, dy: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("snake-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (!playing || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grid = 20;
    const count = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let s = 0;
    directionRef.current = { dx: 1, dy: 0 };

    const loop = setInterval(() => {
      const { dx, dy } = directionRef.current;
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      
      if (head.x < 0 || head.x >= count || head.y < 0 || head.y >= count || snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        clearInterval(loop);
        setGameOver(true);
        setPlaying(false);
        if (s > highScore) {
          setHighScore(s);
          localStorage.setItem("snake-highscore", s.toString());
        }
        return;
      }
      
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        s += 10;
        setScore(s);
        food = { x: Math.floor(Math.random() * count), y: Math.floor(Math.random() * count) };
      } else {
        snake.pop();
      }
      
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 400, 400);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(food.x * grid, food.y * grid, grid - 2, grid - 2);
      ctx.fillStyle = "#22c55e";
      snake.forEach((seg) => ctx.fillRect(seg.x * grid, seg.y * grid, grid - 2, grid - 2));
    }, 120);

    const keyHandler = (e: KeyboardEvent) => {
      const { dx, dy } = directionRef.current;
      switch (e.key) {
        case "ArrowUp": if (dy === 0) directionRef.current = { dx: 0, dy: -1 }; break;
        case "ArrowDown": if (dy === 0) directionRef.current = { dx: 0, dy: 1 }; break;
        case "ArrowLeft": if (dx === 0) directionRef.current = { dx: -1, dy: 0 }; break;
        case "ArrowRight": if (dx === 0) directionRef.current = { dx: 1, dy: 0 }; break;
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      clearInterval(loop);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [playing, gameOver, highScore]);

  const start = () => {
    setScore(0);
    setGameOver(false);
    setPlaying(true);
  };

  if (!playing) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
        <Gamepad2 className="w-16 h-16 text-green-400" />
        <h2 className="text-4xl font-bold">Snake</h2>
        <p className="text-muted-foreground">Use arrow keys or swipe to control!</p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Score: {score}</span>
          {highScore > 0 && <span>Best: {highScore}</span>}
        </div>
        <div className="flex gap-3">
          <button onClick={start} className="px-8 py-4 bg-green-500 rounded-xl font-bold text-white">{gameOver ? "Play Again" : "Start"}</button>
          <button onClick={onBack} className="px-6 py-4 bg-secondary rounded-xl font-bold">Back</button>
        </div>
        {gameOver && <p className="text-red-400 font-bold text-xl">Game Over!</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
      <div className="flex items-center gap-8 text-xl font-bold">
        <span className="text-green-400">Score: {score}</span>
        <span className="text-sm text-muted-foreground">Arrow Keys to Move</span>
      </div>
      <canvas ref={canvasRef} width={400} height={400} className="border-2 border-border rounded-lg max-w-full bg-black" />
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button 
          onClick={() => { if (directionRef.current.dy === 0) directionRef.current = { dx: 0, dy: -1 }; }}
          className="px-4 py-3 bg-secondary rounded-lg text-xl"
        >↑</button>
        <div />
        <button 
          onClick={() => { if (directionRef.current.dx === 0) directionRef.current = { dx: -1, dy: 0 }; }}
          className="px-4 py-3 bg-secondary rounded-lg text-xl"
        >←</button>
        <button 
          onClick={() => { if (directionRef.current.dy === 0) directionRef.current = { dx: 0, dy: 1 }; }}
          className="px-4 py-3 bg-secondary rounded-lg text-xl"
        >↓</button>
        <button 
          onClick={() => { if (directionRef.current.dx === 0) directionRef.current = { dx: 1, dy: 0 }; }}
          className="px-4 py-3 bg-secondary rounded-lg text-xl"
        >→</button>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setPlaying(false)} className="px-4 py-2 bg-secondary rounded-lg text-sm">Pause</button>
        <button onClick={onBack} className="px-4 py-2 bg-secondary rounded-lg text-sm">Back</button>
      </div>
    </div>
  );
};

// 2048
const Puzzle2048 = ({ onBack }: { onBack: () => void }) => {
  const [board, setBoard] = useState<number[][]>(Array(4).fill(null).map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("puzzle-highscore");
    if (saved) setHighScore(parseInt(saved));
    initGame();
  }, []);

  const addRandom = (b: number[][]) => {
    const empty: { r: number; c: number }[] = [];
    b.forEach((row, r) => row.forEach((cell, c) => { if (cell === 0) empty.push({ r, c }); }));
    if (empty.length > 0) {
      const { r, c } = empty[Math.floor(Math.random() * empty.length)];
      b[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
    return b;
  };

  const initGame = () => {
    let b = Array(4).fill(null).map(() => Array(4).fill(0));
    b = addRandom(b);
    b = addRandom(b);
    setBoard(b);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const move = (dir: "up" | "down" | "left" | "right") => {
    if (gameOver || won) return;
    let newBoard = board.map((r) => [...r]);
    let moved = false;
    let newScore = score;

    const slide = (arr: number[]) => {
      let f = arr.filter((x) => x !== 0);
      for (let i = 0; i < f.length - 1; i++) {
        if (f[i] === f[i + 1]) {
          f[i] *= 2;
          newScore += f[i];
          if (f[i] === 2048) setWon(true);
          f[i + 1] = 0;
        }
      }
      f = f.filter((x) => x !== 0);
      while (f.length < 4) f.push(0);
      return f;
    };

    if (dir === "left") {
      for (let r = 0; r < 4; r++) {
        const old = [...newBoard[r]];
        newBoard[r] = slide(newBoard[r]);
        if (old.join(",") !== newBoard[r].join(",")) moved = true;
      }
    } else if (dir === "right") {
      for (let r = 0; r < 4; r++) {
        const old = [...newBoard[r]];
        newBoard[r] = slide(newBoard[r].reverse()).reverse();
        if (old.join(",") !== newBoard[r].join(",")) moved = true;
      }
    } else if (dir === "up") {
      for (let c = 0; c < 4; c++) {
        const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        const old = [...col];
        const newCol = slide(col);
        for (let r = 0; r < 4; r++) newBoard[r][c] = newCol[r];
        if (old.join(",") !== newCol.join(",")) moved = true;
      }
    } else if (dir === "down") {
      for (let c = 0; c < 4; c++) {
        const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        const old = [...col];
        const newCol = slide(col.reverse()).reverse();
        for (let r = 0; r < 4; r++) newBoard[r][c] = newCol[r];
        if (old.join(",") !== newCol.join(",")) moved = true;
      }
    }

    if (moved) {
      newBoard = addRandom(newBoard);
      setBoard(newBoard);
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("puzzle-highscore", newScore.toString());
      }
      let canMove = false;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (newBoard[r][c] === 0) canMove = true;
          if (c < 3 && newBoard[r][c] === newBoard[r][c + 1]) canMove = true;
          if (r < 3 && newBoard[r][c] === newBoard[r + 1][c]) canMove = true;
        }
      }
      if (!canMove) setGameOver(true);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
        case "ArrowRight": move("right"); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [board, score, gameOver, won, highScore]);

  const colors: Record<number, string> = {
    0: "bg-secondary/30",
    2: "bg-gray-200 text-gray-800",
    4: "bg-gray-300 text-gray-800",
    8: "bg-orange-200 text-gray-800",
    16: "bg-orange-300 text-gray-800",
    32: "bg-orange-400 text-white",
    64: "bg-orange-500 text-white",
    128: "bg-yellow-300 text-gray-800",
    256: "bg-yellow-400 text-gray-800",
    512: "bg-yellow-500 text-white",
    1024: "bg-green-400 text-white",
    2048: "bg-green-500 text-white",
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
      <div className="flex items-center gap-4">
        <Grid3X3 className="w-8 h-8 text-yellow-400" />
        <h2 className="text-3xl font-bold">2048</h2>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <span>Score: {score}</span>
        {highScore > 0 && <span>Best: {highScore}</span>}
      </div>
      <div className="grid grid-cols-4 gap-2 p-4 bg-secondary/50 rounded-xl">
        {board.flat().map((cell, i) => (
          <motion.div key={i} initial={cell !== 0 ? { scale: 0 } : {}} animate={{ scale: 1 }} className={`w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-xl font-bold ${colors[cell] || "bg-primary text-white"}`}>
            {cell !== 0 && cell}
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div />
        <button onClick={() => move("up")} className="p-3 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"><ArrowUp className="w-5 h-5" /></button>
        <div />
        <button onClick={() => move("left")} className="p-3 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"><ArrowLeftIcon className="w-5 h-5" /></button>
        <button onClick={() => move("down")} className="p-3 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"><ArrowDown className="w-5 h-5" /></button>
        <button onClick={() => move("right")} className="p-3 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"><ArrowRightIcon className="w-5 h-5" /></button>
      </div>
      {won && <p className="text-green-400 font-bold text-xl">You reached 2048!</p>}
      {gameOver && <p className="text-red-400 font-bold text-xl">Game Over!</p>}
      <div className="flex gap-3">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-6 py-2 bg-primary rounded-xl font-bold text-sm">New Game</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onBack} className="px-6 py-2 bg-secondary rounded-xl font-bold text-sm">Back</motion.button>
      </div>
      <p className="text-xs text-muted-foreground">Use arrow keys or buttons</p>
    </div>
  );
};

// MAIN PAGE
export default function PlayPage() {
  const router = useRouter();
  const [currentGame, setCurrentGame] = useState<GameType>("menu");
  const [highScores, setHighScores] = useState({ memory: 0, typing: 0, color: 0, snake: 0, puzzle: 0, code: 0 });

  useEffect(() => {
    setHighScores({
      memory: parseInt(localStorage.getItem("memory-highscore") || "0"),
      typing: parseInt(localStorage.getItem("typing-highscore") || "0"),
      color: parseInt(localStorage.getItem("color-highscore") || "0"),
      snake: parseInt(localStorage.getItem("snake-highscore") || "0"),
      puzzle: parseInt(localStorage.getItem("puzzle-highscore") || "0"),
      code: parseInt(localStorage.getItem("code-highscore") || "0"),
    });
  }, [currentGame]);

  const games = [
    { id: "code", title: "Code Challenge", description: "Test your programming knowledge!", icon: Code, color: "from-blue-400 to-purple-600" },
    { id: "memory", title: "Memory Match", description: "Match pairs, test your memory", icon: Brain, color: "from-purple-400 to-pink-500" },
    { id: "typing", title: "Speed Typing", description: "Type words as fast as you can", icon: Keyboard, color: "from-blue-400 to-cyan-500" },
    { id: "color", title: "Color Match", description: "Identify colors under pressure", icon: Palette, color: "from-pink-400 to-rose-500" },
    { id: "snake", title: "Snake", description: "Classic snake game", icon: Gamepad2, color: "from-green-400 to-emerald-500" },
    { id: "puzzle", title: "2048", description: "Merge tiles to reach 2048", icon: Grid3X3, color: "from-yellow-400 to-amber-500" },
  ];

  if (currentGame === "code") return <CodeChallenge onBack={() => setCurrentGame("menu")} />;
  if (currentGame === "memory") return <MemoryMatch onBack={() => setCurrentGame("menu")} />;
  if (currentGame === "typing") return <TypingSpeed onBack={() => setCurrentGame("menu")} />;
  if (currentGame === "color") return <ColorMatch onBack={() => setCurrentGame("menu")} />;
  if (currentGame === "snake") return <SnakeGame onBack={() => setCurrentGame("menu")} />;
  if (currentGame === "puzzle") return <Puzzle2048 onBack={() => setCurrentGame("menu")} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 text-foreground overflow-hidden">
      {/* Premium Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
            <button 
              onClick={() => router.push("/")} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-semibold hidden sm:block">Back to Portfolio</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg leading-tight">Dev Arcade</h1>
                <p className="text-xs text-muted-foreground">6 Games • Test Your Skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
            <Gamepad2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Developer Game Collection</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 via-indigo-600 to-cyan-500">
              Dev Arcade
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Beyond coding. Beyond shipping. Time to test your skills. 
            <span className="text-foreground font-medium">Choose your challenge.</span>
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GameCard
                title={game.title}
                description={game.description}
                icon={game.icon}
                color={game.color}
                highScore={highScores[game.id as keyof typeof highScores]}
                onClick={() => setCurrentGame(game.id as GameType)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Stats */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>High scores saved locally</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>6 Unique Challenges</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-500" />
            <span>Built with React + Framer Motion</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
