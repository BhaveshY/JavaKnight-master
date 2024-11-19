import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChessBoard from '../ChessBoard';
import GameStatusComponent from '../GameStatus';
import MoveHistory from '../MoveHistory';
import { useWebSocket } from '../../hooks/useWebSocket';
import { GameState, Board, PieceColor, GameStatus as GameStatusType } from '../../types/game';
import { GameStateData, MoveData, WebSocketMessage } from '../../types/websocket';

const GameContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 300px;
`;

interface GameProps {
  gameId: string;
}

const Game: React.FC<GameProps> = ({ gameId }) => {
  const [gameState, setGameState] = useState<GameState>({
    board: {},
    currentPlayer: 'WHITE',
    moves: [],
    status: 'WAITING'
  });

  const { sendMessage, lastMessage } = useWebSocket(gameId);

  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.data) as WebSocketMessage;
        if (message.type === 'GAME_STATE') {
          const gameStateData = message.data as GameStateData;
          setGameState(prevState => ({
            ...prevState,
            board: gameStateData.board as Board,
            currentPlayer: gameStateData.currentPlayer as PieceColor,
            moves: gameStateData.moves,
            status: gameStateData.status as GameStatusType
          }));
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  const handleMove = (from: string, to: string) => {
    const moveData: MoveData = { from, to };
    sendMessage({
      type: 'MOVE',
      data: moveData
    });
  };

  return (
    <GameContainer>
      <GameContent>
        <ChessBoard
          board={gameState.board}
          onMove={handleMove}
          lastMessage={lastMessage}
          setBoard={(newBoard: Board) => setGameState(prev => ({ ...prev, board: newBoard }))}
        />
      </GameContent>
      <SidePanel>
        <GameStatusComponent
          currentPlayer={gameState.currentPlayer}
          status={gameState.status}
        />
        <MoveHistory moves={gameState.moves} />
      </SidePanel>
    </GameContainer>
  );
};

export default Game;
