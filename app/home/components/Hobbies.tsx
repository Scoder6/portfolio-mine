"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Code, Trophy, RotateCcw, Crown, Brain, Volume2, Headphones } from "lucide-react";
import ChessGameComponent from "@/components/chess/ChessGame";
import CodeEditor from "@/components/code/CodeEditor";
import SoftwareRantAI from "@/components/software-rant/SoftwareRantAI";
import FastTyping from "@/components/typing/FastTyping";
import { useRouter } from "next/navigation";

// Chess piece types
type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';
type Piece = { type: PieceType; color: PieceColor } | null;
type Position = { row: number; col: number };

// Chess piece Unicode symbols
const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  white: { pawn: '♙', rook: '♖', knight: '♘', bishop: '♗', queen: '♕', king: '♔' },
  black: { pawn: '♟', rook: '♜', knight: '♞', bishop: '♝', queen: '♛', king: '♚' }
};

const INITIAL_BOARD: Piece[][] = [
  [
    { type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, 
    { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }
  ],
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' })),
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' })),
  [
    { type: 'rook', color: 'white' }, { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }
  ]
];

const ChessGame = () => {
  const [board, setBoard] = useState<Piece[][]>(INITIAL_BOARD);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{ white: Piece[], black: Piece[] }>({ white: [], black: [] });
  const [gameStatus, setGameStatus] = useState<'playing' | 'check' | 'checkmate' | 'stalemate'>('playing');
  const [score, setScore] = useState<{ white: number; black: number }>({ white: 0, black: 0 });
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [robotMessage, setRobotMessage] = useState("I'm Saptash! I play at your level. Let's begin!");
  const [lastMove, setLastMove] = useState<{ from: Position; to: Position } | null>(null);

  // AI Robot - Saptash
  const makeAIMove = useCallback(() => {
    setIsAIThinking(true);
    setRobotMessage("Thinking... 🤔");
    
    setTimeout(() => {
      const allMoves: { from: Position; to: Position; score: number }[] = [];
      
      // Generate all possible moves for black pieces
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (piece && piece.color === 'black') {
            const moves = getValidMoves({ row, col }, board);
            moves.forEach(to => {
              const moveScore = evaluateMove({ row, col }, to, board);
              allMoves.push({ from: { row, col }, to, score: moveScore });
            });
          }
        }
      }
      
      if (allMoves.length > 0) {
        // Sort moves by score and add some randomness for "human-like" play
        allMoves.sort((a, b) => b.score - a.score);
        const topMoves = allMoves.slice(0, Math.min(3, allMoves.length));
        const selectedMove = topMoves[Math.floor(Math.random() * topMoves.length)];
        
        makeMove(selectedMove.from, selectedMove.to);
        setRobotMessage(getRandomTaunt());
      }
      
      setIsAIThinking(false);
    }, 1500);
  }, [board]);

  const getRandomTaunt = () => {
    const taunts = [
      "Nice move! But I have a better one! 😉",
      "I see what you're doing... counter! 🎯",
      "Interesting strategy! Let me respond... 💭",
      "You're playing well! This will be tough! 🤝",
      "I love this position! So many possibilities! ✨",
      "Your move surprised me! Well played! 👏",
      "Time to show you what I've learned! 🚀",
      "This is getting exciting! Bring it on! 🔥"
    ];
    return taunts[Math.floor(Math.random() * taunts.length)];
  };

  const evaluateMove = (from: Position, to: Position, boardState: Piece[][]): number => {
    const piece = boardState[from.row][from.col];
    if (!piece) return 0;
    const targetPiece = boardState[to.row][to.col];
    let score = Math.random() * 10; // Add randomness
    
    // Capture value
    if (targetPiece) {
      const pieceValues: Record<PieceType, number> = {
        pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: 100
      };
      score += pieceValues[targetPiece.type] * 10;
    }
    
    // Center control bonus
    const centerDistance = Math.abs(3.5 - to.row) + Math.abs(3.5 - to.col);
    score += (7 - centerDistance) * 2;
    
    // Development bonus for knights and bishops
    if (piece && (piece.type === 'knight' || piece.type === 'bishop')) {
      if (from.row > 4) score += 5;
    }
    
    return score;
  };

  const getValidMoves = (position: Position, boardState: Piece[][]): Position[] => {
    const piece = boardState[position.row][position.col];
    if (!piece) return [];
    
    const moves: Position[] = [];
    const { row, col } = position;
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Move forward one square
        if (row + direction >= 0 && row + direction < 8 && !boardState[row + direction][col]) {
          moves.push({ row: row + direction, col });
          
          // Move forward two squares from starting position
          if (row === startRow && !boardState[row + 2 * direction][col]) {
            moves.push({ row: row + 2 * direction, col });
          }
        }
        
        // Capture diagonally
        [-1, 1].forEach(dc => {
          const newCol = col + dc;
          const newRow = row + direction;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const target = boardState[newRow][newCol];
            if (target && target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
        break;
        
      case 'knight':
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        knightMoves.forEach(([dr, dc]) => {
          const newRow = row + dr;
          const newCol = col + dc;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const target = boardState[newRow][newCol];
            if (!target || target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
        break;
        
      case 'bishop':
        [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const target = boardState[newRow][newCol];
            if (!target) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (target.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        });
        break;
        
      case 'rook':
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const target = boardState[newRow][newCol];
            if (!target) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (target.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        });
        break;
        
      case 'queen':
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            const newRow = row + dr * i;
            const newCol = col + dc * i;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
            
            const target = boardState[newRow][newCol];
            if (!target) {
              moves.push({ row: newRow, col: newCol });
            } else {
              if (target.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
              }
              break;
            }
          }
        });
        break;
        
      case 'king':
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([dr, dc]) => {
          const newRow = row + dr;
          const newCol = col + dc;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const target = boardState[newRow][newCol];
            if (!target || target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
        break;
    }
    
    return moves;
  };

  const makeMove = (from: Position, to: Position) => {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[from.row][from.col];
    if (!piece) return;
    const capturedPiece = newBoard[to.row][to.col];
    
    // Handle capture
    if (capturedPiece) {
      const newCaptured = { ...capturedPieces };
      if (capturedPiece.color === 'white') {
        newCaptured.black.push(capturedPiece);
        setScore(prev => ({ ...prev, black: prev.black + getPieceValue(capturedPiece.type) }));
      } else {
        newCaptured.white.push(capturedPiece);
        setScore(prev => ({ ...prev, white: prev.white + getPieceValue(capturedPiece.type) }));
      }
      setCapturedPieces(newCaptured);
    }
    
    // Make the move
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;
    
    // Add to move history
    const moveNotation = getMoveNotation(from, to, piece, capturedPiece);
    setMoveHistory(prev => [...prev, moveNotation]);
    
    setBoard(newBoard);
    setLastMove({ from, to });
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  const getPieceValue = (type: PieceType): number => {
    const values: Record<PieceType, number> = {
      pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: 0
    };
    return values[type];
  };

  const getMoveNotation = (from: Position, to: Position, piece: Piece, captured: Piece | null): string => {
    if (!piece) return '';
    const files = 'abcdefgh';
    const ranks = '87654321';
    const pieceSymbol = piece.type === 'pawn' ? '' : piece.type[0].toUpperCase();
    const captureSymbol = captured ? 'x' : '';
    return `${pieceSymbol}${files[from.col]}${ranks[from.row]}${captureSymbol}${files[to.col]}${ranks[to.row]}`;
  };

  const handleSquareClick = (row: number, col: number) => {
    if (currentPlayer === 'black' || isAIThinking) return;
    
    if (selectedSquare) {
      const isValidMove = possibleMoves.some(move => move.row === row && move.col === col);
      if (isValidMove) {
        makeMove(selectedSquare, { row, col });
      } else {
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
    } else {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare({ row, col });
        setPossibleMoves(getValidMoves({ row, col }, board));
      }
    }
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setPossibleMoves([]);
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    setGameStatus('playing');
    setScore({ white: 0, black: 0 });
    setRobotMessage("New game! I'm ready when you are! 🎯");
    setLastMove(null);
  };

  // Trigger AI move after player's move
  useEffect(() => {
    if (currentPlayer === 'black' && gameStatus === 'playing') {
      makeAIMove();
    }
  }, [currentPlayer, gameStatus, makeAIMove]);

  const renderSquare = (row: number, col: number, currentBoard: Piece[][]) => {
    const isLight = (row + col) % 2 === 0;
    
    // Safety check to prevent undefined access
    if (!currentBoard || !currentBoard[row] || currentBoard[row][col] === undefined) {
      return null;
    }
    
    const piece = currentBoard[row][col];
    const isSelected = selectedSquare?.row === row && selectedSquare?.col === col;
    const isPossibleMove = possibleMoves.some(move => move.row === row && move.col === col);
    const isLastMoveFrom = lastMove?.from.row === row && lastMove?.from.col === col;
    const isLastMoveTo = lastMove?.to.row === row && lastMove?.to.col === col;
    
    return (
      <motion.div
        key={`${row}-${col}`}
        className={`relative w-full h-full flex items-center justify-center cursor-pointer transition-all ${
          isLight ? "bg-amber-100 hover:bg-amber-200" : "bg-amber-800 hover:bg-amber-700"
        } ${isSelected ? "ring-4 ring-blue-500" : ""} ${isPossibleMove ? "ring-2 ring-green-400" : ""} ${
          isLastMoveFrom || isLastMoveTo ? "ring-2 ring-yellow-400" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSquareClick(row, col)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: (row * 8 + col) * 0.02 }}
      >
        {/* Coordinates */}
        {col === 0 && (
          <span className={`absolute left-1 top-1 text-[10px] font-bold ${isLight ? "text-amber-800" : "text-amber-100"}`}>
            {8 - row}
          </span>
        )}
        {row === 7 && (
          <span className={`absolute right-1 bottom-1 text-[10px] font-bold ${isLight ? "text-amber-800" : "text-amber-100"}`}>
            {String.fromCharCode(97 + col)}
          </span>
        )}
        
        {/* Chess piece */}
        {piece && (
          <motion.div
            className="text-4xl md:text-5xl select-none relative z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ 
              textShadow: piece.color === 'white' 
                ? '2px 2px 4px rgba(0,0,0,0.8)' 
                : '2px 2px 4px rgba(255,255,255,0.8)' 
            }}
          >
            {PIECE_SYMBOLS[piece.color][piece.type]}
          </motion.div>
        )}
        
        {/* Possible move indicator with directional arrow */}
        {isPossibleMove && (
          <motion.div
            className="absolute inset-0 bg-green-500/30 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Calculate arrow direction based on selected piece position */}
            {(() => {
              if (!selectedSquare) return null;
              const rowDiff = row - selectedSquare.row;
              const colDiff = col - selectedSquare.col;
              const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff) && rowDiff !== 0;
              const isStraight = rowDiff === 0 || colDiff === 0;
              
              if (isDiagonal || isStraight) {
                // Calculate rotation angle for arrow
                let rotation = 0;
                if (rowDiff > 0 && colDiff === 0) rotation = 90;  // Down
                else if (rowDiff < 0 && colDiff === 0) rotation = -90; // Up
                else if (rowDiff === 0 && colDiff > 0) rotation = 0;  // Right
                else if (rowDiff === 0 && colDiff < 0) rotation = 180; // Left
                else if (rowDiff > 0 && colDiff > 0) rotation = 45;   // Down-Right
                else if (rowDiff > 0 && colDiff < 0) rotation = 135;  // Down-Left
                else if (rowDiff < 0 && colDiff > 0) rotation = -45;  // Up-Right
                else if (rowDiff < 0 && colDiff < 0) rotation = -135; // Up-Left
                
                return (
                  <motion.div
                    className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    animate={{ rotate: [rotation - 10, rotation + 10, rotation] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div 
                      className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-green-600 border-t-transparent border-b-transparent"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                  </motion.div>
                );
              }
              
              // For knight moves (L-shaped), show a simple dot
              return <div className="w-3 h-3 bg-green-500 rounded-full" />;
            })()}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Game Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 justify-center mb-4"
        >
          <Brain className="w-6 h-6 text-purple-500" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Chess vs Saptash AI
          </h3>
          <Crown className="w-6 h-6 text-yellow-500" />
        </motion.div>
        
        {/* Robot Message */}
        <AnimatePresence>
          {robotMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300 rounded-lg px-4 py-2 max-w-md"
            >
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                🤖 {robotMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Score Board */}
      <div className="flex gap-8 items-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">You (White)</p>
          <p className="text-2xl font-bold text-blue-600">{score.white}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Saptash (Black)</p>
          <p className="text-2xl font-bold text-red-600">{score.black}</p>
        </div>
      </div>

      {/* Chess Board */}
      <div className="relative">
        <motion.div 
          className="grid grid-cols-8 w-72 h-72 md:w-80 md:h-80 border-4 border-amber-900 rounded-lg overflow-hidden shadow-2xl"
          initial={{ rotateY: -90, scale: 0.8 }}
          animate={{ rotateY: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => renderSquare(row, col, board))
          )}
        </motion.div>
        
        {/* AI Thinking Overlay */}
        <AnimatePresence>
          {isAIThinking && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="bg-purple-600 text-white p-4 rounded-lg"
              >
                <Brain className="w-8 h-8" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Controls */}
      <div className="flex gap-4 items-center">
        <motion.button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </motion.button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Current Turn: <span className={`font-bold ${currentPlayer === 'white' ? 'text-blue-600' : 'text-red-600'}`}>
              {currentPlayer === 'white' ? 'Your' : "Saptash's"} Move
            </span>
          </p>
        </div>
      </div>

      {/* Captured Pieces */}
      {(capturedPieces.white.length > 0 || capturedPieces.black.length > 0) && (
        <div className="flex gap-8 text-2xl">
          <div>
            <p className="text-sm text-muted-foreground mb-2">You captured:</p>
            <div className="flex gap-1">
              {capturedPieces.black.map((piece, i) => {
                if (!piece) return null;
                return (
                  <span key={i} className="text-black">
                    {PIECE_SYMBOLS[piece.color][piece.type]}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Saptash captured:</p>
            <div className="flex gap-1">
              {capturedPieces.white.map((piece, i) => {
                if (!piece) return null;
                return (
                  <span key={i} className="text-white">
                    {PIECE_SYMBOLS[piece.color][piece.type]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Hobbies = () => {
  const [activeHobby, setActiveHobby] = useState<string>("coding");
  const router = useRouter();

  const hobbies = [
    {
      id: "coding",
      title: "Scoder",
      description: "Building digital worlds with code",
      icon: Code,
      color: "from-blue-500 to-cyan-600",
      content: <CodeEditor />,
    },
    {
      id: "chess",
      title: "Geek Winner",
      description: "Strategic warfare on 64 squares",
      icon: Trophy,
      color: "from-purple-500 to-pink-600",
      content: <ChessGameComponent />,
      onClick: () => router.push('/chess'),
    },
    {
      id: "typing",
      title: "Type Like Crazy",
      description: "Type faster than humanly possible",
      icon: Volume2,
      color: "from-yellow-500 to-red-600",
      content: <FastTyping />,
    },
    {
      id: "software-rant",
      title: "Be a AI and Rant just like I do",
      description: "AI that rants about dev nightmares",
      icon: Volume2,
      color: "from-red-500 to-orange-600",
      content: <SoftwareRantAI />,
    },
  ];

  const activeHobbyData = hobbies.find((h) => h.id === activeHobby) || hobbies[0];

  return (
    <section id="hobbies" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Passions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When I&apos;m not shipping features, you&apos;ll find me here...
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hobby List */}
          <div className="lg:col-span-1 space-y-3">
            {hobbies.map((hobby, index) => (
              <motion.button
                key={hobby.id}
                onClick={() => {
                  if (hobby.id === 'chess') {
                    router.push('/chess');
                  } else {
                    setActiveHobby(hobby.id);
                  }
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                  activeHobby === hobby.id
                    ? `bg-gradient-to-r ${hobby.color} text-white shadow-lg`
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                <hobby.icon className={`w-5 h-5 ${activeHobby === hobby.id ? "text-white" : "text-muted-foreground"}`} />
                <div className="text-left flex-1">
                  <h3 className="font-semibold">{hobby.title}</h3>
                  <p className={`text-xs ${activeHobby === hobby.id ? "text-white/80" : "text-muted-foreground"}`}>
                    {hobby.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active Hobby Display */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHobby}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                data-coding-master="section"
                className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl h-full flex flex-col items-center justify-center min-h-[500px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeHobbyData.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <activeHobbyData.icon className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold mb-2"
                  data-coding-master="title"
                >
                  {activeHobbyData.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-8"
                  data-coding-master="description"
                >
                  {activeHobbyData.description}
                </motion.p>

                <div data-coding-master="container">
                  {activeHobbyData.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
