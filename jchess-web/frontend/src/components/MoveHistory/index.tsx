import React from 'react';
import styled from 'styled-components';

interface MoveHistoryProps {
  moves: string[];
}

const HistoryContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const MoveList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MoveItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  font-family: monospace;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  return (
    <HistoryContainer>
      <Title>Move History</Title>
      <MoveList>
        {moves.map((move, index) => (
          <MoveItem key={index}>
            {Math.floor(index / 2) + 1}. {move}
          </MoveItem>
        ))}
      </MoveList>
    </HistoryContainer>
  );
};

export default MoveHistory;
