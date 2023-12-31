import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {adminState, googleLogin, loginState} from '../recoil/AuthAtom';
import Swal from 'sweetalert2';
import {getAuth, signOut} from 'firebase/auth';

const NavBar = () => {
  //리코일
  const [login, setLogin] = useRecoilState(loginState);
  const [admin, setAdmin] = useRecoilState(adminState);
  const setGoogleLogin = useSetRecoilState(googleLogin);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        navigate('/');
        await signOut(auth);
        //리코일(1) 로그인 데이터
        //리코일(2) 관리자 권한 false
        //리코일(3) 구글 로그인 여부 false
        setLogin(null);
        setAdmin(false);
        setGoogleLogin(false);

        navigate('/');

        Swal.fire({
          title: '로그아웃',
          text: '로그아웃 성공.',
          icon: 'success',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ScNav>
        <ScDivIcon>
          <input type="checkbox" id="menuicon"></input>
          <label htmlFor="menuicon">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <StDivSidebar className="sidebar">
            <ul>
              <li
                onClick={() => {
                  navigate('/top');
                }}
              >
                TOP
              </li>
              <li
                onClick={() => {
                  navigate('/bottom');
                }}
              >
                Bottom
              </li>
              <li
                onClick={() => {
                  navigate('/acc');
                }}
              >
                Accessories
              </li>

              <li
                onClick={() => {
                  navigate('/hit');
                }}
              >
                HIT
              </li>
            </ul>
          </StDivSidebar>
        </ScDivIcon>

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
                <FontAwesomeIcon icon={faArrowRightToBracket} fontSize="20px" />
                <p>로그아웃</p>
              </button>

              <button
                onClick={() => {
                  navigate('/mypage');
                }}
              >
                <label>
                  <FontAwesomeIcon icon={faUser} fontSize="20px" />
                  {admin ? <p>마이페이지(관리자)</p> : <p>마이페이지</p>}
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
                <FontAwesomeIcon icon={faArrowRightToBracket} fontSize="20px" />
                <p>로그인</p>
              </button>
              <button
                onClick={() => {
                  navigate('/login');
                }}
              >
                <label>
                  <FontAwesomeIcon icon={faUser} fontSize="20px" />
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
    margin-top: 10px;
    font-size: 12px;
  }
`;

const ScDivTitle = styled.div`
  font-size: 30px;
`;

const ScDivIcon = styled.div`
  width: 140px;
  margin-left: 20px;
  //z-index: 999;
  & input {
    display: none;
    padding-left: 60px;
  }

  & label {
    display: block;
    width: 35px;
    height: 23px;
    position: relative;
    cursor: pointer;
  }

  & span {
    z-index: 900;
    display: block;
    position: absolute;
    width: 100%;
    height: 5px;
    border-radius: 25px;
    background-color: #fff;
    transition: all 0.35s;
  }
  & span:nth-child(1) {
    /* 첫번째 span 요소*/
    top: 0;
  }
  & span:nth-child(2) {
    /* 두번째 span 요소*/
    top: 50%;
    transform: translateY(-50%);
  }
  & span:nth-child(3) {
    /* 세번째 span 요소*/
    bottom: 0;
  }

  & input:checked + label span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  & input:checked + label span:nth-child(2) {
    opacity: 0;
  }
  & input:checked + label span:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }
  & input:checked + label + .sidebar {
    left: 0;
  }
`;

const StDivSidebar = styled.div`
  width: 270px;
  height: 400px;
  background-color: #333;
  position: fixed;
  top: 0;
  left: -270px;
  z-index: 1;
  transition: left 0.35s;

  & li {
    margin-left: 30px;
    padding-top: 20px;
    margin-top: 50px;
  }
`;

export default NavBar;
