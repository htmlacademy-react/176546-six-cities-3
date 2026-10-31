import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { listOffers, offerDetails } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { fillOffersList } from '@/store/action';

store.dispatch(fillOffersList(listOffers));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={listOffers} offerDetails={offerDetails} reviews={reviews} />
    </Provider>
  </React.StrictMode>
);
