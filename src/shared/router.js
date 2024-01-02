import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Layout from '../components/Layout';
import ModifyPage from '../pages/ModifyPage';
import TopProductsList from '../pages/TopProductsList';
import AccProductsList from '../pages/AccProductsList';
import BottomProductsList from '../pages/BottomProductsList';
import HitProductsList from '../pages/HitProductsList';
import ProductDetail from '../pages/ProductDetail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/modify" element={<ModifyPage />} />
          <Route path="/top" element={<TopProductsList />} />
          <Route path="/acc" element={<AccProductsList />} />
          <Route path="/bottom" element={<BottomProductsList />} />
          <Route path="/hit" element={<HitProductsList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
