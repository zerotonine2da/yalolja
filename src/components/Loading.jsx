import React from 'react';
import styled from 'styled-components';
import Spinner from '../assets/imgs/Loading/Spinner.gif';

const Loading = () => {
  return (
    <ScDivBackground>
      <img src={Spinner} alt="로딩중" width="5%"></img>
    </ScDivBackground>
  );
};

const ScDivBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Loading;
