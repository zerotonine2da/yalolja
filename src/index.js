import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GlobalStyle} from './GlobalStyle';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';
//import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </>,
);
