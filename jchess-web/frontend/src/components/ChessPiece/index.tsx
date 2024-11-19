import React from 'react';
import styled from 'styled-components';
import { PieceType, PieceColor } from '../../types/game';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
}

const PieceImage = styled.img`
  width: 60px;
  height: 60px;
  user-select: none;
  -webkit-user-drag: none;
`;

const ChessPiece: React.FC<ChessPieceProps> = ({ type, color }) => {
  const getPieceImage = () => {
    const pieceType = type.toLowerCase();
    const pieceColor = color.toLowerCase();
    return `/assets/pieces/${pieceColor}_${pieceType}.svg`;
  };

  return (
    <PieceImage
      src={getPieceImage()}
      alt={`${color} ${type}`}
      draggable={false}
    />
  );
};

export default ChessPiece;
