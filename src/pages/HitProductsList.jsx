import React, {useState} from 'react';
import styled from 'styled-components';
import 'firebase/firestore';
import {useQuery} from 'react-query';
import {getHitProducts} from '../api/api';
import HitProducts from '../components/HitProducts';
import Pagination from '../components/UI/Pagination';
import Header from '../components/Header';
import TeamLogos from '../components/TeamLogos';
import Footer from '../components/Footer';

const HitProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {data: products, isLoading, isError} = useQuery('products', getHitProducts);

  console.log('Rendering ProductList component. State and props:', {
    isLoading,
    isError,
    products,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Header />
      <Sclogo>
        <TeamLogos />
      </Sclogo>
      <ScProductWrapper>
        <ScHitList>HIT List</ScHitList>
        <HitProducts page={currentPage} />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={5}
          totalItems={products.length}
          onPageChange={handlePageChange}
        />
      </ScProductWrapper>
      <Footer />
    </>
  );
};

const ScProductWrapper = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
`;
const Sclogo = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
`;
const ScHitList = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  padding-bottom: 10px;
`;
export default HitProductsList;
