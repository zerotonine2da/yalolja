import React from 'react';
import {useQuery} from 'react-query';
import {getProducts} from '../api/api';
import styled from 'styled-components';

const Product = () => {
  const {data: products, isLoading, isError} = useQuery('products', getProducts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <ScProductContainer>
        <ScProducts>
          {products.map(product => (
            <ScProduct key={product.id}>
              <ScProductName>{product.productName}</ScProductName>
              <ImgContainer>
                <Img src={product.imgUrl} alt="image" />
              </ImgContainer>
              <ScProductContext>
                <PriceText>{product.price}원</PriceText>
                <LikeText>👍{product.like}</LikeText>
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
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 10px;
`;

const ScProducts = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ScProduct = styled.li`
  list-style: none;
  width: 25%;
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

const LikeText = styled.p``;

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

export default Product;
