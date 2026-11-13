import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchOfferAction,
  postCommentAction,
} from '@/store/slices/entities/offers';
import { RequestStatus } from '@/store/types';
import type { Review } from '@/types/review';

export type OfferPageState = {
  currentId: string | null;
  nearbyIds: string[];
  comments: Review[];
  offerStatus: RequestStatus;
  commentStatus: RequestStatus;
  commentError: string;
  isNotFound: boolean;
};

const initialState: OfferPageState = {
  currentId: null,
  nearbyIds: [],
  comments: [],
  offerStatus: RequestStatus.Idle,
  commentStatus: RequestStatus.Idle,
  commentError: '',
  isNotFound: false,
};

export const offerPageSlice = createSlice({
  name: 'offerPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state, action) => {
        state.currentId = action.meta.arg;
        state.nearbyIds = [];
        state.comments = [];
        state.offerStatus = RequestStatus.Loading;
        state.isNotFound = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentId = action.payload.id;
        state.offerStatus = RequestStatus.Success;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.offerStatus = RequestStatus.Failed;
        state.isNotFound = Boolean(action.payload);
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearbyIds = action.payload.map((offer) => offer.id);
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.commentStatus = RequestStatus.Loading;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentStatus = RequestStatus.Success;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.commentStatus = RequestStatus.Failed;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.commentStatus = RequestStatus.Loading;
        state.commentError = '';
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
        state.commentStatus = RequestStatus.Success;
      })
      .addCase(postCommentAction.rejected, (state, action) => {
        state.commentStatus = RequestStatus.Failed;
        state.commentError = action.payload ?? 'Could not send the review. Please try again.';
      });
  },
});
