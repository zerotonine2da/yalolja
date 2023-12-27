import React from 'react';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <ScNavBar>
      <ScNavContent>
        <ScNavItem>Home</ScNavItem>
        <ScNavItem>Login</ScNavItem>
        <ScNavItem>MyPage</ScNavItem>
      </ScNavContent>
    </ScNavBar>
  );
};

const ScNavBar = styled.nav`
  background-color: #333;
  height: 45px;
  color: white;
  padding: 10px 20px;
`;

const ScNavContent = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ScNavItem = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  &:hover {
    border-bottom: 2px solid white;
  }
`;

export default NavBar;
