import type { City, Location } from '@/types/city.ts';
import type { HostInfo } from '@/types/host.ts';

export type OfferMinimum = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferPreview = OfferMinimum & {
  previewImage: string;
};

type OfferDetails = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostInfo;
  images: string[];
  maxAdults: number;
};

export type Offer = OfferMinimum & OfferDetails;

export type OfferMaximum = OfferPreview & OfferDetails;

export type OfferMaximumFavorite = OfferMaximum & {
  isFavorite: boolean;
};
