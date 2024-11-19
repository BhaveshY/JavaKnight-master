import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChessBoard from '../ChessBoard';
import GameStatusComponent from '../GameStatus';
import MoveHistory from '../MoveHistory';
import { useWebSocket } from '../../hooks/useWebSocket';
import { GameState, Board, PieceColor, Position } from '../../types/game';
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

const initialGameState: GameState = {
  id: '',
  board: Array(8).fill(null).map(() => Array(8).fill(null)),
  currentPlayer: 'WHITE',
  isCheck: false,
  isCheckmate: false,
  isStalemate: false,
  moves: [],
  whitePlayer: '',
  blackPlayer: '',
};

const Game: React.FC<GameProps> = ({ gameId }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { sendMessage, lastMessage } = useWebSocket(gameId);

  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.body || '') as WebSocketMessage;
        if (message.type === 'GAME_STATE') {
          const gameStateData = message.data as GameStateData;
          setGameState(gameStateData);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  const handleMove = (from: Position, to: Position) => {
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
          currentPlayer={gameState.currentPlayer}
        />
      </GameContent>
      <SidePanel>
        <GameStatusComponent
          isCheck={gameState.isCheck}
          isCheckmate={gameState.isCheckmate}
          isStalemate={gameState.isStalemate}
          currentPlayer={gameState.currentPlayer}
        />
        <MoveHistory moves={gameState.moves} />
      </SidePanel>
    </GameContainer>
  );
};

export default Game;
