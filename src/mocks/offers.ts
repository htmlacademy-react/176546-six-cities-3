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

export const offers: Offer[] = [
  {
    id: 1,
    isPremium: true,
    price: 120,
    rating: 4.0,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    bedrooms: 3,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    images: [
      { id: 1, src: 'img/room.jpg' },
      { id: 2, src: 'img/apartment-01.jpg' },
      { id: 3, src: 'img/apartment-02.jpg' },
      { id: 4, src: 'img/apartment-03.jpg' },
      { id: 5, src: 'img/studio-01.jpg' },
      { id: 6, src: 'img/apartment-01.jpg' },
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    previewImage: 'img/apartment-01.jpg',
    city: 'Amsterdam',
  },
  {
    id: 2,
    isPremium: false,
    price: 80,
    rating: 4.8,
    title: 'Wooden house near the forest',
    type: 'House',
    description:
      'A cozy wooden house surrounded by pine trees. Perfect for a quiet weekend away from the city noise. Fireplace, terrace and a large garden are at your disposal.',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Fireplace', 'Free parking'],
    images: [
      { id: 1, src: 'img/apartment-02.jpg' },
      { id: 2, src: 'img/room.jpg' },
      { id: 3, src: 'img/apartment-small-04.jpg' },
    ],
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    previewImage: 'img/apartment-02.jpg',
    city: 'Amsterdam',
  },
  {
    id: 3,
    isPremium: true,
    price: 200,
    rating: 4.5,
    title: 'Modern loft in the city center',
    type: 'Apartment',
    description:
      'Stylish loft in the very heart of the city. High ceilings, panoramic windows and designer furniture. Everything you need for a comfortable stay is within walking distance.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Dishwasher', 'Coffee machine', 'Air conditioning', 'Elevator'],
    images: [
      { id: 1, src: 'img/apartment-03.jpg' },
      { id: 2, src: 'img/studio-01.jpg' },
      { id: 3, src: 'img/apartment-01.jpg' },
    ],
    host: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    previewImage: 'img/apartment-03.jpg',
    city: 'Amsterdam',
  },
  {
    id: 4,
    isPremium: false,
    price: 60,
    rating: 3.6,
    title: 'Cozy studio for two',
    type: 'Room',
    description:
      'Small but very clean and well-equipped studio. Ideal for a couple or a solo traveler. Located in a quiet district with easy access to public transport.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Towels', 'Heating', 'Kitchen', 'Fridge'],
    images: [
      { id: 1, src: 'img/apartment-small-04.jpg' },
      { id: 2, src: 'img/room.jpg' },
      { id: 3, src: 'img/studio-01.jpg' },
    ],
    host: {
      name: 'Liam',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    previewImage: 'img/apartment-small-04.jpg',
    city: 'Amsterdam',
  },
];
