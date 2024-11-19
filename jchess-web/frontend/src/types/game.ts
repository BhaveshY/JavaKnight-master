import { Color, PieceType, Position, Move, GameState } from './chess';

export type { Color as PieceColor, PieceType, Position, Move, GameState };

export interface Piece {
  type: PieceType;
  color: Color;
}

export interface Square {
  piece: Piece | null;
}

export type Board = Array<Array<Piece | null>>;
