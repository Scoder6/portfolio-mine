"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Mail, ChevronRight, AlertCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isEmail?: boolean;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi there! I'm Saptash's AI assistant. I can tell you about his skills, projects, experience, or help you get in touch!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState({ name: "", email: "", message: "" });
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showEmailForm]);

  const responses: Record<string, { text: string; showEmail?: boolean }> = {
    "skills": { text: "🚀 **Full-Stack Expertise**\n\nSaptash is a full-stack developer with expertise in:\n• React & Next.js\n• TypeScript & JavaScript\n• Node.js & Python\n• AWS & Cloud Services\n• PostgreSQL & MongoDB\n\nCheck the Skills section for the complete stack!" },
    "experience": { text: "💼 **4+ Years of Production Experience**\n\n• Teaching Platform (1000+ users)\n• Cab Booking System (Real-time tracking)\n• SAM Model Optimization (AI/ML)\n• Multiple Scale Projects\n\nSee the Work Experience section for details!" },
    "work": { text: "🏢 **Professional Journey**\n\n• Byte-Quest: Built scalable education platform\n• EnergiSpot: Energy management solutions\n• Multiple production systems serving 1000+ users\n\nScale is his middle name! 📈" },
    "contact": { text: "📧 **Get in Touch**\n\nI'd love to help you connect with Saptash!\n\n• **Primary Email:** saptashprivateprofile@gmail.com ⭐ (preferred)\n• **Backup Email:** matulchaubey669@gmail.com\n• Response time: Usually within 24 hours\n\nWant me to send a message directly? Click below!", showEmail: true },
    "projects": { text: "🎯 **Project Portfolio**\n\n**Small Projects:** Quick experiments & weekend hacks\n• Tic Tac Toe, Andaman Attols, and more\n\n**Scale Projects:** Production-grade systems\n• Teaching Platform, Cab Booking, SAM Model\n\n**Games:** Chaos Arcade with 6 games!\n• Snake, 2048, Memory Match, and more" },
    "games": { text: "🎮 **Chaos Arcade**\n\n6 challenging games waiting for you:\n• Chaos Clicker (Reflex test)\n• Memory Match (Brain training)\n• Speed Typing (WPM challenge)\n• Color Match (Visual speed)\n• Snake (Classic)\n• 2048 (Puzzle)\n\nHead to the Fun Zone to play!" },
    "hire": { text: "💼 **Hiring Saptash?**\n\nGreat decision! He's a 0→1 shipper who:\n• Builds production-ready systems\n• Handles full-stack architecture\n• Ships fast without compromising quality\n\nWant to discuss a project? Send him a message!", showEmail: true },
    "hello": { text: "👋 Hey there! Welcome to Saptash's portfolio!\n\nI can help you with:\n• � Technical skills & stack\n• 💼 Work experience & projects\n• 🎮 Games in the Chaos Arcade\n• 📧 Getting in touch\n\nWhat would you like to know?" },
    "hi": { text: "🤙 Yo! What's up? Ask me about Saptash's work, skills, or the games in the Chaos Arcade!" },
    "hey": { text: "Hey hey! 👋 Ready to explore? I can tell you about projects, skills, or help you contact Saptash!" },
    "default": { text: "🤔 That's an interesting question!\n\nI'm still learning, but here are some things I can help with:\n• Technical skills & experience\n• Project details\n• Contact information\n• Games in the Chaos Arcade\n\nOr if you need something specific, you can send a direct message to Saptash!", showEmail: true },
  };

  const getResponse = (text: string): { text: string; showEmail?: boolean } => {
    const lower = text.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lower.includes(key)) return value;
    }
    return responses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      if (response.showEmail) {
        setTimeout(() => setShowEmailForm(true), 500);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const validateEmailForm = () => {
    const errors = [];
    
    if (!emailData.name.trim() || emailData.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.email)) {
      errors.push("Please enter a valid email address");
    }
    
    if (!emailData.message.trim() || emailData.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long");
    }
    
    setEmailError(errors.join(". "));
    return errors.length === 0;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmailForm()) {
      return;
    }
    
    try {
      setEmailSent(true);
      setEmailError("");
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (response.ok) {
        const confirmationMessage: Message = {
          id: messages.length + 1,
          text: `✅ **Message Sent Successfully!**\n\nThanks ${emailData.name}! Your message has been sent to Saptash.\n\n📧 **Primary Email:** saptashprivateprofile@gmail.com (preferred)\n📧 **Backup Email:** matulchaubey669@gmail.com\n\nHe'll get back to you within 24 hours!`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirmationMessage]);
        setShowEmailForm(false);
        setEmailData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      const errorMessage: Message = {
        id: messages.length + 1,
        text: `❌ **Failed to Send Message**\n\nSorry ${emailData.name}, there was an error sending your message. Please try again later or contact Saptash directly at:\n\n📧 saptashprivateprofile@gmail.com (preferred)\n📧 matulchaubey669@gmail.com\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setTimeout(() => setEmailSent(false), 3000);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl transition-all duration-300 ${
          isOpen 
            ? "bg-red-500 hover:bg-red-600 rotate-90" 
            : "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 hover:shadow-fuchsia-500/50"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="fixed bottom-28 right-6 z-50 w-[380px] md:w-[420px] bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden"
          >
            {/* Premium Header */}
            <div className="relative bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-5">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center border border-white/30">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">Portfolio Assistant</h3>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span>Online now</span>
                  </div>
                </div>
                <Bot className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-background/95">
              {/* Quick Actions */}
              {messages.length <= 2 && !showEmailForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-2 mb-4"
                >
                  {[
                    { icon: "💻", text: "Skills", keyword: "skills" },
                    { icon: "💼", text: "Experience", keyword: "experience" },
                    { icon: "🎯", text: "Projects", keyword: "projects" },
                    { icon: "📧", text: "Contact", keyword: "contact" },
                  ].map((item) => (
                    <button
                      key={item.keyword}
                      onClick={() => {
                        setInput(item.keyword);
                        handleSend();
                      }}
                      className="flex items-center gap-2 p-3 bg-secondary/50 hover:bg-secondary rounded-xl text-sm transition-all hover:scale-[1.02] border border-border/50"
                    >
                      <span>{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-3 ${msg.isUser ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    msg.isUser 
                      ? "bg-gradient-to-br from-violet-500 to-fuchsia-500" 
                      : "bg-gradient-to-br from-slate-700 to-slate-800"
                  }`}>
                    {msg.isUser ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.isUser
                      ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white rounded-br-md"
                      : "bg-white dark:bg-slate-800 text-foreground rounded-bl-md border border-border/50"
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-md border border-border/50 shadow-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                          className="w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Email Form */}
              {showEmailForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 p-4 rounded-2xl border border-violet-200 dark:border-violet-800/50"
                >
                  <div className="flex items-center gap-2 mb-3 text-violet-700 dark:text-violet-300">
                    <Mail className="w-4 h-4" />
                    <span className="font-semibold text-sm">Send a direct message</span>
                  </div>
                  <div className="text-xs text-violet-600 dark:text-violet-400 mb-2">
                    Your message will be sent to both saptashprivateprofile@gmail.com (preferred) and matulchaubey669@gmail.com
                  </div>
                  {emailError && (
                    <div className="mb-3 p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {emailError}
                      </p>
                    </div>
                  )}
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={emailData.name}
                      onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 rounded-lg text-sm border border-violet-200 dark:border-violet-800/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={emailData.email}
                      onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 rounded-lg text-sm border border-violet-200 dark:border-violet-800/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                    <textarea
                      placeholder="Your message..."
                      value={emailData.message}
                      onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 rounded-lg text-sm border border-violet-200 dark:border-violet-800/50 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      rows={2}
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={emailSent}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {emailSent ? (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEmailForm(false)}
                        className="px-3 py-2 bg-secondary rounded-lg text-sm hover:bg-secondary/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border/50">
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-secondary/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 border border-border/50 transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  Powered by Chaos Intelligence™
                </p>
                <button 
                  onClick={() => setShowEmailForm(!showEmailForm)}
                  className="text-xs text-violet-500 hover:text-violet-600 font-medium flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  {showEmailForm ? "Hide form" : "Send email"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
