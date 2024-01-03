import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TeamLogos from '../components/TeamLogos';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';

function Main() {
  return (
    <ScMainContainer>
      <Header />
      <ScContentContainer>
        <TeamLogos />
      </ScContentContainer>
      <ProductList />
      <Footer />
    </ScMainContainer>
  );
}
const ScMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
`;

const ScContentContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
`;

export default Main;
