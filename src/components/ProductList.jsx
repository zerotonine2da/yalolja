import React, {useState} from 'react';
import Product from './Product';
import styled from 'styled-components';
import Button from './UI/Button';
import ProductModal from './UI/ProductModal';

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ScProductWrapper>
      <Button onClick={handleAddProduct} />
      {isModalOpen && <ProductModal onClose={handleCloseModal} />}
      <Product />
    </ScProductWrapper>
  );
};

const ScProductWrapper = styled.div`
  padding: 10px;
`;

export default ProductList;
