import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Game from './components/Game';

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

const App: React.FC = () => {
  // In a real app, these would come from the server or URL parameters
  const mockGameId = 'test-game-123';

  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Routes>
          <Route 
            path="/" 
            element={<Game gameId={mockGameId} />} 
          />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
