import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import { listOffers, offerDetail } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { cities } from './mocks/cities';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App offers={listOffers} offerDetail={offerDetail} reviews={reviews} cities={cities} />
  </React.StrictMode>
);
