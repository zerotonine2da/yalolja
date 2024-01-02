import React, {useState} from 'react';
import Product from './Product';
import styled from 'styled-components';
import Button from './UI/Button';
import ProductModal from './UI/ProductModal';
import 'firebase/firestore';
import {useQuery} from 'react-query';
import {getLatestProducts} from '../api/api';
import Pagination from './UI/Pagination';

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {data: products, isLoading, isError} = useQuery('products', getLatestProducts);

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
      <Button onClick={handleAddProduct} text="등록" />
      {isModalOpen && <ProductModal onClose={handleCloseModal} />}
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
