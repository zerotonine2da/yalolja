import React, {useState} from 'react';
import styled from 'styled-components';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {auth} from '../shared/firebase';
import Loading from '../components/Loading';

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    clearErrors,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
    mode: 'onChange', //실시간 검증 활성화
  });

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const signUp = async data => {
    try {
      setloading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, {displayName: data.nickname});

      //setJoinData(JSON.parse(JSON.stringify(data.nickname)));

      setloading(false);
      Swal.fire({
        title: '회원가입',
        text: '회원가입이 완료되었습니다.',
        icon: 'success',
      });

      navigate('/login');
    } catch (error) {
      const errorCode = error.code;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errMsg(errorCode),
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
      setloading(false);
    }
  };

  const errMsg = errorCode => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return '아이디가 필요합니다.';

      case 'auth/wrong-password':
        return '비밀번호가 일치하지 않습니다.';

      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일입니다.';

      case 'auth/network-request-failed':
        return '네트워크 연결에 실패 하였습니다.';

      case 'auth/invalid-email':
        return '잘못된 이메일 형식입니다.';

      case 'auth/internal-error':
        return '잘못된 요청입니다.';

      default:
        return '로그인에 실패하였습니다.';
    }
  };

  return (
    <StDivWrap>
      {loading ? <Loading /> : null}
      <StDivTop>
        <h1>Welcome at YalolJa</h1>
        <p>야롤자에 오신 것을 환영합니다.</p>
      </StDivTop>

      <StDivTitle>
        <h2>기본정보</h2>
      </StDivTitle>

      <StFormData
        onSubmit={handleSubmit(data => {
          //event.preventDefault()-//;
          console.log('가입하기 버튼 클릭시 : ', data);
          // 유효성 검사를 다시 수행하도록 clearErrors를 호출합니다.
          clearErrors();

          signUp(data);
        })}
      >
        <div>
          <label title="아이디">
            <input
              {...register('email', {
                required: '아이디 입력은 필수입니다.',

                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
              type="email"
              placeholder="이메일 아이디*"
            ></input>
            <p>{errors.email?.message}</p>
          </label>
        </div>
        <div>
          <label>
            <input
              {...register('password', {
                required: '비밀번호 입력은 필수입니다.',
                minLength: {
                  value: 6,
                  message: '비밀번호는 6글자 이상이어야 합니다.',
                },
              })}
              type="password"
              placeholder="비밀번호*"
            ></input>
            <p>{errors.password?.message}</p>
          </label>
        </div>
        <div>
          <label>
            <input
              {...register('passwordConfirm', {
                required: '비밀번호가 일치하지 않습니다.',
                validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
              type="password"
              placeholder="비밀번호 확인*"
            ></input>
            <p>{errors.passwordConfirm?.message}</p>
          </label>
        </div>
        <div>
          <label>
            <input
              {...register('nickname', {
                required: '닉네임 입력은 필수입니다.',
                minLength: {
                  value: 2,
                  message: '닉네임은 2글자 이상이어야 합니다.',
                },
              })}
              type="text"
              placeholder="닉네임*"
            ></input>
            <p>{errors.nickname?.message}</p>
          </label>
        </div>
        <button>가입하기</button>
      </StFormData>
    </StDivWrap>
  );
};

const StDivWrap = styled.div`
  width: 600px;
  height: 100vh;
  margin: auto;
  padding-top: 60px;
`;

const StDivTop = styled.div`
  font-weight: 400;
  font-size: 20px;

  & p {
    font-size: 15px;
    margin-top: 8px;
  }
`;

const StDivTitle = styled.div`
  padding-top: 50px;
  padding-bottom: 8px;
  border-bottom: 2px solid #000;
  & h2 {
    font-size: 15px;
    font-weight: 700;
  }
`;

const StFormData = styled.form`
  & div {
    margin-top: 2rem;
    margin-bottom: 2.5rem;
  }

  & label {
  }

  & input {
    border: none;
    width: 100%;
    outline: none;
    height: 40px;
    line-height: 1.1;
    padding-left: 10px;
    border-bottom: 1px solid #e5e5e5;
  }

  & button {
    background-color: #1e1e1e;
    color: #fff;
    width: 600px;
    height: 55px;
  }

  & p {
    color: #f13731;
    font-size: 13px;
    padding-left: 8px;
  }
`;

export default Join;
