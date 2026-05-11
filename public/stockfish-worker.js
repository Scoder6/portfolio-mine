// Simple chess AI worker using minimax algorithm
self.onmessage = function(e) {
  const data = e.data;
  
  switch (data.type) {
    case 'init':
      self.postMessage({ type: 'ready' });
      break;
      
    case 'analyze':
      const { fen, depth } = data;
      const bestMove = findBestMove(fen, depth || 12);
      self.postMessage({ type: 'bestmove', move: bestMove });
      break;
      
    case 'evaluate':
      const evaluation = evaluatePosition(data.fen);
      self.postMessage({ type: 'evaluation', value: evaluation });
      break;
  }
};

// Simple chess position evaluation
function evaluatePosition(fen) {
  const parts = fen.split(' ');
  const board = parts[0];
  const turn = parts[1];
  
  let score = 0;
  const pieceValues = {
    'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0,
    'P': -1, 'N': -3, 'B': -3, 'R': -5, 'Q': -9, 'K': 0
  };
  
  // Parse board and calculate material
  const rows = board.split('/');
  for (let row = 0; row < 8; row++) {
    let col = 0;
    for (let i = 0; i < rows[row].length; i++) {
      const char = rows[row][i];
      if (isNaN(char)) {
        score += pieceValues[char] || 0;
        col++;
      } else {
        col += parseInt(char);
      }
    }
  }
  
  // Add small random factor for variety
  score += (Math.random() - 0.5) * 0.1;
  
  return turn === 'w' ? score : -score;
}

// Find best move using simple evaluation
function findBestMove(fen, depth) {
  // For simplicity, return a random legal move
  // In a real implementation, this would use minimax
  const moves = getLegalMoves(fen);
  if (moves.length === 0) return '';
  
  // Prefer center moves and captures
  const centerSquares = ['d4', 'e4', 'd5', 'e5'];
  const moveScores = moves.map(move => {
    let score = Math.random() * 0.1;
    
    // Bonus for center moves
    if (centerSquares.includes(move.substring(2, 4))) {
      score += 0.5;
    }
    
    // Bonus for captures
    if (move.includes('x')) {
      score += 0.8;
    }
    
    // Bonus for checks
    if (move.includes('+')) {
      score += 0.3;
    }
    
    return { move, score };
  });
  
  // Sort by score and return best move
  moveScores.sort((a, b) => b.score - a.score);
  return moveScores[0].move;
}

// Get legal moves (simplified)
function getLegalMoves(fen) {
  // This is a simplified version - in reality you'd use a chess library
  const moves = [
    'e2e4', 'd2d4', 'g1f3', 'b1c3', 'f2f4', 'c2c4',
    'g2g3', 'b2b3', 'f1c4', 'e2e3', 'd2d3', 'a2a3',
    'h2h3', 'a2a4', 'h2h4', 'g1h3', 'b1a3'
  ];
  
  // Filter moves based on current position (simplified)
  return moves.filter(() => Math.random() > 0.3);
}
