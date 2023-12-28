import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Layout from '../components/Layout';
import ModifyPage from '../pages/ModifyPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/modify" element={<ModifyPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
