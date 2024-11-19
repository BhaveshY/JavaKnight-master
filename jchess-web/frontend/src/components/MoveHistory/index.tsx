import React from 'react';
import styled from 'styled-components';
import { Move } from '../../types/game';

interface Props {
  moves: Move[];
  onMoveClick?: (move: Move) => void;
}

const HistoryContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const MoveList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MoveItem = styled.li<{ isClickable: boolean }>`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  font-family: monospace;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.isClickable ? '#e0e0e0' : 'transparent'};
  }
`;

const formatPosition = (pos: { row: number; col: number }) => {
  const file = String.fromCharCode(97 + pos.col); // a-h
  const rank = 8 - pos.row; // 1-8
  return `${file}${rank}`;
};

const formatMove = (move: Move) => {
  const from = formatPosition(move.from);
  const to = formatPosition(move.to);
  let notation = `${move.piece.type.charAt(0)}${from}-${to}`;
  
  if (move.isCapture) notation += 'x';
  if (move.isCheck) notation += '+';
  if (move.isCheckmate) notation += '#';
  if (move.isCastling) {
    notation = move.from.col < move.to.col ? 'O-O' : 'O-O-O';
  }
  if (move.isPromotion && move.promotionPiece) {
    notation += `=${move.promotionPiece.charAt(0)}`;
  }
  
  return notation;
};

const MoveHistory: React.FC<Props> = ({ moves, onMoveClick }) => {
  return (
    <HistoryContainer>
      <Title>Move History</Title>
      <MoveList>
        {moves.map((move, index) => (
          <MoveItem
            key={index}
            isClickable={!!onMoveClick}
            onClick={() => onMoveClick?.(move)}
          >
            {Math.floor(index / 2) + 1}. {formatMove(move)}
          </MoveItem>
        ))}
      </MoveList>
    </HistoryContainer>
  );
};

export default MoveHistory;
