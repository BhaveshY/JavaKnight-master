export type PieceType = 'KING' | 'QUEEN' | 'ROOK' | 'BISHOP' | 'KNIGHT' | 'PAWN';
export type PieceColor = 'WHITE' | 'BLACK';
export type GameStatus = 'WAITING' | 'IN_PROGRESS' | 'CHECK' | 'CHECKMATE' | 'DRAW';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  piece: Piece | null;
}

export interface Board {
  [key: string]: Square;
}

export interface GameState {
  board: Board;
  currentPlayer: PieceColor;
  moves: string[];
  status: GameStatus;
}
