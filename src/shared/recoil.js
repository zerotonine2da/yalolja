import {atom, selector, useRecoilState} from 'recoil';

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

export const textState = atom({
  key: 'textState',
  default: '',
});

export const truncatedTextState = selector({
  key: 'truncatedTextState',
  get: ({get}) => {
    const text = get(textState);
    const maxLength = 10;

    return text.length > maxLength ? text.substring(0, maxLength - 1) + '...' : text;
  },
});
