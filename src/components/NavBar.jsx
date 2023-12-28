import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {useRecoilState} from 'recoil';
import {loginState} from '../recoil/AuthAtom';
import {auth} from '../shared/firebase';
import Swal from 'sweetalert2';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
const NavBar = () => {
  //리코일
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(getAuth());
      console.log(getAuth());

      //리코일

      setLogin(null);
      navigate('/');

      Swal.fire({
        title: '로그아웃',
        text: '로그아웃 성공.',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          {login ? (
            <>
              <button onClick={logOut}>
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <p>로그아웃</p>
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
            </>
          ) : (
            <>
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
                  navigate('/login');
                }}
              >
                <label>
                  <FontAwesomeIcon icon={faUser} />
                  <p>마이페이지</p>
                </label>
              </button>
            </>
          )}
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
  background-color: #333;
  color: #e5e5e5;
  cursor: pointer;
`;

const ScDivAuth = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  color: #e5e5e5;
  & button {
    border: none;
    background-color: #333;
    color: #e5e5e5;
  }

  & p {
    font-size: 12px;
  }
`;

const ScDivTitle = styled.div`
  font-size: 30px;
`;

export default NavBar;
