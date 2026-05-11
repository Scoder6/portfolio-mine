import ChessGame from '@/components/chess/ChessGame';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ultimate Chess Challenge | Portfolio',
  description: 'Face the unbeatable AI in this advanced chess game. You play as Black, White always starts with e4.',
};

export default function ChessPage() {
  return <ChessGame />;
}
