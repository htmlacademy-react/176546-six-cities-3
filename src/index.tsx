import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { checkAuthAction } from '@/store/slices/auth';
import { fetchOffersAction } from '@/store/slices/entities/offers';
import Notifications from '@/components/notifications/notifications';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Notifications />
      <ToastContainer position="top-right" autoClose={5000} />
    </Provider>
  </React.StrictMode>
);
