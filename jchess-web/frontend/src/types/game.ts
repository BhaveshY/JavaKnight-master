export type PieceType = 'KING' | 'QUEEN' | 'ROOK' | 'BISHOP' | 'KNIGHT' | 'PAWN';
export type PieceColor = 'WHITE' | 'BLACK';
export type GameStatus = 'WAITING' | 'IN_PROGRESS' | 'CHECK' | 'CHECKMATE' | 'DRAW';

export interface Position {
  row: number;
  col: number;
}

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  piece: Piece | null;
}

export type Board = Array<Array<Piece | null>>;

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  isCapture: boolean;
  isCastling: boolean;
  isEnPassant: boolean;
  isPromotion: boolean;
  promotionPiece?: PieceType;
}

export interface GameState {
  id: string;
  board: Board;
  currentPlayer: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  moves: Move[];
  whitePlayer: string;
  blackPlayer: string;
}
