import React, {useEffect} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import styled, {keyframes} from 'styled-components';
import {getProducts, addLikeProduct} from '../../api/api';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {loginState} from '../../recoil/AuthAtom';
import Swal from 'sweetalert2';
import {auth} from '../../shared/firebase';

const likeState = atom({
  key: 'likeState',
  default: false,
});

const LikeFunc = ({productId, initialLikeCount}) => {
  const queryClient = useQueryClient();
  const isLoggedin = useRecoilValue(loginState);
  const [isLinked, setIsLinked] = useRecoilState(likeState);

  const {mutate} = useMutation(() => addLikeProduct(isLoggedin, productId), {
    onMutate: async () => {
      // 데이터를 가져와줌
      const previousData = queryClient.getQueryData('products');

      // prevData가 undefined인 경우 초기화
      if (!previousData) {
        return;
      }

      let currentLikeCount = 0;

      queryClient.setQueryData('products', prevData => {
        const updatedData = prevData.map(product => {
          if (product.id === productId) {
            // 현재 좋아요 수 가져오기
            currentLikeCount = product.like;

            // 좋아요 증가 또는 감소
            //return {...product, like: currentLikeCount + (isLoggedin ? 1 : -1)};
          }
          return product;
        });

        return updatedData;
      });

      // 반드시 previousData와 현재 좋아요 수를 추가
      return {previousData, currentLikeCount};
    },
    onError: context => {
      // 에러 발생 시 롤백 작업 이전 좋아요 수 보여주기.
      const {previousData} = context || {};
      if (previousData) {
        queryClient.setQueryData('products', previousData);
      }
    },
    onSettled: () => {
      // 비동기 작업이 성공하든 실패하든 마지막에 수행할 작업 사용.
      // 페이지에서 쿼리를 다시 갱신하도록 변경
      queryClient.invalidateQueries('products');
    },
  });

  const handleLikeToggle = () => {
    if (isLoggedin) {
      mutate();
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인이 필요합니다.',
        text: '로그인후 좋아요를 추가할 수 있습니다.',
      });
    }
  };

  return (
    <>
      <ScLikeBt onClick={handleLikeToggle} />
      <ScLikeCount>{initialLikeCount}</ScLikeCount>
    </>
  );
};

const heartBeat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

const ScLikeBt = styled.button`
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  animation: ${heartBeat} 0.7s ease-in-out;

  &:before {
    content: '♡';
    font-size: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:active:before {
    content: '❤️';
    color: #e74c3c;
  }
`;

const ScLikeCount = styled.span`
  margin-left: 5px;
  font-size: 14px;
`;

export default LikeFunc;
