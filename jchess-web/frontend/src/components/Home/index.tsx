import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &.primary {
    background-color: #4a90e2;
    color: white;

    &:hover {
      background-color: #357abd;
    }
  }

  &.secondary {
    background-color: #f5f5f5;
    color: #333;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');
  const [error, setError] = useState('');

  const createNewGame = () => {
    const newGameId = Math.random().toString(36).substring(2, 8);
    navigate(`/game/${newGameId}/WHITE`);
  };

  const joinGame = () => {
    if (!gameId) {
      setError('Please enter a game ID');
      return;
    }
    navigate(`/game/${gameId}/BLACK`);
  };

  return (
    <HomeContainer>
      <Title>Java Knight Chess</Title>
      <Card>
        <Button className="primary" onClick={createNewGame}>
          Create New Game
        </Button>
        <div style={{ margin: '1rem 0', textAlign: 'center' }}>or</div>
        <Input
          type="text"
          placeholder="Enter Game ID"
          value={gameId}
          onChange={(e) => {
            setGameId(e.target.value);
            setError('');
          }}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button className="secondary" onClick={joinGame}>
          Join Game
        </Button>
      </Card>
    </HomeContainer>
  );
};

export default Home;
