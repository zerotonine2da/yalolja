import React, {useEffect} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import styled, {keyframes} from 'styled-components';
import {getProducts, addLikeProduct} from '../../api/api';

const LikeFunc = ({productId, initialLikeCount}) => {
  const queryClient = useQueryClient();

  const {mutate} = useMutation(() => addLikeProduct(productId), {
    onMutate: async () => {
      // 이곳에서 요청 이전에 수행할 작업 데이타 불러와
      const previousData = queryClient.getQueryData('products');

      // 좋아요 카운트를 증가시켜줌.
      queryClient.setQueryData('products', prevData => {
        return prevData.map(product => {
          if (product.id === productId) {
            return {...product, like: product.like + 1};
          }
          return product;
        });
      });

      return {previousData};
    },
    onError: context => {
      // 에러 발생 시 롤백 작업 이전 좋아요 수 보여주기.
      const {previousData} = context;
      queryClient.setQueryData('products', previousData);
    },
    onSettled: () => {
      // 비동기 작업이 성공하든 실패하든 마지막에 수행할 작업 사용.
      // 페이지에서 쿼리를 다시 갱신하도록 변경
      queryClient.invalidateQueries('products');
    },
  });
  useEffect(() => {
    // 다른 페이지에서 돌아올 때 이전 데이터를 캐시에서 가져와서 업데이트
    const cachedData = queryClient.getQueryData('products');
    if (cachedData) {
      queryClient.setQueryData('products', cachedData);
    }
  }, [queryClient]);

  const handleLikeToggle = () => {
    mutate();
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
