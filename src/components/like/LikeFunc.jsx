import React from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import styled, {keyframes} from 'styled-components';
import {toggleLike} from '../../shared/api';

const LikeFunc = () => {
  const queryClient = useQueryClient();

  const {data: likeData} = useQuery('Likes', async () => {
    const response = await fetch('http://localhost:4000/Likes/1');
    const data = await response.json();
    return data;
  });

  const {mutate} = useMutation(toggleLike, {
    onSuccess: newLike => {
      queryClient.setQueryData('Likes', newLike);
    },
  });

  const handleLikeToggle = () => {
    mutate();
  };

  return (
    <>
      <ScLikeBt onClick={handleLikeToggle} />
      <ScLikeCount>{likeData?.like_count || 0}</ScLikeCount>
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
  width: 50px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  animation: ${heartBeat} 0.7s ease-in-out;

  &:before {
    content: '♡';
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:active:before {
    content: '❤️'; /* 하트 모양으로 변경 */
    color: #e74c3c; /* 원하는 하트 색상으로 변경 */
  }
`;

const ScLikeCount = styled.span`
  margin-left: 5px;
  font-size: 16px;
`;

export default LikeFunc;
