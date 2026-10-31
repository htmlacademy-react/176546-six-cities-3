import { createAction } from '@reduxjs/toolkit';
import type { SortType } from '@/const';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';

export const changeCity = createAction<CityName>('city/changeCity');

export const changeSortType = createAction<SortType>('sorting/changeSortType');

export const fillOffersList = createAction<OfferPreview[]>('offers/fillOffersList');
