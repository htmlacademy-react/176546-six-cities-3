import type { Review } from '@/types/review.ts';

export type ReviewMock = Review & {
  offerId: string;
};

export const reviews: ReviewMock[] = [
  {
    id: 'd4e5f6a7-b8c9-4d0e-9f1a-2b3c4d5e6f70',
    offerId: 'e9a1f6c2-3b4d-4e5f-8a7b-1c2d3e4f5a6b',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4,
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24T10:13:56.569Z',
  },
  {
    id: 'e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7081',
    offerId: 'e9a1f6c2-3b4d-4e5f-8a7b-1c2d3e4f5a6b',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    rating: 5,
    comment:
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    date: '2019-05-12T14:05:00.000Z',
  },
  {
    id: 'f6a7b8c9-d0e1-4f2a-9b3c-4d5e6f708192',
    offerId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    user: {
      name: 'Oliver',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 3,
    comment:
      'Nice place, but a bit noisy at night. The host was friendly and the apartment was clean. Would come back again.',
    date: '2019-06-03T09:30:00.000Z',
  },
  {
    id: 'a7b8c9d0-e1f2-4a3b-8c4d-5e6f708192a3',
    offerId: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    user: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    rating: 5,
    comment:
      'Perfect loft in the heart of the city. Stylish interior, everything you need is within walking distance. Highly recommend!',
    date: '2019-07-18T18:45:00.000Z',
  },
  {
    id: 'b8c9d0e1-f2a3-4b4c-9d5e-6f708192a3b4',
    offerId: 'c3d4e5f6-a7b8-4c9d-8e1f-2a3b4c5d6e7f',
    user: {
      name: 'Liam',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4,
    comment:
      'Cozy studio, ideal for a couple. Small but very clean and well-equipped. Great value for money.',
    date: '2019-08-02T11:20:00.000Z',
  },
];
