import React, { useEffect } from 'react';
import styled from 'styled-components';
import Square from '../Square';
import ChessPiece from '../ChessPiece';
import { Board } from '../../types/game';
import { WebSocketMessage, GameStateData, IMessage } from '../../types/websocket';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 600px;
  height: 600px;
  border: 2px solid #333;
`;

interface ChessBoardProps {
  onMove: (from: string, to: string) => void;
  board: Board;
  lastMessage: IMessage | null;
  setBoard: (board: Board) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ onMove, board, lastMessage, setBoard }) => {
  const [selectedSquare, setSelectedSquare] = React.useState<string | null>(null);

  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage.data) as WebSocketMessage;
        if (message.type === 'GAME_STATE') {
          const gameStateData = message.data as GameStateData;
          setBoard(gameStateData.board as Board);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage, setBoard]);

  const handleSquareClick = (square: string) => {
    if (!selectedSquare) {
      // First click - select the piece
      if (board[square]?.piece) {
        setSelectedSquare(square);
      }
    } else {
      // Second click - attempt to move
      onMove(selectedSquare, square);
      setSelectedSquare(null);
    }
  };

  const renderSquare = (i: number) => {
    const file = String.fromCharCode(97 + (i % 8)); // a-h
    const rank = 8 - Math.floor(i / 8); // 1-8
    const squareId = `${file}${rank}`;
    const square = board[squareId];
    const isSelected = selectedSquare === squareId;
    const isLight = (Math.floor(i / 8) + (i % 8)) % 2 === 0;

    return (
      <Square
        key={squareId}
        isLight={isLight}
        isSelected={isSelected}
        onClick={() => handleSquareClick(squareId)}
      >
        {square?.piece && (
          <ChessPiece
            type={square.piece.type}
            color={square.piece.color}
          />
        )}
      </Square>
    );
  };

  return (
    <BoardContainer>
      {Array(64).fill(null).map((_, i) => renderSquare(i))}
    </BoardContainer>
  );
};

export default ChessBoard;
