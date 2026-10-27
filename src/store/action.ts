import { createAction } from '@reduxjs/toolkit';
import { CityName } from '@/types/city';
import { OfferPreview } from '@/types/offer';

export const changeCity = createAction<CityName>('city/changeCity');

export const fillOffersList = createAction<OfferPreview[]>('offers/fillOffersList');
