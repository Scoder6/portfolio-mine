"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Brain, AlertTriangle, Bug, Server, Wifi, WifiOff } from 'lucide-react';

const SoftwareRantAI = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentRant, setCurrentRant] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    rate: 0.85,
    pitch: 0.75,
    volume: 1.0
  });
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const rants = [
    {
      title: "Production vs Local Environment",
      content: "You know what drives me absolutely crazy? When something works PERFECTLY in local development and then explodes in production! It's like the code has stage fright! All those environment variables, different Node versions, network latency... suddenly your beautiful localhost masterpiece becomes a production disaster! CORS errors everywhere, database connections timing out, and that one API that worked flawlessly locally? Yeah, it's returning 500 errors because you forgot to whitelist the production domain. Classic!",
      icon: <Server className="w-6 h-6" />,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "The Mystery of 404 Errors",
      content: "404 errors are the ghosts of the internet! You swear the endpoint exists, you can see it in your code, you've tested it locally, but in production? POOF! Gone! Like it never existed! Is it a caching issue? Is it the CDN? Is it the reverse proxy? You spend hours debugging, only to find out you misspelled the route by ONE LETTER! One! Single! Letter! The embarrassment is real!",
      icon: <WifiOff className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "409 Conflict Madness",
      content: "Ah, the 409 Conflict! The passive-aggressive error of HTTP status codes! It's not saying 'you broke it' like a 500, it's saying 'your request makes sense, but I'm choosing to ignore it'! Usually because someone else is trying to do the same thing. Great! Now you have to implement optimistic locking, versioning, or just tell users 'try again later'! Meanwhile, your database is in a weird state because two operations tried to update the same record!",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-yellow-500 to-red-500"
    },
    {
      title: "500 Internal Server Hell",
      content: "The 500 error is the 'it's not you, it's me' of web development! But let's be honest, it's totally you! Your code threw an exception, your database query failed, or that third-party API you depend on is down! And what do users see? A generic 'Something went wrong' message because you're too scared to show the real error! Meanwhile, you're frantically checking logs, trying to reproduce the bug, and wondering why you didn't write better error handling!",
      icon: <Bug className="w-6 h-6" />,
      color: "from-red-600 to-red-800"
    },
    {
      title: "The Works in Prod, Fails Locally Paradox",
      content: "And here's the ultimate mind-bender: when something works in production but fails on your local machine! HOW?! Your production database has data that your local doesn't, the production environment variables are different, or maybe the production build process is doing something magical! You're copying production data locally, trying to match the exact environment, and still getting errors! It's like your code is gaslighting you!",
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Network Error Roulette",
      content: "Network errors are the ultimate excuse! 'It works on my machine!' Yeah, because your machine has perfect internet! But users? They're on 3G, behind corporate firewalls, using sketchy WiFi, or their ISP is having issues! Your beautiful app becomes a loading spinner nightmare! Timeouts, retries, exponential backoff... you've built an entire error handling system just to deal with the fact that the internet is unreliable!",
      icon: <Wifi className="w-6 h-6" />,
      color: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    // Client-side only initialization for Next.js SSR compatibility
    if (typeof window === 'undefined') return;
    
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    synthRef.current = window.speechSynthesis;
    
    // Load available voices with better error handling
    const loadVoices = () => {
      try {
        const voices = synthRef.current?.getVoices() || [];
        setAvailableVoices(voices);
        
        // Auto-select Google UK English male voice with fallback chain
        const ukMaleVoice = voices.find(voice => 
          voice.name.includes('Google') && 
          voice.lang.includes('en-GB') && 
          voice.name.includes('Male')
        ) || voices.find(voice => 
          voice.lang.includes('en-GB')
        ) || voices.find(voice => 
          voice.name.includes('Google') && voice.lang.includes('en')
        ) || voices[0];
        
        if (ukMaleVoice) {
          setSelectedVoice(ukMaleVoice.name);
        }
      } catch (error) {
        console.warn('Error loading voices:', error);
      }
    };

    // Initial voice load
    loadVoices();
    
    // Handle async voice loading
    if (synthRef.current) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    // Initialize audio context with better error handling
    const initAudioContext = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
        }
      } catch (error) {
        // Audio context is optional, so just log and continue
        console.log('Audio context not available:', error);
      }
    };

    initAudioContext();

    // Cleanup function for Next.js compatibility
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const speak = (text: string) => {
    // Client-side check for Next.js SSR compatibility
    if (typeof window === 'undefined') return;
    
    if (!synthRef.current) {
      console.warn('Speech synthesis not available');
      return;
    }

    try {
      // Stop any current speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Enhanced voice settings for more natural speech
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;
      
      // Add pauses for more natural speech
      const enhancedText = text
        .replace(/([.!?])/g, '$1... ') // Add pauses after sentences
        .replace(/([,;])/g, '$1 ') // Small pauses after commas
        .replace(/\b(404|409|500|CORS|API)\b/g, '$1...'); // Emphasize technical terms

      utterance.text = enhancedText;

    // Voice selection - only Google UK English male
    const voices = synthRef.current.getVoices();
    const selectedVoiceObject = voices.find(voice => 
      voice.name.includes('Google') && 
      voice.lang.includes('en-GB') && 
      voice.name.includes('Male')
    ) || voices.find(voice => 
      voice.lang.includes('en-GB')
    ) || voices[0];

    if (selectedVoiceObject) {
      utterance.voice = selectedVoiceObject;
    }

    // Enhanced event handlers with better error handling
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPlaying(true);
      console.log('Speech started with voice:', selectedVoiceObject?.name);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPlaying(false);
      console.log('Speech ended');
    };

    utterance.onerror = (event) => {
      // Handle different speech errors gracefully
      const error = event.error;
      
      // Don't log "interrupted" errors as they're normal when stopping speech
      if (error !== 'interrupted') {
        console.warn('Speech error:', error);
      }
      
      setIsSpeaking(false);
      setIsPlaying(false);
      
      // Only try fallback for critical errors, not interruptions
      if (error !== 'interrupted' && selectedVoiceObject && voices.length > 1) {
        const fallbackVoice = voices.find(v => v !== selectedVoiceObject);
        if (fallbackVoice) {
          // Create new utterance for retry
          const retryUtterance = new SpeechSynthesisUtterance(enhancedText);
          retryUtterance.rate = voiceSettings.rate;
          retryUtterance.pitch = voiceSettings.pitch;
          retryUtterance.volume = voiceSettings.volume;
          retryUtterance.voice = fallbackVoice;
          
          setTimeout(() => {
            if (synthRef.current) {
              synthRef.current.speak(retryUtterance);
            }
          }, 200);
        }
      }
    };

    // Add progress tracking
    utterance.onboundary = (event) => {
      // Visual feedback for speech progress
      if (analyserRef.current && audioContextRef.current) {
        // Create audio visualization data
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
      }
    };

    speechRef.current = utterance;
    synthRef.current.speak(utterance);
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setIsSpeaking(false);
      setIsPlaying(false);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speak(rants[currentRant].content);
    }
  };

  const nextRant = () => {
    stopSpeaking();
    setCurrentRant((prev) => (prev + 1) % rants.length);
  };

  const prevRant = () => {
    stopSpeaking();
    setCurrentRant((prev) => (prev - 1 + rants.length) % rants.length);
  };

  const currentRantData = rants[currentRant];

  // Crazy fast typing function
  const startCrazyTyping = () => {
    if (isTyping) return;
    
    setIsTyping(true);
    setTypingText('');
    setCurrentTypingIndex(0);
    
    const fullText = currentRantData.content;
    const words = fullText.split(' ');
    let currentWordIndex = 0;
    
    const typeNextWord = () => {
      if (currentWordIndex < words.length) {
        setTypingText(prev => {
          const newText = words.slice(0, currentWordIndex + 1).join(' ');
          return newText + (currentWordIndex < words.length - 1 ? ' ' : '');
        });
        currentWordIndex++;
        
        // Type next word after very short delay (20+ words per second = 50ms per word)
        if (currentWordIndex < words.length) {
          setTimeout(typeNextWord, 30 + Math.random() * 20); // 30-50ms per word
        } else {
          setTimeout(() => {
            setIsTyping(false);
            // Start speaking after typing is done
            setTimeout(() => {
              speak(fullText);
            }, 500);
          }, 300);
        }
      }
    };
    
    typeNextWord();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* AI Character - Indian blonde black guy with shaved beard */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="relative mb-8"
      >
        {/* Character Avatar */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
              {/* Face */}
              <div className="relative">
                {/* Smart looking face with fair complexion */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 relative overflow-hidden">
                  {/* Eyes - intelligent looking */}
                  <div className="absolute top-8 left-6 w-3 h-3 bg-gray-800 rounded-full shadow-inner">
                    <div className="w-1 h-1 bg-white rounded-full mt-1 ml-1"></div>
                  </div>
                  <div className="absolute top-8 right-6 w-3 h-3 bg-gray-800 rounded-full shadow-inner">
                    <div className="w-1 h-1 bg-white rounded-full mt-1 ml-1"></div>
                  </div>
                  
                  {/* Eyebrows - smart and aligned */}
                  <div className="absolute top-5 left-5 w-4 h-1 bg-gray-700 rounded-full transform -rotate-3"></div>
                  <div className="absolute top-5 right-5 w-4 h-1 bg-gray-700 rounded-full transform rotate-3"></div>
                  
                  {/* Nose */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full"></div>
                  
                  {/* Mouth - speaking */}
                  <AnimatePresence>
                    {isSpeaking && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: [1, 1.2, 0.8, 1] }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-800 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Shaved beard shadow - very little beard */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full opacity-30"></div>
                </div>
                
                {/* Hair - blonde/black mix */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-gray-800 to-amber-900 rounded-t-full opacity-90"></div>
              </div>
            </div>
          </div>
          
          {/* Speaking indicator */}
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.5, 1], 
                        opacity: [0.5, 1, 0.5] 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Rant Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-4xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentRantData.color} flex items-center justify-center shadow-lg`}>
              {currentRantData.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{currentRantData.title}</h3>
              <p className="text-sm text-gray-400">Software Development Reality Check</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevRant}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              disabled={isPlaying}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handlePlayPause}
              className={`p-3 rounded-xl transition-all transform hover:scale-105 ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/30'
              } shadow-lg`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            
            <button
              onClick={nextRant}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              disabled={isPlaying}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Typing Display or Rant Text */}
        <div className="bg-slate-900/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          {isTyping ? (
            <div className="space-y-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">CRAZY</span>
                </div>
                AI is typing like crazy!
              </h4>
              <div className="bg-black/80 rounded-lg p-4 font-mono text-green-400 min-h-[120px]">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{'>'}</span>
                  <span className="relative">
                    {typingText}
                    <motion.div
                      className="absolute right-0 top-0 w-2 h-4 bg-green-400 animate-pulse"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.1, repeat: Infinity }}
                    />
                  </span>
                </div>
              </div>
              <div className="text-center text-sm text-gray-400">
                Typing speed: {Math.round((typingText.split(' ').length / Math.max(1, (Date.now() - currentTypingIndex * 30) / 1000)) * 60)} words per second
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-100 leading-relaxed text-lg whitespace-pre-line">
                {currentRantData.content}
              </p>
            </div>
          )}
        </div>

        
        {/* Enhanced Audio Visualizer */}
        {isSpeaking && (
          <div className="bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-700/50">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-green-400" />
              Audio Visualizer
            </h4>
            <div className="flex items-center justify-center gap-2 h-16">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5 + Math.random(), 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.1 
                  }}
                  className="w-3 h-12 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                />
              ))}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {isSpeaking ? 'Speaking...' : 'Ready to speak'}
            </span>
          </div>
          
          <div className="flex gap-1">
            {rants.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentRant
                    ? 'bg-blue-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => !isPlaying && setCurrentRant(index)}
                style={{ cursor: isPlaying ? 'not-allowed' : 'pointer' }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center max-w-2xl"
      >
        <p className="text-gray-400 text-sm">
          <span className="text-blue-400 font-medium">Pro tip:</span> Click the play button to hear me rant about software development nightmares!
        </p>
      </motion.div>
    </div>
  );
};

export default SoftwareRantAI;
