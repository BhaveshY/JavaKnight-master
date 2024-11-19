export type PieceType = 'PAWN' | 'KNIGHT' | 'BISHOP' | 'ROOK' | 'QUEEN' | 'KING';
export type Color = 'WHITE' | 'BLACK';

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  piece: {
    type: PieceType;
    color: Color;
  };
  isCapture: boolean;
  isCastling: boolean;
  isEnPassant: boolean;
  isPromotion: boolean;
  promotionPiece?: PieceType;
}

export interface GameState {
  id: string;
  board: Array<Array<{ type: PieceType; color: Color } | null>>;
  currentTurn: Color;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  moves: Move[];
  whitePlayer: string;
  blackPlayer: string;
}
