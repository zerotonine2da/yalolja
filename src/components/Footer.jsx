import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <ScFooter>
      <ScColumn>
        <div>팀장: 김혜민</div>
        <div>조원: 김동학</div>
      </ScColumn>
      <ScColumn>
        <div>조원: 권영준</div>
        <div>조원: 윤유빈</div>
      </ScColumn>
      <div>&copy; 2024 야롤자 주식회사</div>
    </ScFooter>
  );
};

const ScFooter = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  div {
    margin-bottom: 10px;
  }

  a {
    color: #61dafb;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ScColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Footer;
