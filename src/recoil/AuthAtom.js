import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const loginState = atom({
  key: 'loginState',
  default: null, //인증이 안되었을때는 null임
  effects_UNSTABLE: [persistAtom],
}); //좋아요 로그인할때 만 누르고 한번만 누르게 재 클릭시 좋아요 취소 및 카운트 줄이기

export const adminState = atom({
  key: 'adminState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
