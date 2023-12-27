import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <ScFooter>
      <div>&copy; 2023 야롤자 주식회사</div>
    </ScFooter>
  );
};
const ScFooter = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
`;
export default Footer;
