import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import {adminState, loginState} from '../recoil/AuthAtom';
import {useNavigate} from 'react-router-dom';
import {
  EmailAuthProvider,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';

const ModifyPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [loading, setloading] = useState(false);

  //리코일
  const [admin, setAdmin] = useRecoilState(adminState);

  const userEmail = login.email;
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
      nickname: user.displayName,
      passwordConfirm: '',
    },
    mode: 'onChange', //실시간 검증 활성화
  });

  const handleCancleClick = () => {
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    Swal.fire({
      title: '비밀번호를 입력하세요',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off',
      },

      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '탈퇴',
      showLoaderOnConfirm: true,
    }).then(async result => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, result.value);

      if (credential) {
        setloading(true);
        try {
          const passwordCHK = await reauthenticateWithCredential(user, credential);
          if (passwordCHK) {
            navigate('/');
            await deleteUser(user);
            setloading(false);
            //리코일(1) 로그인 데이터
            setLogin(null);

            //리코일(2) 관리자 권한 false
            setAdmin(false);
            navigate('/');
            Swal.fire({
              title: '회원탈퇴',
              text: '회원탈퇴가 완료되었습니다.',
              icon: 'success',
            });
          }
        } catch (error) {
          Swal.fire({
            title: '비밀번호 오류',
            text: '비밀번호가 틀립니다',
            icon: 'error',
          });
          setloading(false);
          return;
        }
      }
    });
  };

  const updateDate = async data => {
    try {
      const newPassword = data.password;
      const newNickName = data.nickname;

      setloading(true);
      await updatePassword(user, newPassword);
      await updateProfile(user, {displayName: newNickName});

      //setJoinData(newNickName);
      setloading(false);
      Swal.fire({
        title: '회원정보수정',
        text: '회원정보수정이 완료되었습니다.',
        icon: 'success',
      });
      navigate('/mypage');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
      setloading(false);
    }
  };

  return (
    <StDivWrapped>
      {loading ? <Loading /> : null}
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
            <input value={userEmail} readOnly></input>
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

        {/*사용자 only */}

        <StDivDelete>
          <button onClick={handleDeleteClick}>탈퇴하기</button>
        </StDivDelete>
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

const StDivDelete = styled.div`
  left: 45%;
  position: fixed;
  bottom: 5%;
  cursor: pointer;

  & button {
    width: 100px;
    height: 30px;
    background-color: transparent;
    color: #777;
    border: none;
  }
`;

export default ModifyPage;
