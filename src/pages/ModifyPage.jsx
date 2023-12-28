import React from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import {loginState} from '../recoil/AuthAtom';
import {useNavigate} from 'react-router-dom';

const ModifyPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const user = login.email;

  const naviagate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    clearErrors,
  } = useForm({
    defaultValues: {
      password: '',
      nickname: '',
      passwordConfirm: '',
    },
    mode: 'onChange', //실시간 검증 활성화
  });

  const handleCancleClick = () => {
    naviagate(-1);
  };

  const updateDate = async data => {
    alert('기능 수정중');
    console.log(data);

    try {
      //await updatePassword
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    }
  };

  return (
    <StDivWrapped>
      <StDivTitle>
        <h2>회원 정보 수정</h2>
      </StDivTitle>

      <StFormData
        onSubmit={handleSubmit(data => {
          //signUp(data);
          updateDate(data);
        })}
      >
        <div>
          <label title="아이디">
            <input value={user} readOnly></input>
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
        <div>
          <button type="submit">회원정보수정</button>
          <button onClick={handleCancleClick}>취소</button>
        </div>
      </StFormData>
    </StDivWrapped>
  );
};

const StDivWrapped = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
`;

const StDivContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 760px;
  height: 100vh;
  border: 1px solid #333;
`;

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
    width: 300px;
    height: 55px;
    cursor: pointer;
  }

  & p {
    color: #f13731;
    font-size: 13px;
    padding-left: 8px;
  }
`;
export default ModifyPage;
