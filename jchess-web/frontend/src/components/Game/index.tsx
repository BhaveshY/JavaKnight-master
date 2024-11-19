import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChessBoard from '../ChessBoard';
import GameStatusComponent from '../GameStatus';
import MoveHistory from '../MoveHistory';
import { useWebSocket } from '../../hooks/useWebSocket';
import { GameState, Position } from '../../types/chess';

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
  currentTurn: 'WHITE',
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

  // Fetch initial game state
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}`);
        if (response.ok) {
          const game = await response.json();
          setGameState(game);
        }
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };
    fetchGame();
  }, [gameId]);

  // Handle WebSocket messages
  useEffect(() => {
    if (lastMessage?.body) {
      try {
        const gameStateData = JSON.parse(lastMessage.body) as GameState;
        console.log('Received game state:', gameStateData);
        setGameState(gameStateData);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  const handleMove = (from: Position, to: Position) => {
    sendMessage({
      destination: `/app/games/${gameId}/move`,
      body: JSON.stringify({ from, to })
    });
  };

  return (
    <GameContainer>
      <GameContent>
        <ChessBoard
          board={gameState.board}
          onMove={handleMove}
          currentPlayer={gameState.currentTurn}
        />
      </GameContent>
      <SidePanel>
        <GameStatusComponent
          isCheck={gameState.isCheck}
          isCheckmate={gameState.isCheckmate}
          isStalemate={gameState.isStalemate}
          currentPlayer={gameState.currentTurn}
        />
        <MoveHistory moves={gameState.moves} />
      </SidePanel>
    </GameContainer>
  );
};

export default Game;
