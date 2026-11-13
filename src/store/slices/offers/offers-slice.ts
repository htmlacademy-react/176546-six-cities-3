import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CITIES, SORT_OPTIONS } from '@/const';
import type { SortType } from '@/const';
import { fetchOffersAction } from '@/store/slices/offers/offers-api-actions';
import { RequestStatus } from '@/store/types';
import type { OffersState } from '@/store/types';
import type { CityName } from '@/types/city';

const initialState: OffersState = {
  city: CITIES[0].name,
  offers: [],
  sortType: SORT_OPTIONS.Popular,
  offersStatus: RequestStatus.Idle,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<CityName>) {
      state.city = action.payload;
    },
    changeSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersStatus = RequestStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersStatus = RequestStatus.Failed;
      });
  },
});

export const { changeCity, changeSortType } = offersSlice.actions;
