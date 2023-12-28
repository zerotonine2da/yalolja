import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TeamLogos from '../components/TeamLogos';
import Footer from '../components/Footer';
import SlideBanner from '../components/banner/SlideBanner';
import ProductList from '../components/ProductList';

function Main() {
  return (
    <MainContainer>
      <Header />
      <ContentContainer>
        <TeamLogos />
      </ContentContainer>
      <ProductList />
      <Footer />
    </MainContainer>
  );
}
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
`;

export default Main;
