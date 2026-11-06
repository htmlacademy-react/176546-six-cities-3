import { createAction } from '@reduxjs/toolkit';
import type { AuthorizationStatus, SortType } from '@/const';
import type { CityName } from '@/types/city';
import type { AuthInfo } from '@/types/user';

export const changeCity = createAction<CityName>('city/changeCity');

export const changeSortType = createAction<SortType>('sorting/changeSortType');

export const changeAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/changeAuthorizationStatus'
);

export const changeUser = createAction<AuthInfo | null>('user/changeUser');
