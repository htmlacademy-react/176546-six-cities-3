import { authSlice } from '@/store/slices/auth';
import { favoritesSlice } from '@/store/slices/favorites';
import { notificationsSlice } from '@/store/slices/notifications';
import { offerSlice } from '@/store/slices/offer';
import { offersSlice } from '@/store/slices/offers';
import type { RootState } from '@/store';
import type { AuthInfo } from '@/types/user';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';
import { AuthorizationStatus } from '@/const';
import { RequestStatus } from '@/store/types';

export const extractActionsTypes = (actions: { type: string }[]): string[] =>
  actions.map(({ type }) => type);

export const makeFakeOfferPreview = (id = '1'): OfferPreview => ({
  id,
  title: 'Уютная студия',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  },
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  isFavorite: false,
  isPremium: false,
  rating: 4.8,
  previewImage: 'img/studio-01.jpg',
});

export const makeFakeOfferDetails = (id = '1'): OfferDetails => ({
  ...makeFakeOfferPreview(id),
  description: 'Просторная студия в центре',
  bedrooms: 2,
  goods: ['Wi-Fi', 'Kitchen'],
  host: { name: 'Angelina', avatarUrl: 'img/avatar.jpg', isPro: true },
  images: ['img/room-1.jpg', 'img/room-2.jpg'],
  maxAdults: 3,
});

export const makeFakeReview = (id = '1', comment = 'Всё понравилось'): Review => ({
  id,
  date: '2026-11-24T10:00:00.000Z',
  user: { name: 'Angelina', avatarUrl: 'img/avatar.jpg', isPro: true },
  comment,
  rating: 4,
});

export const makeFakeAuthInfo = (overrides: Partial<AuthInfo> = {}): AuthInfo => ({
  email: 'user@example.com',
  name: 'Angelina',
  avatarUrl: 'img/avatar.jpg',
  isPro: false,
  ...overrides,
});

export const makeFakeStore = (initialState: Partial<RootState> = {}): RootState => ({
  auth: authSlice.reducer(undefined, { type: '' }),
  favorites: favoritesSlice.reducer(undefined, { type: '' }),
  notifications: notificationsSlice.reducer(undefined, { type: '' }),
  offer: offerSlice.reducer(undefined, { type: '' }),
  offers: offersSlice.reducer(undefined, { type: '' }),
  ...initialState,
});

export const makeAuthState = (authorizationStatus: AuthorizationStatus): RootState['auth'] => ({
  ...makeFakeStore().auth,
  authorizationStatus,
});

export const makeOffersState = (offersStatus: RequestStatus): RootState['offers'] => ({
  ...makeFakeStore().offers,
  offersStatus,
});

export const makeFavoritesState = (favoritesStatus: RequestStatus): RootState['favorites'] => ({
  ...makeFakeStore().favorites,
  favoritesStatus,
});
