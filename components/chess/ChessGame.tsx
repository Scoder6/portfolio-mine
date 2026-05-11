'use client';

import { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from '@/components/ui/button';
import { RotateCcw, Brain, User, Clock, Crown, Menu, Settings, Shield, Swords, Target, TrendingUp, Trophy, X, Zap } from 'lucide-react';
import { Switch } from '@radix-ui/react-switch';
import { useScreenSize } from '@/hooks/use-screen-size';

// Simple AI that plays reasonable moves


export default function ChessGame() {
  const screenSize = useScreenSize();
  const [game, setGame] = useState<Chess>(new Chess());
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [orientation, setOrientation] = useState<'white' | 'black'>('black');
  const [isBlackView, setIsBlackView] = useState(true);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw'>('playing');
  const [aiThinking, setAiThinking] = useState(false);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [evaluation, setEvaluation] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [gameStats, setGameStats] = useState({
    captures: { white: 0, black: 0 },
    checks: { white: 0, black: 0 },
    castling: { white: false, black: false }
  });
  
  // Click-to-move states
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  
  // Mobile sidebar states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Timer states
  const [whiteTime, setWhiteTime] = useState(180); // 3 minutes in seconds
  const [blackTime, setBlackTime] = useState(180); // 3 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stockfishRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize Stockfish worker
    if (typeof window !== 'undefined') {
      stockfishRef.current = new Worker('/stockfish-worker.js');
    }
    
    // AI makes first move immediately - e4
    setTimeout(() => {
      makeAiMove();
    }, 300);

    return () => {
      if (stockfishRef.current) {
        stockfishRef.current.terminate();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (timerActive && (gameStatus === 'playing' || gameStatus === 'check')) {
      timerRef.current = setInterval(() => {
        if (game.turn() === 'w') {
          setWhiteTime(prev => {
            const newTime = prev - 1;
            if (newTime <= 0) {
              setGameStatus('checkmate');
              setTimerActive(false);
            }
            return Math.max(0, newTime);
          });
        } else {
          setBlackTime(prev => {
            const newTime = prev - 1;
            if (newTime <= 0) {
              setGameStatus('checkmate');
              setTimerActive(false);
            }
            return Math.max(0, newTime);
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerActive, game.turn(), gameStatus]);

  useEffect(() => {
    setFen(game.fen());
    updateGameStatus();
    
    // Update evaluation
    if (stockfishRef.current) {
      setEvaluation(0);
    }
    
    // Start timer after AI's first move
    if (moveCount === 1 && gameStatus === 'playing') {
      setTimerActive(true);
    }
  }, [game]);

  const makeFirstMove = () => {
    const newGame = new Chess();
    const move = newGame.move('e4');
    if (move) {
      setGame(newGame);
      setMoveHistory(['1. e4']);
      setMoveCount(1);
      setLastMove({ from: move.from, to: move.to });
      setTimerActive(true);
    }
  };

  const updateGameStatus = () => {
    if (game.isCheckmate()) {
      setGameStatus('checkmate');
      setTimerActive(false);
    } else if (game.isStalemate()) {
      setGameStatus('stalemate');
      setTimerActive(false);
    } else if (game.isDraw()) {
      setGameStatus('draw');
      setTimerActive(false);
    } else if (game.isCheck()) {
      setGameStatus('check');
    } else {
      setGameStatus('playing');
    }
  };

  const makeMove = (sourceSquare: string, targetSquare: string, piece: string) => {
    // Prevent moves when AI is thinking or game is over
    if (aiThinking || gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw') {
      return false;
    }

    // Only allow black pieces to move (user plays black)
    if (piece[0] === 'w') {
      return false;
    }

    try {
      // Check if it's a pawn promotion move
      const isPromotion = piece[1] === 'p' && 
        (targetSquare[1] === '1' || targetSquare[1] === '8');
      
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: isPromotion ? 'q' : undefined
      });

      if (move) {
        setGame(new Chess(game.fen()));
        // Format move history for black's move (user plays black)
        const moveNumber = Math.floor(moveCount / 2) + 1;
        setMoveHistory(prev => [...prev, `${moveNumber}. ... ${move.san}`]);
        setMoveCount(prev => prev + 1);
        setLastMove({ from: move.from, to: move.to });
        
        // Update stats
        if (move.captured) {
          setGameStats(prev => ({
            ...prev,
            captures: { ...prev.captures, black: prev.captures.black + 1 }
          }));
        }
        
        if (game.inCheck()) {
          setGameStats(prev => ({
            ...prev,
            checks: { ...prev.checks, black: prev.checks.black + 1 }
          }));
        }

        // Trigger AI move after user's move
        setTimeout(() => {
          makeAiMove();
        }, 100);

        return true;
      }
    } catch (error) {
      console.error('Invalid move:', error);
    }

    return false;
  };

  // Handle square click for click-to-move
  const handleSquareClick = (square: string) => {
    // Prevent moves when AI is thinking or game is over
    if (aiThinking || gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw') {
      return;
    }

    // Must be black's turn (user plays black)
    if (game.turn() !== 'b') {
      return;
    }

    const piece = game.get(square as any);

    // If no square is selected and clicking on own piece, select it
    if (!selectedSquare) {
      if (piece && piece.color === 'b') {
        setSelectedSquare(square);
        // Get possible moves for this piece
        const moves = game.moves({ square: square as any, verbose: true });
        setPossibleMoves(moves.map(m => m.to));
      }
      return;
    }

    // If already selected a square
    if (selectedSquare) {
      // Clicking on same square deselects
      if (square === selectedSquare) {
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }

      // Try to make the move
      const moveResult = makeMove(selectedSquare, square, 'q');
      
      // Clear selection regardless of move success
      setSelectedSquare(null);
      setPossibleMoves([]);
      
      return;
    }
  };

  const getBestMoveUnbeatable = (chess: Chess): string => {
    const moves = chess.moves({ verbose: true });
    if (moves.length === 0) return '';
    
    let bestMove = moves[0];
    let bestScore = -Infinity;
    
    // Enhanced piece values
    const pieceValues: { [key: string]: number } = {
      p: 100, n: 320, b: 330, r: 510, q: 950, k: 10000
    };
    
    for (const move of moves) {
      const tempChess = new Chess(chess.fen());
      tempChess.move(move);
      
      let score = 0;
      
      // Checkmate is best
      if (tempChess.isCheckmate()) {
        return move.san;
      }
      
      // Check is good
      if (tempChess.inCheck()) {
        score += 100;
      }
      
      // Capture value
      if (move.captured) {
        score += pieceValues[move.captured] * 10;
      }
      
      // Central control
      const targetCol = move.to.charCodeAt(0) - 97;
      const targetRow = 8 - parseInt(move.to[1]);
      if (targetCol >= 2 && targetCol <= 5 && targetRow >= 2 && targetRow <= 5) {
        score += 30;
      }
      
      // King safety - keep king back early
      if (move.piece === 'k' && parseInt(move.to[1]) > 2) {
        score -= 50;
      }
      
      // Development bonus
      if (move.piece === 'n' || move.piece === 'b') {
        if (move.from[1] === '1' || move.from[1] === '8') {
          score += 40;
        }
      }
      
      // Attacking moves
      const targetSquare = move.to;
      const opponentMoves = tempChess.moves({ verbose: true }).filter(m => m.color !== move.color);
      for (const oppMove of opponentMoves) {
        if (oppMove.to === targetSquare) {
          score -= 20; // Don't move where opponent can capture
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return bestMove.san;
  };

  const makeAiMove = async () => {
    if (gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw') {
      return;
    }

    // AI only moves when it's white's turn
    if (game.turn() !== 'w') {
      return;
    }

    setAiThinking(true);

    try {
      // First move - AI plays white
      if (moveCount === 0) {
        try {
          // AI always plays white, so make white opening moves
          const whiteMoves = ['e4', 'd4', 'Nf3'];
          const randomWhiteMove = whiteMoves[Math.floor(Math.random() * whiteMoves.length)];
          const firstMove = game.move(randomWhiteMove);
          
          if (firstMove) {
            setGame(new Chess(game.fen()));
            const moveNotation = firstMove.san || 'e4';
            setMoveHistory([`1. ${moveNotation}`]);
            setMoveCount(1);
            setLastMove({ from: firstMove.from, to: firstMove.to });
            setTimerActive(true);
            setAiThinking(false);
            return;
          }
        } catch (error) {
          console.error('First move failed:', error);
          // Try basic pawn move as fallback
          try {
            const fallbackMove = game.move('e4');
            if (fallbackMove) {
              setGame(new Chess(game.fen()));
              const moveNotation = fallbackMove.san || 'e4';
              setMoveHistory([`1. ${moveNotation}`]);
              setMoveCount(1);
              setLastMove({ from: fallbackMove.from, to: fallbackMove.to });
              setTimerActive(true);
              setAiThinking(false);
            }
          } catch (fallbackError) {
            console.error('Fallback move also failed:', fallbackError);
            setAiThinking(false);
          }
        }
      }
      
      // Get unbeatable move
      const bestMove = getBestMoveUnbeatable(game);
      
      if (bestMove) {
        const move = game.move(bestMove);
        if (move) {
          setGame(new Chess(game.fen()));
          setMoveHistory(prev => {
            const newHistory = [...prev];
            if (prev.length % 2 === 0) {
              newHistory.push(`${Math.floor(moveCount / 2) + 1}. ${move.san}`);
            } else {
              newHistory[newHistory.length - 1] += ` ${move.san}`;
            }
            return newHistory;
          });
          setMoveCount(prev => prev + 1);
          setLastMove({ from: move.from, to: move.to });
          
          // Update stats
          if (move.captured) {
            setGameStats(prev => ({
              ...prev,
              captures: { ...prev.captures, white: prev.captures.white + 1 }
            }));
          }
          
          if (game.inCheck()) {
            setGameStats(prev => ({
              ...prev,
              checks: { ...prev.checks, white: prev.checks.white + 1 }
            }));
          }
        }
      }
    } catch (error) {
      console.error('AI move failed:', error);
    } finally {
      setAiThinking(false);
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setMoveHistory([]);
    setMoveCount(0);
    setGameStatus('playing');
    setLastMove(null);
    setAiThinking(false);
    setGameStats({
      captures: { white: 0, black: 0 },
      checks: { white: 0, black: 0 },
      castling: { white: false, black: false }
    });
    setWhiteTime(180);
    setBlackTime(180);
    setTimerActive(false);
    
    // AI makes first move immediately
    setTimeout(() => {
      makeAiMove();
    }, 500);
  };

  const toggleOrientation = () => {
    const newOrientation = orientation === 'white' ? 'black' : 'white';
    setOrientation(newOrientation);
    setIsBlackView(newOrientation === 'black');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'checkmate':
        return game.turn() === 'w' ? 'Black Wins! ♟️' : 'White Wins! ♔';
      case 'stalemate':
        return 'Stalemate - Draw';
      case 'draw':
        return 'Draw';
      case 'check':
        return 'Check!';
      default:
        return aiThinking ? 'AI is thinking...' : 'Your turn (Black)';
    }
  };

  const getStatusColor = () => {
    switch (gameStatus) {
      case 'checkmate':
        return game.turn() === 'w' ? 'text-green-600' : 'text-red-600';
      case 'check':
        return 'text-orange-600';
      default:
        return aiThinking ? 'text-blue-600' : 'text-gray-600';
    }
  };

  // Calculate chessboard size based on screen size
  const getBoardSize = () => {
    if (screenSize.isMobile) {
      return Math.min(screenSize.width - 32, 400);
    } else if (screenSize.isTablet) {
      return Math.min(screenSize.width - 64, 500);
    } else {
      return 600;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile Header with Menu Button */}
      {screenSize.isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold text-white">Chess Master</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="p-2 bg-slate-700/50 rounded-lg text-white hover:bg-slate-600/50 transition-colors"
            >
              {leftSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="p-2 bg-slate-700/50 rounded-lg text-white hover:bg-slate-600/50 transition-colors"
            >
              {rightSidebarOpen ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      <div className={`flex flex-col lg:flex-row h-auto min-h-screen ${
        screenSize.isMobile ? 'pb-20' : ''
      }`}>
        {/* Left Sidebar - Game Controls & Info */}
        <div className={`${
          screenSize.isMobile 
            ? `fixed inset-x-0 top-[65px] z-40 bg-slate-800/95 backdrop-blur-lg border-b border-purple-500/20 transition-all duration-300 overflow-y-auto ${
                leftSidebarOpen ? 'max-h-[calc(100vh-65px)] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`
            : 'w-full lg:w-72 xl:w-80 bg-slate-800/50 backdrop-blur-sm border-r border-purple-500/20'
        } p-4 lg:p-6`}>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Swords className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-bold text-white">Chess Master</h1>
            </div>
            <p className="text-purple-300 text-sm">Strategic warfare on 64 squares</p>
          </div>

          {/* Game Status */}
          <div className="mb-6">
            <div className={`rounded-xl p-4 border transition-all duration-300 ${
              gameStatus === 'checkmate' ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500/30' :
              gameStatus === 'check' ? 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-500/30' :
              aiThinking ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30' :
              'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30'
            }`}>
              <div className="text-center">
                <p className="text-white/80 text-sm mb-2 font-medium">Game Status</p>
                <p className={`text-xl font-bold ${getStatusColor()}`}>
                  {getStatusMessage()}
                </p>
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="mb-6">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4" />
              Controls
            </h4>
            <div className="space-y-3">
              <Button 
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-105"
                disabled={aiThinking}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Game
              </Button>
              
              <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 text-sm font-medium">Board View</span>
                  </div>
                  <Switch
                    checked={isBlackView}
                    onCheckedChange={toggleOrientation}
                  />
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  {isBlackView ? 'Black perspective' : 'White perspective'}
                </p>
              </div>
            </div>
          </div>

          {/* Game Statistics */}
          <div>
            <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4" />
              Statistics
            </h4>
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="bg-cyan-500/20 rounded-lg p-2 mb-2">
                    <Zap className="w-5 h-5 text-cyan-400 mx-auto" />
                  </div>
                  <p className="text-gray-400 text-xs">Total Moves</p>
                  <p className="text-white font-bold text-lg">{moveCount}</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/20 rounded-lg p-2 mb-2">
                    <Target className="w-5 h-5 text-purple-400 mx-auto" />
                  </div>
                  <p className="text-gray-400 text-xs">Captures</p>
                  <p className="text-white font-bold text-lg">{gameStats.captures.white + gameStats.captures.black}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Chess Board with Players Above and Below */}
        <div className={`flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800/50 to-purple-800/30 p-2 sm:p-4 ${
          screenSize.isMobile ? 'min-h-[calc(100vh-200px)]' : ''
        }`}>
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-2 sm:p-4 shadow-2xl border border-purple-500/20 w-full max-w-[min(100%,700px)]">
            
            {/* White Player (AI) - ABOVE BOARD */}
            <div className="mb-3">
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm rounded-xl p-3 border border-gray-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">Saptash AI</h3>
                      <p className="text-cyan-300 text-xs flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Master Level • White
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${whiteTime <= 10 ? 'text-red-400' : 'text-white'}`}>
                      {formatTime(whiteTime)}
                    </div>
                    <p className="text-gray-400 text-xs">Time Left</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="bg-gray-800/50 rounded-lg px-2 py-1 flex items-center gap-1">
                    <span className="text-gray-400 text-xs">Captures:</span>
                    <span className="text-white font-bold text-sm">{gameStats.captures.black}</span>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg px-2 py-1 flex items-center gap-1">
                    <span className="text-gray-400 text-xs">Checks:</span>
                    <span className="text-white font-bold text-sm">{gameStats.checks.black}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chess Board */}
            <div 
              className="relative mx-auto"
              style={{ 
                width: `${getBoardSize()}px`, 
                height: `${getBoardSize()}px`,
                maxWidth: '100%'
              }}
            >
              <Chessboard 
                options={{
                  position: fen,
                  onPieceDrop: ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
                    if (!sourceSquare || !targetSquare) return false;
                    return makeMove(sourceSquare, targetSquare, 'q');
                  },
                  boardOrientation: orientation,
                  onSquareClick: ({ square }: { square: string }) => {
                    handleSquareClick(square);
                  },
                  darkSquareStyle: { 
                    backgroundColor: '#1e293b'
                  },
                  lightSquareStyle: { 
                    backgroundColor: '#f1f5f9'
                  },
                  animationDurationInMs: 200
                }}
              />
              
              {gameStatus === 'check' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                  <div className="bg-red-600/90 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg border border-red-500">
                    <p className="font-bold text-base sm:text-lg flex items-center gap-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      CHECK!
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Black Player (User) - BELOW BOARD */}
            <div className="mt-3">
              <div className="bg-gradient-to-r from-purple-700/50 to-pink-600/50 backdrop-blur-sm rounded-xl p-3 border border-purple-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">You</h3>
                      <p className="text-purple-300 text-xs flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Human Player • Black
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${blackTime <= 10 ? 'text-red-400' : 'text-white'}`}>
                      {formatTime(blackTime)}
                    </div>
                    <p className="text-gray-400 text-xs">Time Left</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="bg-gray-800/50 rounded-lg px-2 py-1 flex items-center gap-1">
                    <span className="text-gray-400 text-xs">Captures:</span>
                    <span className="text-white font-bold text-sm">{gameStats.captures.white}</span>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg px-2 py-1 flex items-center gap-1">
                    <span className="text-gray-400 text-xs">Checks:</span>
                    <span className="text-white font-bold text-sm">{gameStats.checks.white}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Game Status Bar */}
            {screenSize.isMobile && (
              <div className="mt-4 flex items-center justify-between">
                <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  gameStatus === 'checkmate' ? 'bg-red-600/20 text-red-400' :
                  gameStatus === 'check' ? 'bg-orange-600/20 text-orange-400' :
                  aiThinking ? 'bg-blue-600/20 text-blue-400' :
                  'bg-green-600/20 text-green-400'
                }`}>
                  {getStatusMessage()}
                </div>
                <div className="flex items-center gap-2 text-white text-sm">
                  <span className={`${whiteTime <= 10 ? 'text-red-400' : ''}`}>
                    W: {formatTime(whiteTime)}
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className={`${blackTime <= 10 ? 'text-red-400' : ''}`}>
                    B: {formatTime(blackTime)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Game Info */}
        <div className={`${
          screenSize.isMobile 
            ? `fixed inset-x-0 bottom-0 z-40 bg-slate-800/95 backdrop-blur-lg border-t border-purple-500/20 transition-all duration-300 overflow-y-auto ${
                rightSidebarOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`
            : 'w-full lg:w-80 xl:w-96 bg-slate-800/50 backdrop-blur-sm border-l border-purple-500/20'
        } p-4 lg:p-6`}>
          {/* Timer & Move Counter */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-700/50 to-pink-600/50 backdrop-blur-sm rounded-xl p-4 border border-purple-600/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-300 text-sm font-medium">Game Progress</span>
                </div>
                <div className="bg-purple-800/50 px-2 py-1 rounded-full">
                  <span className="text-purple-200 text-xs font-bold">#{moveCount}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">White Time</p>
                  <p className={`text-xl font-bold ${whiteTime <= 10 ? 'text-red-400' : 'text-white'}`}>
                    {formatTime(whiteTime)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Black Time</p>
                  <p className={`text-xl font-bold ${blackTime <= 10 ? 'text-red-400' : 'text-white'}`}>
                    {formatTime(blackTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="mb-8">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Game Controls
            </h4>
            <div className="space-y-3">
              <Button 
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-105"
                disabled={aiThinking}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Game
              </Button>
              
              <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 text-sm font-medium">Board View</span>
                  </div>
                  <Switch
                    checked={isBlackView}
                    onCheckedChange={toggleOrientation}
                  />
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  {isBlackView ? 'Black perspective' : 'White perspective'}
                </p>
              </div>
            </div>
          </div>

          {/* Game Statistics */}
          <div className="mb-8">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Game Statistics
            </h4>
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="bg-cyan-500/20 rounded-lg p-3 mb-2">
                    <Zap className="w-6 h-6 text-cyan-400 mx-auto" />
                  </div>
                  <p className="text-gray-400 text-xs">Total Moves</p>
                  <p className="text-white font-bold text-lg">{moveCount}</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/20 rounded-lg p-3 mb-2">
                    <Target className="w-6 h-6 text-purple-400 mx-auto" />
                  </div>
                  <p className="text-gray-400 text-xs">Captures</p>
                  <p className="text-white font-bold text-lg">{gameStats.captures.white + gameStats.captures.black}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Move History */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Move History
            </h4>
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 h-64 overflow-y-auto border border-gray-600/30">
              {moveHistory.length > 0 ? (
                <div className="space-y-2">
                  {moveHistory.map((move, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-600/20">
                      <div className="text-sm font-mono text-gray-300 flex items-center justify-between">
                        <span>{move}</span>
                        {index % 2 === 1 && (
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-800/50 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Swords className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-gray-500 text-sm">No moves yet</p>
                  <p className="text-gray-600 text-xs mt-1">Game will start soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
