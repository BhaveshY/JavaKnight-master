import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Game from './components/Game';
import Home from './components/Home';
import { PieceColor } from './types/game';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f0f2f5;
  }

  * {
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
`;

const GameRoute: React.FC = () => {
  const { gameId, color } = useParams<{ gameId: string; color: string }>();
  
  if (!gameId || !color || !['WHITE', 'BLACK'].includes(color)) {
    return <Navigate to="/" replace />;
  }

  return <Game gameId={gameId} playerColor={color as PieceColor} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:gameId" element={<Navigate to="/" replace />} />
          <Route path="/game/:gameId/:color" element={<GameRoute />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
