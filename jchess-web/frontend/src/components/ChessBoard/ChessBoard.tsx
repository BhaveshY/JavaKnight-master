import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Square from '../Square/Square';
import { useWebSocket } from '../../hooks/useWebSocket';
import { PieceType, Color, Position } from '../../types/chess';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 600px;
  height: 600px;
  border: 2px solid #333;
`;

interface ChessBoardProps {
  gameId: string;
  playerColor: Color;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ gameId, playerColor }) => {
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [board, setBoard] = useState<Array<Array<{ type: PieceType; color: Color } | null>>>(
    Array(8).fill(null).map(() => Array(8).fill(null))
  );
  
  const { sendMessage, lastMessage } = useWebSocket(gameId);

  useEffect(() => {
    if (lastMessage) {
      const gameState = JSON.parse(lastMessage.data);
      setBoard(gameState.board);
    }
  }, [lastMessage]);

  const handleSquareClick = (position: Position) => {
    if (!selectedSquare) {
      // First click - select piece
      const piece = board[position.row][position.col];
      if (piece && piece.color === playerColor) {
        setSelectedSquare(position);
      }
    } else {
      // Second click - attempt move
      sendMessage({
        type: 'MOVE',
        data: {
          from: selectedSquare,
          to: position,
        },
      });
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
