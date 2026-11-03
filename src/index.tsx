import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { offerDetails } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { fetchOffersAction } from '@/store/api-actions';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offerDetails={offerDetails} reviews={reviews} />
    </Provider>
  </React.StrictMode>
);
