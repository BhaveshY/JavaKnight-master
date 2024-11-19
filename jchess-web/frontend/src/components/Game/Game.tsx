import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChessBoard from '../ChessBoard/ChessBoard';
import GameStatus from '../GameStatus/GameStatus';
import MoveHistory from '../MoveHistory/MoveHistory';
import { useWebSocket } from '../../hooks/useWebSocket';
import { GameState, Move, Color } from '../../types/chess';
import { WebSocketMessage, ViewPositionData, GameStateData } from '../../types/websocket';

const GameContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BoardSection = styled.div`
  flex: 0 0 600px;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface Props {
  gameId: string;
  playerColor: Color;
}

const initialGameState: GameState = {
  id: '',
  board: Array(8).fill(null).map(() => Array(8).fill(null)),
  currentTurn: 'WHITE',
  isCheck: false,
  isCheckmate: false,
  isStalemate: false,
  moves: [],
  whitePlayer: '',
  blackPlayer: '',
};

const Game: React.FC<Props> = ({ gameId, playerColor }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { sendMessage, lastMessage } = useWebSocket(gameId);

  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.body || '');
        if (message.type === 'GAME_STATE') {
          const gameStateData = message.data as GameStateData;
          setGameState(gameStateData);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  const handleMoveClick = (move: Move) => {
    const message: WebSocketMessage = {
      type: 'VIEW_POSITION',
      data: {
        moveIndex: gameState.moves.indexOf(move),
      } as ViewPositionData,
    };
    sendMessage(message);
  };

  return (
    <GameContainer>
      <BoardSection>
        <ChessBoard
          gameId={gameId}
          playerColor={playerColor}
        />
      </BoardSection>
      <InfoSection>
        <GameStatus gameState={gameState} />
        <MoveHistory
          moves={gameState.moves}
          onMoveClick={handleMoveClick}
        />
      </InfoSection>
    </GameContainer>
  );
};

export default Game;
