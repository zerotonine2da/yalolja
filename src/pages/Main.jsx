import React, {useEffect} from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TeamLogos from '../components/TeamLogos';
import Footer from '../components/Footer';
import SlideBanner from '../components/banner/SlideBanner';
import {useRecoilState} from 'recoil';
import {loginState} from '../recoil/AuthAtom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import app, {auth} from '../shared/firebase';
import ProductList from '../components/ProductList';

function Main() {
  //리코일
  const [login, setLogin] = useRecoilState(loginState);
  /*
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('사용자가 로그인했습니다:', user);
      } else {
        console.log('사용자가 로그아웃했습니다.');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
*/
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
