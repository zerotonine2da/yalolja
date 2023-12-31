import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

//로그인상태 확인
export const loginState = atom({
  key: 'loginState',
  default: null, //인증이 안되었을때는 null임
  effects_UNSTABLE: [persistAtom],
});

//관리자 계정 확인
export const adminState = atom({
  key: 'adminState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

//비동기 작업 진행 중 : 로딩 상태 확인
export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
