import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ScNav>
        <div>
          <FontAwesomeIcon icon={faBars} />
          카테고리
        </div>

        <ScDivTitle
          onClick={() => {
            navigate('/');
          }}
        >
          yalolja
        </ScDivTitle>
        <ScDivAuth>
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <p>로그인</p>
          </button>

          <button
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <label>
              <FontAwesomeIcon icon={faUser} />
              <p>마이페이지</p>
            </label>
          </button>
        </ScDivAuth>
      </ScNav>
    </div>
  );
};

const ScNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 8vh;
  background-color: #e5e5e5;
`;

const ScDivAuth = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;

  & button {
    border: none;
    background-color: #e5e5e5;
  }

  & p {
    font-size: 12px;
  }
`;

const ScDivTitle = styled.div`
  font-size: 30px;
`;

export default NavBar;
