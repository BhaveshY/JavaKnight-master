import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Square from '../Square/Square';
import { useWebSocket } from '../../hooks/useWebSocket';
import { Position, Color, GameState } from '../../types/chess';
import { WebSocketMessage, GameStateData } from '../../types/websocket';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 600px;
  height: 600px;
  border: 2px solid #333;
`;

interface Props {
  gameId: string;
  playerColor: Color;
}

const ChessBoard: React.FC<Props> = ({ gameId, playerColor }) => {
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [board, setBoard] = useState<GameState['board']>(Array(8).fill(null).map(() => Array(8).fill(null)));
  const { sendMessage, lastMessage } = useWebSocket(gameId);

  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.body || '');
        if (message.type === 'GAME_STATE') {
          const gameStateData = message.data as GameStateData;
          setBoard(gameStateData.board);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]);

  const handleSquareClick = (position: Position) => {
    if (!selectedSquare) {
      setSelectedSquare(position);
    } else {
      const message: WebSocketMessage = {
        type: 'MOVE',
        data: {
          from: selectedSquare,
          to: position,
        },
      };
      sendMessage(message);
      setSelectedSquare(null);
    }
  };

  return (
    <BoardContainer>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
          
          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              isLight={isLight}
              isSelected={isSelected}
              piece={piece}
              position={{ row: rowIndex, col: colIndex }}
              onClick={() => handleSquareClick({ row: rowIndex, col: colIndex })}
            />
          );
        })
      )}
    </BoardContainer>
  );
};

export default ChessBoard;
