import { createAction } from '@reduxjs/toolkit';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';

export const changeCity = createAction<CityName>('city/changeCity');

export const fillOffersList = createAction<OfferPreview[]>('offers/fillOffersList');
