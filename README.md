Yalolja Project 소개    
-------  
1. 프로젝트 : e-sports LOL 구단 유니폼 추천하는 사이트
2. 세부내용 : 주목 받고 있는 e-sports 종목이자, 게임인 LOL 구단의 유니폼을 추천받을 수 있음
3. 개발기간 : 23.12.26 ~ 24.01.02 (5일)

사용기술
-------         
* react  
* react-router-dom  
* react-query  
* react-recoil  
* firebase  
* styled-components(CSS)  

필수 구현 사항 
-------  
(1) 상  
- 좋아요 또는 북마크 기능에 리액트쿼리 Optimistic Update 적용  
- form 유효성검사에 react-hook-form 라이브러리 적용  
  
(2) 중  
- redux 외의 다른 전역상태관리 라이브러리 적용 (=> recoil)  
  
(3) 하  
- react-query 로 서버 상태 관리하기  
- 외부 API 적용 (firebase, sweetalert 등)  

기능 구현 사항 
------- 
(1) 상태관리 라이브러리 및 데이터 관리  
- react-query & recoil 사용  
  
(2) 로그인 + 회원가입   
- firebase Auth 사용  
- 회원가입시, form의 유효성 검사 (react-hook-form)  
  
(3) 좋아요  
- 리액트쿼리 Optimistic Update 사용하여 좋아요(♡-♥) 토글 기능 적용    
  
(4) 페이지네이션 & 슬라이드 배너  
- 하단 페이지네이션 라이브러리 없이 구현 완료   
- 슬라이드 배너 클릭시 예매사이트 이동 및 모달 라이브러리 사용  
  
(5) 정렬  
- 카테고리별 (Top,Bottom,Accessories) 정렬 가능  
- 좋아요 기준으로 HIT 카테고리 정렬  
  
(6) 상세페이지  
- 제품 클릭시 상세페이지로 이동   

(7) 마이페이지  
- 관리자 계정과 사용자 계정을 분기처리  
- 관리자 (정보수정,새제품등록)  
- 사용자 (정보수정,회원탈퇴,관심상품조회)  

(8) 기타  
- 로딩시 사용자 화면에 로딩상태 보여주기    
