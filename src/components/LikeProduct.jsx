import React from 'react';
import {useQuery} from 'react-query';
import {getProducts} from '../api/api';
import styled from 'styled-components';
import LikeFunc from './like/LikeFunc';
import {useRecoilState} from 'recoil';
import {loginState} from '../recoil/AuthAtom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

const LikeProduct = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const {data: products, isLoading, isError} = useQuery('products', getProducts);

  if (isLoading) return <div>로딩 중</div>;
  if (isError || !products) return <div>에러 발생</div>;
  //로그인 유저
  const userEmail = login.email;
  //좋아요 누른 상품만 필터링
  const likedProduct = products.filter(product => {
    return product.likes && product.likes.some(like => like.email === userEmail);
  });

  const likedProductCnt = likedProduct.length;

  return (
    <>
      <div>
        <FontAwesomeIcon icon={faHeart} />
        <p>LIKELIST</p>
        <p>({likedProductCnt})</p>
      </div>
      <StDivborderLine></StDivborderLine>
      <ScProductContainer>
        {likedProduct.length === 0 ? (
          <ScPNoList>관심상품 내역이 없습니다.</ScPNoList>
        ) : (
          <ScProducts>
            {likedProduct.map(product => (
              <ScProduct key={product.id}>
                <ScProductName>{product.productName}</ScProductName>
                <ImgContainer>
                  <Img src={product.imgUrl} alt="image" />
                </ImgContainer>
                <ScProductContext>
                  <PriceText>{product.price}원</PriceText>

                  <LikeFunc productId={product.id} initialLikeCount={product.like} />
                </ScProductContext>
              </ScProduct>
            ))}
          </ScProducts>
        )}
      </ScProductContainer>
    </>
  );
};

const ScProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어짐*/
  padding: 10px;
`;

const ScPNoList = styled.p`
  margin: auto;
  padding: 100px;
`;

const ScProducts = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1250px;
`;

const ScProduct = styled.li`
  list-style: none;
  width: 25%;
  margin-bottom: 20px;
  min-width: 290px;
`;

const ScProductName = styled.div`
  padding: 5px;
  font-weight: 500;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScProductContext = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PriceText = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const Img = styled.img`
  width: 80%;
  border-bottom: 1px solid #ccc;
`;

const StDivborderLine = styled.div`
  border-bottom: 1px solid #333;
`;

export default LikeProduct;
