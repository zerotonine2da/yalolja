import React, {useState} from 'react';
import Product from './Product';
import styled from 'styled-components';
import Button from './UI/Button';
import ProductModal from './UI/ProductModal';
import 'firebase/firestore';
import {useQuery} from 'react-query';
import {getLatestProducts} from '../api/api';

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

  const totalPage = Math.ceil(products.length / 5);

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
      <Button onClick={handleAddProduct} />
      {isModalOpen && <ProductModal onClose={handleCloseModal} />}
      <Product page={currentPage} />
      <Pagination>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          이전
        </button>
        <span>{`${currentPage} / ${totalPage}`}</span>
        <button disabled={currentPage === totalPage} onClick={() => handlePageChange(currentPage + 1)}>
          다음
        </button>
      </Pagination>
    </ScProductWrapper>
  );
};

const ScProductWrapper = styled.div`
  padding: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export default ProductList;
