import type { City, Location } from '@/types/city.ts';
import type { HostInfo } from '@/types/host.ts';

export type OfferBase = {
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

export type OfferPreview = OfferBase & {
  previewImage: string;
};

export type OfferDetails = OfferBase & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostInfo;
  images: string[];
  maxAdults: number;
};
