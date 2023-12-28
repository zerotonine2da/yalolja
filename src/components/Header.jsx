import React from 'react';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import SlideBanner from './banner/SlideBanner';

const Header = () => {
  return <ScHeader>{<SlideBanner />}</ScHeader>;
};

const ScHeader = styled.div`
  background-color: #f0f0f0;
`;

export default Header;
