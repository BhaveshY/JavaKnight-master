import React from 'react';
import styled from 'styled-components';

interface SquareProps {
  isLight: boolean;
  isSelected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

interface StyledSquareProps {
  isLight: boolean;
  isSelected: boolean;
}

const StyledSquare = styled.div<StyledSquareProps>`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => 
    props.isSelected 
      ? '#7b61ff' 
      : props.isLight 
        ? '#f0d9b5' 
        : '#b58863'
  };
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Square: React.FC<SquareProps> = ({ isLight, isSelected, onClick, children }) => {
  return (
    <StyledSquare 
      isLight={isLight} 
      isSelected={isSelected} 
      onClick={onClick}
    >
      {children}
    </StyledSquare>
  );
};

export default Square;
