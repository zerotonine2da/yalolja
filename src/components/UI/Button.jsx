import React from 'react';
import styled from 'styled-components';

const Button = ({onClick, text}) => {
  return <UiButton onClick={onClick}>{text}</UiButton>;
};

const UiButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default Button;
