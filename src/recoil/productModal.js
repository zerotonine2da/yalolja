import {atom} from 'recoil';

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

const isLatestState = atom({
  key: 'isLatestState',
  default: false,
});

const imgUploadState = atom({
  key: 'imgUpload',
  default: {
    file: null,
    url: null,
  },
});

export {productNameState, priceState, teamState, isLatestState, imgUploadState};
