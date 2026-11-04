import { createAction } from '@reduxjs/toolkit';
import type { SortType } from '@/const';
import type { CityName } from '@/types/city';

export const changeCity = createAction<CityName>('city/changeCity');

export const changeSortType = createAction<SortType>('sorting/changeSortType');
