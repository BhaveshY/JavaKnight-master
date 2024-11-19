import React from 'react';
import styled from 'styled-components';
import { PieceType, Color, Position } from '../../types/chess';
import ChessPiece from '../ChessPiece/ChessPiece';

interface SquareProps {
  isLight: boolean;
  isSelected: boolean;
}

const SquareContainer = styled.div<SquareProps>`
  width: 75px;
  height: 75px;
  background-color: ${props => 
    props.isSelected 
      ? '#bada55' 
      : props.isLight 
        ? '#f0d9b5' 
        : '#b58863'
  };
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  isLight: boolean;
  isSelected: boolean;
  piece: { type: PieceType; color: Color } | null;
  position: Position;
  onClick: () => void;
}

const Square: React.FC<Props> = ({ isLight, isSelected, piece, onClick }) => {
  return (
    <SquareContainer isLight={isLight} isSelected={isSelected} onClick={onClick}>
      {piece && <ChessPiece type={piece.type} color={piece.color} />}
    </SquareContainer>
  );
};

export default Square;
