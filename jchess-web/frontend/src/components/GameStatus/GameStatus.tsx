import React from 'react';
import styled from 'styled-components';
import { Color, GameState } from '../../types/chess';

const StatusContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PlayerInfo = styled.div<{ isCurrentTurn: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: ${props => props.isCurrentTurn ? '#e3f2fd' : 'transparent'};
  border-radius: 4px;
  margin: 0.5rem 0;
`;

const StatusText = styled.div<{ isAlert?: boolean }>`
  color: ${props => props.isAlert ? '#d32f2f' : '#1976d2'};
  font-weight: ${props => props.isAlert ? 'bold' : 'normal'};
  margin-top: 0.5rem;
`;

interface Props {
  gameState: GameState;
}

const GameStatus: React.FC<Props> = ({ gameState }) => {
  const getStatusMessage = () => {
    if (gameState.isCheckmate) {
      const winner = gameState.currentTurn === 'WHITE' ? 'Black' : 'White';
      return `Checkmate! ${winner} wins!`;
    }
    if (gameState.isStalemate) {
      return 'Stalemate! The game is a draw.';
    }
    if (gameState.isCheck) {
      return `${gameState.currentTurn} is in check!`;
    }
    return `${gameState.currentTurn}'s turn`;
  };

  return (
    <StatusContainer>
      <PlayerInfo isCurrentTurn={gameState.currentTurn === 'WHITE'}>
        White: {gameState.whitePlayer}
        {gameState.currentTurn === 'WHITE' && ' (Current Turn)'}
      </PlayerInfo>
      
      <PlayerInfo isCurrentTurn={gameState.currentTurn === 'BLACK'}>
        Black: {gameState.blackPlayer}
        {gameState.currentTurn === 'BLACK' && ' (Current Turn)'}
      </PlayerInfo>

      <StatusText isAlert={gameState.isCheck || gameState.isCheckmate}>
        {getStatusMessage()}
      </StatusText>
    </StatusContainer>
  );
};

export default GameStatus;
