import React from 'react';
import styled from 'styled-components';
import { PieceColor } from '../../types/game';

interface Props {
  currentPlayer: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
}

const StatusContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatusText = styled.p<{ isAlert?: boolean }>`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: ${props => props.isAlert ? '#d32f2f' : '#333'};
  font-weight: ${props => props.isAlert ? 'bold' : 'normal'};
`;

const PlayerTurn = styled.div<{ isWhite: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.isWhite ? '#000' : '#666'};
  font-weight: bold;
`;

const GameStatus: React.FC<Props> = ({
  currentPlayer,
  isCheck,
  isCheckmate,
  isStalemate,
}) => {
  const getStatusMessage = () => {
    if (isCheckmate) {
      const winner = currentPlayer === 'WHITE' ? 'Black' : 'White';
      return `Checkmate! ${winner} wins!`;
    }
    if (isStalemate) {
      return 'Stalemate! The game is a draw.';
    }
    if (isCheck) {
      return `${currentPlayer} is in check!`;
    }
    return null;
  };

  const statusMessage = getStatusMessage();

  return (
    <StatusContainer>
      <PlayerTurn isWhite={currentPlayer === 'WHITE'}>
        Current Turn: {currentPlayer}
      </PlayerTurn>
      {statusMessage && (
        <StatusText isAlert={isCheck || isCheckmate}>
          {statusMessage}
        </StatusText>
      )}
    </StatusContainer>
  );
};

export default GameStatus;
