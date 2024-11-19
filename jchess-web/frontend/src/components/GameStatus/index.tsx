import React from 'react';
import styled from 'styled-components';
import { PieceColor, GameStatus as GameStatusType } from '../../types/game';

interface GameStatusProps {
  currentPlayer: PieceColor;
  status: GameStatusType;
}

const StatusContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatusText = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
`;

const PlayerTurn = styled.div<{ isWhite: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.isWhite ? '#000' : '#666'};
  font-weight: bold;
`;

const GameStatus: React.FC<GameStatusProps> = ({ currentPlayer, status }) => {
  return (
    <StatusContainer>
      <StatusText>Game Status: {status}</StatusText>
      <PlayerTurn isWhite={currentPlayer === 'WHITE'}>
        Current Turn: {currentPlayer}
      </PlayerTurn>
    </StatusContainer>
  );
};

export default GameStatus;
