import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { listOffers, offerDetails } from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App offers={listOffers} offerDetails={offerDetails} reviews={reviews} />
  </React.StrictMode>
);
