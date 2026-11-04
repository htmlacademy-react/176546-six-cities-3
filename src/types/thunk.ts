import type { AxiosInstance } from 'axios';
import type { AppDispatch, RootState } from '@/store';

export type ThunkOptions = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};
