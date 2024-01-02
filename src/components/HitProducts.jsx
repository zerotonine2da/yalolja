import React from 'react';
import {useQuery} from 'react-query';
import {getHitProducts} from '../api/api';
import styled from 'styled-components';
import LikeFunc from './like/LikeFunc';
import {useRecoilValue} from 'recoil';
import {truncatedTextState} from '../shared/recoil';

const HitProducts = ({page}) => {
  const {data: products, isLoading, isError} = useQuery('products', getHitProducts);
  const truncatedText = useRecoilValue(truncatedTextState);

  if (isLoading) return <div>로딩 중</div>;
  if (isError) return <div>에러 발생</div>;

  const productsPerPage = 5;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const productsToDisplay = products.slice(startIndex, endIndex);

  return (
    <>
      <ScProductContainer>
        <ScProducts>
          {productsToDisplay.map(product => (
            <ScProduct key={product.id}>
              <ScProductName value={truncatedText}>{product.productName}1234123</ScProductName>
              <ImgContainer>
                <Img src={product.imgUrl} alt="image" />
              </ImgContainer>
              <ScProductContext>
                <PriceText>{product.price}원</PriceText>

                <LikeFunc productId={product.id} initialLikeCount={product.like} />
                <LatestCheck>{product.isLatest}</LatestCheck>
              </ScProductContext>
            </ScProduct>
          ))}
        </ScProducts>
      </ScProductContainer>
    </>
  );
};

const ScProductContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
`;

const ScProducts = styled.ul`
  list-style: none;
  display: flex;

  justify-content: flex-start;
`;

const ScProduct = styled.li`
  list-style: none;
  width: 35%;
  margin-bottom: 20px;
`;

const ScProductName = styled.div`
  padding: 5px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScProductContext = styled.p`
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
  margin-top: 5px;
  width: 80%;
  border: 1px solid #ccc;
`;

const LatestCheck = styled.p`
  padding: 5px;
`;

export default HitProducts;
