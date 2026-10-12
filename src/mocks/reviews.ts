import type { Review } from '@/types/review.ts';

export type ReviewMock = Review & {
  offerId: string;
};

export const reviews: ReviewMock[] = [
  {
    id: '979421ee-5e87-4b5c-83ac-5deb7e0dd857',
    offerId: 'bf6a1125-15aa-470e-a764-b975bd7dcd26',
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
    id: 'f62ce484-5b52-40bc-a10a-8694a8ceca3c',
    offerId: 'bf6a1125-15aa-470e-a764-b975bd7dcd26',
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
    id: '5b6729a0-2879-410a-8fdc-0070f1ecb4e9',
    offerId: '5b9b3675-e5cb-499e-9242-5cad57f1f39b',
    user: {
      name: 'Liam',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 3,
    comment:
      'Nice place, but a bit noisy at night. The host was friendly and the apartment was clean. Would come back again.',
    date: '2019-06-03T09:30:00.000Z',
  },
  {
    id: '39c08a2f-92f6-4f30-b049-aa329d8555af',
    offerId: '5e2786df-644e-4dfa-b22e-ed899bd7b1a3',
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
    id: 'cd162155-f422-47a0-9747-653f89b1ccfe',
    offerId: '8c8b89fd-4233-4be1-9c51-38584afbd89a',
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    rating: 4,
    comment:
      'Cozy studio, ideal for a couple. Small but very clean and well-equipped. Great value for money.',
    date: '2019-08-02T11:20:00.000Z',
  },
  {
    id: 'a668d7f7-ce54-4883-86f3-2659c0917a95',
    offerId: 'ce689f5a-8656-40af-81b5-aa8c8fc322fb',
    user: {
      name: 'Jonas',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 5,
    comment:
      'The attic room is small but very warm, and the hosts helped us with everything. Breakfast was a nice bonus.',
    date: '2019-08-19T07:40:00.000Z',
  },
  {
    id: '92ab26dc-abe3-4c4c-bbfc-60cfdae97055',
    offerId: 'e0c146dd-b9d9-4287-ae5f-4b0e32b24ac2',
    user: {
      name: 'Camille',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    rating: 4,
    comment:
      'Bright apartment, exactly as on the photos. The balcony is small but the view of the rooftops is worth it.',
    date: '2019-09-05T16:12:00.000Z',
  },
  {
    id: 'f454246b-a01a-45e1-99ff-8903b46c2d15',
    offerId: '2f46edde-d120-41af-9c2f-6bbcfcb123a9',
    user: {
      name: 'Lucas',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    rating: 5,
    comment:
      'The location cannot be better — the square is right outside the windows. Spacious and clean, we will come back.',
    date: '2019-09-27T12:03:00.000Z',
  },
  {
    id: 'b25aa3a4-08de-4e54-8355-a15bb390d307',
    offerId: '83ce555d-da07-4c86-b293-ab3b94328c5e',
    user: {
      name: 'Emma',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    rating: 4,
    comment:
      'Quiet street, comfortable bed, fast internet. The balcony was a pleasant surprise in the morning.',
    date: '2019-10-14T08:55:00.000Z',
  },
];
