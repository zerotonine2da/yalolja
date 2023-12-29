import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const loginState = atom({
  key: 'loginState',
  default: null, //인증이 안되었을때는 null임
  effects_UNSTABLE: [persistAtom],
});

export const adminState = atom({
  key: 'adminState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
