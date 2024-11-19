import React from 'react';
import styled from 'styled-components';
import { GameState } from '../../types/chess';

const StatusContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

interface Props {
  gameState: GameState;
}

const GameStatus: React.FC<Props> = ({ gameState }) => {
  const getStatusMessage = () => {
    if (gameState.isCheckmate) {
      return `Checkmate! ${gameState.currentTurn === 'WHITE' ? 'Black' : 'White'} wins!`;
    }
    if (gameState.isStalemate) {
      return 'Stalemate! Game is a draw.';
    }
    if (gameState.isCheck) {
      return `${gameState.currentTurn} is in check!`;
    }
    return `${gameState.currentTurn}'s turn`;
  };

  return (
    <StatusContainer>
      <h3>Game Status</h3>
      <p>{getStatusMessage()}</p>
    </StatusContainer>
  );
};

export default GameStatus;
