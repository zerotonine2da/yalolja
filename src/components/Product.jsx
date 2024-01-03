import React from 'react';
import {useQuery} from 'react-query';
import {getLatestProducts} from '../api/api';
import styled from 'styled-components';
import LikeFunc from './like/LikeFunc';
import {useNavigate} from 'react-router-dom';

const Product = ({page}) => {
  const navigate = useNavigate();
  const {data: products, isLoading, isError} = useQuery('products', getLatestProducts);

  if (isLoading) return <div>로딩 중</div>;
  if (isError || !products) return <div>에러 발생</div>;

  const productsPerPage = 5;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const productsToDisplay = products.slice(startIndex, endIndex);

  const handleProductClick = productId => {
    navigate(`/product/${productId}`);
  };

  //제목 문자열 일정수 이상일시 그 이상 문자열 ... 출력
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <>
      <ScBestProduct>BEST PRODUCT</ScBestProduct>
      <ScProductContainer>
        <ScProducts>
          {productsToDisplay.map(product => (
            <ScProduct key={product.id}>
              <ScProductName>{truncate(product.productName, 26)}</ScProductName>
              <ImgContainer onClick={() => handleProductClick(product.id)}>
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

const ScBestProduct = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;

  padding-bottom: 10px;
`;
export default Product;
