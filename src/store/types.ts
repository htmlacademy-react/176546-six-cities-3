import type { AuthorizationStatus, SortType } from '@/const';
import type { CityName } from '@/types/city';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import type { AuthInfo } from '@/types/user';

export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
  loginStatus: RequestStatus;
  loginError: string;
};

export type OffersState = {
  city: CityName;
  offers: OfferPreview[];
  sortType: SortType;
  offersStatus: RequestStatus;
};

export type OfferState = {
  offer: OfferDetails | null;
  nearby: OfferPreview[];
  comments: Review[];
  offerStatus: RequestStatus;
  nearbyStatus: RequestStatus;
  commentStatus: RequestStatus;
  commentError: string;
  isNotFound: boolean;
};

export type State = {
  auth: AuthState;
  offers: OffersState;
  offer: OfferState;
};
