import React from 'react';
import Product from './Product';
import styled from 'styled-components';

const ProductList = () => {
  return (
    <ScProductWrapper>
      <Product />
    </ScProductWrapper>
  );
};

const ScProductWrapper = styled.div`
  padding: 10px;
`;

export default ProductList;
