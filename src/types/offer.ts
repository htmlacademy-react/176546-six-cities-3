export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferImage = {
  id: number;
  src: string;
};

export type Offer = {
  id: number;
  isPremium: boolean;
  price: number;
  rating: number;
  title: string;
  type: string;
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  images: OfferImage[];
  host: User;
  previewImage: string;
  city: string;
};
