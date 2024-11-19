import React, { useEffect } from 'react';
import styled from 'styled-components';
import Square from '../Square';
import ChessPiece from '../ChessPiece';
import { Color, Position } from '../../types/chess';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 640px;
  height: 640px;
  border: 2px solid #333;
`;

interface Props {
  board: Array<Array<{ type: string; color: Color; } | null>>;
  currentPlayer: Color;
  onMove: (from: Position, to: Position) => void;
}

const ChessBoard: React.FC<Props> = ({ board, currentPlayer, onMove }) => {
  const [selectedSquare, setSelectedSquare] = React.useState<Position | null>(null);

  const handleSquareClick = (position: Position) => {
    if (!selectedSquare) {
      const piece = board[position.row][position.col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare(position);
      }
    } else {
      onMove(selectedSquare, position);
      setSelectedSquare(null);
    }
  };

  const renderSquare = (rowIndex: number, colIndex: number, piece: { type: string; color: Color; } | null) => {
    const position: Position = { row: rowIndex, col: colIndex };
    const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
    const isLight = (rowIndex + colIndex) % 2 === 0;

    return (
      <Square
        key={`${rowIndex}-${colIndex}`}
        isLight={isLight}
        isSelected={isSelected}
        onClick={() => handleSquareClick(position)}
      >
        {piece && (
          <ChessPiece
            type={piece.type}
            color={piece.color}
          />
        )}
      </Square>
    );
  };

  return (
    <BoardContainer>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => renderSquare(rowIndex, colIndex, piece))
      )}
    </BoardContainer>
  );
};

export default ChessBoard;
