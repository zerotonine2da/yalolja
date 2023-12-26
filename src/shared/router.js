import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
