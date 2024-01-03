import React from 'react';
import {useQuery} from 'react-query';
import {getAccProducts} from '../api/api';
import styled from 'styled-components';
import LikeFunc from './like/LikeFunc';

const AccProducts = ({page}) => {
  const {data: products, isLoading, isError} = useQuery('products', getAccProducts);

  if (isLoading) return <div>로딩 중</div>;
  if (isError) return <div>에러 발생</div>;

  const productsPerPage = 5;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const productsToDisplay = products.slice(startIndex, endIndex);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };
  return (
    <>
      <ScProductContainer>
        <ScProducts>
          {productsToDisplay.map(product => (
            <ScProduct key={product.id}>
              <ScProductName>{truncate(product.productName, 20)}</ScProductName>
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

export default AccProducts;
