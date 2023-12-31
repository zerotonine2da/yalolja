import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {adminState, loginState} from '../recoil/AuthAtom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {getAuth} from 'firebase/auth';
import Product from '../components/Product';
function MyPage() {
  //리코일
  const [login, setLogin] = useRecoilState(loginState);
  const [isAdmin, setIsAdmin] = useRecoilState(adminState);
  const navigate = useNavigate();

  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const auth = await getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.log('Mypage - useEffect- fetchUser Error');
      }
    };
    fetchUser();
  }, []);

  console.log('user: ', user.displayName);

  return (
    <StDivWrapped>
      <StDivTitle>{isAdmin ? 'ADMIN PAGE (관리자)' : 'MY PAGE'}</StDivTitle>

      <div>
        <h3> {login ? `안녕하세요 ${user.displayName}님` : ''}</h3>
      </div>

      {isAdmin ? (
        <>
          {/*관리자 */}
          <StDivItemWrap>
            <StDivItem>
              <label>
                <button
                  onClick={() => {
                    navigate('/modify');
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </button>

                <h3>PROFILE</h3>
                <p>관리자 정보</p>
              </label>
            </StDivItem>
            <StDivItem>
              <label>
                <button>
                  <FontAwesomeIcon icon={faPlus} size="2x" />
                </button>

                <h3>Add New</h3>
                <p>상품 등록</p>
              </label>
            </StDivItem>
          </StDivItemWrap>
        </>
      ) : (
        <>
          {/*사용자 */}
          <StDivItemWrap>
            <StDivItem>
              <label>
                <button
                  onClick={() => {
                    navigate('/modify');
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </button>

                <h3>PROFILE</h3>
                <p>회원정보</p>
              </label>
            </StDivItem>
            <StDivItem>
              <label>
                <button>
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </button>

                <h3>LIKELIST</h3>
                <p>관심상품</p>
              </label>
            </StDivItem>
          </StDivItemWrap>
          <StDivContent>
            <FontAwesomeIcon icon={faHeart} />
            <p>LIKELIST</p>
            <Product />
            <div>관심상품 내역이 없습니다.</div>
          </StDivContent>
        </>
      )}
    </StDivWrapped>
  );
}

const StDivWrapped = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  border-bottom: 1px solid #222;
`;

const StDivTitle = styled.div`
  font-size: 25px;
  padding-top: 100px;
`;

const StDivItemWrap = styled.div`
  display: flex;
`;

const StDivItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  padding: 20px;
  cursor: pointer;

  & label {
    text-align: center;
    cursor: pointer;
  }

  & button {
    width: 100px;
    border: none;
    background-color: transparent;
    padding-bottom: 20px;
  }

  & h3 {
    font-size: 17px;
    font-weight: 700;
    padding-bottom: 5px;
  }

  & p {
    font-size: 13px;
    color: #666;
  }

  &:hover {
    background-color: #dbdada;
  }
`;

const StDivContent = styled.div`
  width: 1000px;
  height: 100vh;
  border: 1px solid #333;
`;

export default MyPage;
