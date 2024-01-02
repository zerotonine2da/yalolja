import React, {useState} from 'react';
import styled from 'styled-components';
import 'firebase/firestore';
import {useQuery} from 'react-query';
import {getBottomProducts} from '../api/api';
import BottomProducts from '../components/BottomProducts';
import Pagination from '../components/UI/Pagination';
import TeamLogos from '../components/TeamLogos';
import Header from '../components/Header';

const BottomProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {data: products, isLoading, isError} = useQuery('products', getBottomProducts);

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
      <TeamLogos />
      <ScProductWrapper>
        <BottomProducts page={currentPage} />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={5}
          totalItems={products.length}
          onPageChange={handlePageChange}
        />
      </ScProductWrapper>
    </>
  );
};

const ScProductWrapper = styled.div`
  padding: 10px;
`;

export default BottomProductsList;
