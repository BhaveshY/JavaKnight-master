import React from 'react';
import styled from 'styled-components';
import { PieceType, Color } from '../../types/chess';

const PieceImage = styled.img`
  width: 60px;
  height: 60px;
  user-select: none;
  -webkit-user-drag: none;
`;

interface Props {
  type: PieceType;
  color: Color;
}

const getPieceImage = (type: PieceType, color: Color): string => {
  const colorPrefix = color === 'WHITE' ? 'w' : 'b';
  const pieceMap: Record<PieceType, string> = {
    PAWN: 'p',
    KNIGHT: 'n',
    BISHOP: 'b',
    ROOK: 'r',
    QUEEN: 'q',
    KING: 'k'
  };
  
  return `/assets/pieces/${colorPrefix}${pieceMap[type]}.png`;
};

const ChessPiece: React.FC<Props> = ({ type, color }) => {
  return (
    <PieceImage
      src={getPieceImage(type, color)}
      alt={`${color.toLowerCase()} ${type.toLowerCase()}`}
      draggable={false}
    />
  );
};

export default ChessPiece;
