import {atom} from 'recoil';

const productIdState = atom({
  key: 'productIdState',
  default: '',
});

const productNameState = atom({
  key: 'productNameState',
  default: '',
});

const priceState = atom({
  key: 'priceState',
  default: '',
});

const teamState = atom({
  key: 'teamState',
  default: '',
});

const categoryState = atom({
  key: 'categoryState',
  default: '',
});

const isLatestState = atom({
  key: 'isLatestState',
  default: false,
});

const likesState = atom({
  key: 'likesState',
  default: 0,
});

const imgUploadState = atom({
  key: 'imgUpload',
  default: {
    file: null,
    url: null,
  },
});

export {
  productIdState,
  productNameState,
  priceState,
  teamState,
  isLatestState,
  imgUploadState,
  categoryState,
  likesState,
};
