import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';

const Pagination = ({currentPage, itemsPerPage, totalItems, onPageChange}) => {
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const handlePrevClick = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      onPageChange(prevPage);
    }
  };

  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPage) onPageChange(nextPage);
  };

  return (
    <PageWrapper>
      <span>{`${currentPage} / ${totalPage}`}</span>
      <ButtonWrapper>
        <Button onClick={handlePrevClick} text="◁" disabled={currentPage === 1}></Button>
        <Button onClick={handleNextClick} text="▷" disabled={currentPage === totalPage}></Button>
      </ButtonWrapper>
    </PageWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

export default Pagination;
