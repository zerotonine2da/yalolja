import React, {useState} from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import {auth} from '../shared/firebase';
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {loginState} from '../recoil/AuthAtom';

function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  //리코일
  const [login, setLogin] = useRecoilState(loginState);

  const Login = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, id, pw);

      console.log('로그인 정보 : ', userCredential.user);
      //리코일 깊은복사
      setLogin(JSON.parse(JSON.stringify(userCredential.user)));

      Swal.fire({
        title: '로그인',
        text: '로그인 성공.',
        icon: 'success',
      });
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      //const errorMessage = error.message;
      //console.log(errorCode);
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: errMsg(errorCode),
      });
    }
  };

  const LoginGoogle = async e => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      //리코일 깊은복사
      setLogin(JSON.parse(JSON.stringify(userCredential.user)));

      Swal.fire({
        title: '로그인',
        text: '로그인 성공.',
        icon: 'success',
      });
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      console.log(errorCode);
      console.log(errorMessage);
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: errMsg(errorCode),
      });
    }
  };

  const errMsg = errorCode => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return '로그인 정보를 다시 확인해주세요';
      case 'auth/invalid-email':
        return `아이디는 이메일 형식으로 작성해주세요.
        (예시: test@mail.com)`;
      case 'auth/missing-password':
        return '비밀번호를 입력해주세요.';
    }
  };

  return (
    <ScDiv>
      <ScForm>
        <div>LOGIN</div>

        <label>
          <p>ID </p>
          <input placeholder="아이디 입력(test@mail.com)" value={id} onChange={e => setId(e.target.value)}></input>
        </label>

        <label>
          <p>PW </p>
          <input type="password" placeholder="비밀번호 입력" value={pw} onChange={e => setPw(e.target.value)}></input>
        </label>

        <button onClick={Login}>로그인</button>
        <button onClick={LoginGoogle}>Google로 시작하기</button>
      </ScForm>
      <ScDivJoin>
        <p>아직 회원이 아니신가요?</p>
        <p>고객님을 위한 다양한 혜택이 준비되어 있습니다.</p>
        <a href="/join">회원가입</a>
      </ScDivJoin>
    </ScDiv>
  );
}

const ScDiv = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 70px;
`;

const ScForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  & label {
    border: 1px solid gray;
    width: 400px;
    display: flex;

    & p {
      width: 40px;
      color: gray;
      margin: auto;
    }

    & input {
      width: 300px;
      height: 45px;
      font-size: 14px;
      border: none;
      padding: 8px;
    }
  }

  & button {
    width: 400px;
    height: 45px;
    background-color: #1e1e1e;
    color: #fff;
    font-weight: 700;
    font-size: 17px;
    border: none;

    &:hover {
      background-color: gray;
    }
  }
`;

const ScDivJoin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;
  width: 400px;
  height: 200px;

  border: 1px solid #777;
  font-size: 15px;
  color: #777;

  & a {
    border: 2px solid #1e1e1e;
    background-color: #fff;
    padding: 15px 30px;
    font-size: 16px;
    color: #1e1e1e;
    text-decoration: none;
  }
`;

export default Login;
