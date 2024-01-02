import React, {useState} from 'react';
import Product from './Product';
import styled from 'styled-components';
import Button from './UI/Button';
import ProductModal from './UI/ProductModal';
import 'firebase/firestore';
import {useQuery} from 'react-query';
import {getLatestProducts} from '../api/api';
import {useRecoilState, useRecoilValue} from 'recoil';
import {adminState} from '../recoil/AuthAtom';
import Pagination from './UI/Pagination';

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const isAdmin = useRecoilValue(adminState);
  const {data: products, isLoading, isError} = useQuery('products', getLatestProducts);

  console.log('isAdmin', isAdmin);
  console.log('Rendering ProductList component. State and props:', {
    isModalOpen,
    isLoading,
    isError,
    products,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <ScProductWrapper>
      {isAdmin ? (
        <>
          <Button onClick={handleAddProduct} text="상품 등록" />
          {isModalOpen && <ProductModal onClose={handleCloseModal} />}
        </>
      ) : null}
      {/*-----테스트할때 기존코드로 사용시, 등록 모든 계정에서 사용 가능-----* 
      <Button onClick={handleAddProduct} />
      {isModalOpen && <ProductModal onClose={handleCloseModal} />}
     */}
      <Product page={currentPage} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={5}
        totalItems={products.length}
        onPageChange={handlePageChange}
      />
    </ScProductWrapper>
  );
};

const ScProductWrapper = styled.div`
  padding: 10px;
`;

export default ProductList;
