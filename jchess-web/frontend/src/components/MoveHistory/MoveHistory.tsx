import React from 'react';
import styled from 'styled-components';
import { Move, PieceType } from '../../types/chess';

const HistoryContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
`;

const HistoryTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #1976d2;
`;

const MoveList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
`;

const MoveNumber = styled.span`
  color: #757575;
  font-weight: bold;
  padding-right: 1rem;
`;

const MoveText = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

interface Props {
  moves: Move[];
  onMoveClick?: (move: Move) => void;
}

const getPieceLetter = (type: PieceType): string => {
  switch (type) {
    case 'KING': return 'K';
    case 'QUEEN': return 'Q';
    case 'ROOK': return 'R';
    case 'BISHOP': return 'B';
    case 'KNIGHT': return 'N';
    case 'PAWN': return '';
  }
};

const getSquareNotation = (row: number, col: number): string => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  return `${files[col]}${ranks[row]}`;
};

const getMoveNotation = (move: Move): string => {
  if (move.isCastling) {
    return move.to.col > move.from.col ? 'O-O' : 'O-O-O';
  }

  let notation = '';
  
  // Add piece letter (except for pawns)
  notation += getPieceLetter(move.piece.type);
  
  // Add capture symbol
  if (move.isCapture) {
    if (move.piece.type === 'PAWN') {
      notation += getSquareNotation(move.from.row, move.from.col)[0];
    }
    notation += 'x';
  }
  
  // Add destination square
  notation += getSquareNotation(move.to.row, move.to.col);
  
  // Add promotion piece
  if (move.isPromotion && move.promotionPiece) {
    notation += `=${getPieceLetter(move.promotionPiece)}`;
  }
  
  return notation;
};

const MoveHistory: React.FC<Props> = ({ moves, onMoveClick }) => {
  const movesByTurn: [Move | null, Move | null][] = [];
  
  for (let i = 0; i < moves.length; i += 2) {
    movesByTurn.push([
      moves[i],
      i + 1 < moves.length ? moves[i + 1] : null
    ]);
  }

  return (
    <HistoryContainer>
      <HistoryTitle>Move History</HistoryTitle>
      <MoveList>
        {movesByTurn.map((turn, index) => (
          <React.Fragment key={index}>
            <MoveNumber>{index + 1}.</MoveNumber>
            <MoveText 
              onClick={() => turn[0] && onMoveClick?.(turn[0])}
            >
              {turn[0] ? getMoveNotation(turn[0]) : ''}
            </MoveText>
            <MoveText 
              onClick={() => turn[1] && onMoveClick?.(turn[1])}
            >
              {turn[1] ? getMoveNotation(turn[1]) : ''}
            </MoveText>
          </React.Fragment>
        ))}
      </MoveList>
    </HistoryContainer>
  );
};

export default MoveHistory;
