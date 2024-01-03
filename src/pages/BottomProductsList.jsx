import React, {useState} from 'react';
import styled from 'styled-components';
import 'firebase/firestore';
import {useQuery} from 'react-query';
import {getBottomProducts} from '../api/api';
import BottomProducts from '../components/BottomProducts';
import Pagination from '../components/UI/Pagination';
import TeamLogos from '../components/TeamLogos';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BottomProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {data: products, isLoading, isError} = useQuery('products', getBottomProducts);
  /*
  console.log('Rendering ProductList component. State and props:', {
    isLoading,
    isError,
    products,
  });
*/
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
        <ScBottomList>BOTTOM List</ScBottomList>
        <BottomProducts page={currentPage} />
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
const ScBottomList = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  padding-bottom: 10px;
`;
export default BottomProductsList;
