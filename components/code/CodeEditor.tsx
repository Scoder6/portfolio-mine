"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Trash2, Copy, Terminal } from 'lucide-react';

const VSCodeEditor = () => {
  const [code, setCode] = useState(`// Welcome to the Code Editor
// Try running some JavaScript code!

console.log("Hello, World!");

const message = "Welcome to my portfolio!";
console.log(message);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);

// Try your own code here!`);

  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Safe JavaScript executor
  const runCode = () => {
    setIsRunning(true);
    setError('');
    setOutput([]);
    
    try {
      // Capture console output
      const logs: string[] = [];
      const originalConsole = window.console;
      
      // Create a custom console that captures output
      const customConsole = {
        log: (...args: any[]) => {
          const message = args.map(arg => {
            if (typeof arg === 'object') {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          }).join(' ');
          logs.push(`📝 ${message}`);
          originalConsole.log(...args);
        },
        error: (...args: any[]) => {
          const message = args.map(arg => String(arg)).join(' ');
          logs.push(`❌ ${message}`);
          originalConsole.error(...args);
        },
        warn: (...args: any[]) => {
          const message = args.map(arg => String(arg)).join(' ');
          logs.push(`⚠️ ${message}`);
          originalConsole.warn(...args);
        },
        info: (...args: any[]) => {
          const message = args.map(arg => String(arg)).join(' ');
          logs.push(`ℹ️ ${message}`);
          originalConsole.info(...args);
        }
      };
      
      // Execute the code in a sandboxed environment
      const executeCode = new Function('console', code + '\n//# sourceURL=CodeEditor');
      executeCode(customConsole);
      
      setOutput(logs.length > 0 ? logs : ['✅ Code executed successfully']);
    } catch (err: any) {
      setError(`❌ Error: ${err.message || 'Code execution failed'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput([]);
    setError('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const clearConsole = () => {
    setOutput([]);
    setError('');
  };

  return (
    <div className="w-full h-screen min-h-[600px] bg-[#1e1e1e] flex flex-col font-mono text-sm">
      {/* Title Bar */}
      <div className="bg-[#2d2d30] h-8 flex items-center justify-between px-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full hover:bg-[#ff6b6b] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full hover:bg-[#ffc733] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 bg-[#28ca42] rounded-full hover:bg[#33d357] transition-colors cursor-pointer"></div>
          </div>
          <div className="text-gray-400 text-sm ml-4">Code Editor</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={clearCode}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
            title="Clear code"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Code Editor Section */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Editor Header */}
          <div className="bg-[#252526] h-6 flex items-center justify-between px-4 border-b border-gray-700">
            <div className="text-gray-300 text-xs flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              JavaScript
            </div>
            <div className="text-gray-400 text-xs">
              {code.split('\n').length} lines
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex min-h-0">
            {/* Line Numbers */}
            <div className="bg-[#1e1e1e] text-gray-500 text-xs px-3 py-4 select-none border-r border-gray-700 min-w-fit">
              {code.split('\n').map((_, index) => (
                <div key={index} className="leading-6">
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Code Input */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-[#1e1e1e] text-gray-300 p-4 leading-6 resize-none outline-none font-mono text-sm min-h-0"
              spellCheck={false}
              placeholder="// Write your JavaScript code here..."
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Status Bar */}
          <div className="bg-[#007acc] h-8 flex items-center justify-between px-4">
            <div className="text-white text-xs">
              JavaScript Editor
            </div>
            <div className="text-white text-xs flex items-center gap-3">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-xs transition-colors"
              >
                {isRunning ? (
                  <>
                    <Square className="w-3 h-3" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Run Code
                  </>
                )}
              </button>
              <span className="hidden sm:inline">Ln {code.split('\n').length}, Col 1</span>
            </div>
          </div>
        </div>

        {/* Console Section */}
        <div className="w-full lg:w-1/3 flex flex-col min-h-0 border-t lg:border-t-0 lg:border-l border-gray-700">
          {/* Console Header */}
          <div className="bg-[#252526] h-6 flex items-center justify-between px-4 border-b border-gray-700">
            <div className="text-gray-300 text-xs flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              Console
            </div>
            <button
              onClick={clearConsole}
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Console Output */}
          <div className="flex-1 bg-black overflow-y-auto p-4">
            {output.length === 0 && !error && (
              <div className="text-gray-500 text-xs font-mono">
                // Console output will appear here...
              </div>
            )}
            {error && (
              <div className="text-red-400 font-mono text-xs mb-2 break-all">
                {error}
              </div>
            )}
            {output.map((line, index) => (
              <div key={index} className="font-mono text-xs mb-1 break-all">
                <span className={
                  line.startsWith('📝') ? 'text-green-400' :
                  line.startsWith('❌') ? 'text-red-400' :
                  line.startsWith('⚠️') ? 'text-yellow-400' :
                  line.startsWith('ℹ️') ? 'text-blue-400' :
                  line.startsWith('✅') ? 'text-green-400' :
                  'text-gray-300'
                }>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeEditor;
