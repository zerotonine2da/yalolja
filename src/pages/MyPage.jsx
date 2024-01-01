import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {adminState, googleLogin, loginState} from '../recoil/AuthAtom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {getAuth} from 'firebase/auth';
import LikeProduct from '../components/LikeProduct';
import Swal from 'sweetalert2';

function MyPage() {
  //리코일
  const [login, setLogin] = useRecoilState(loginState);
  const [isAdmin, setIsAdmin] = useRecoilState(adminState);
  const googleLoginCheck = useRecoilValue(googleLogin);
  const navigate = useNavigate();

  const [user, setUser] = useState(login);

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

  const modifyProfile = () => {
    if (googleLoginCheck) {
      Swal.fire({
        title: '구글 로그인 안내',
        text: '구글계정은 구글에서 직접 수정하셔야합니다.',
        icon: 'warning',
      });
      return;
    } else {
      navigate('/modify');
    }
  };

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
                <button onClick={modifyProfile}>
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
            <div>
              <FontAwesomeIcon icon={faHeart} />
              <p>LIKELIST</p>
            </div>
            <StDivborderLine></StDivborderLine>
            <LikeProduct />
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
  & div {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
    padding-top: 10px;

    & p {
      font-weight: 700;
      font-size: 20px;
    }
  }
  width: 1250px;
  //height: 100vh;
`;

const StDivborderLine = styled.div`
  border-bottom: 1px solid #333;
`;

export default MyPage;
