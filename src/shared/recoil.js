import {atom, useRecoilState} from 'recoil';

export const likeState = atom({
  key: 'likeState',
  default: [],
});

export const useLikeState = () => {
  return useRecoilState(likeState);
};

export const modalState = atom({
  key: 'modalState',
  default: false,
});
