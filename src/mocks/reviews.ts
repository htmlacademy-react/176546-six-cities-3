export type Review = {
  id: number;
  offerId: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    offerId: 1,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4,
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
  {
    id: 2,
    offerId: 1,
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    rating: 5,
    comment:
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    date: '2019-05-12',
  },
  {
    id: 3,
    offerId: 2,
    user: {
      name: 'Oliver',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 3,
    comment:
      'Nice place, but a bit noisy at night. The host was friendly and the apartment was clean. Would come back again.',
    date: '2019-06-03',
  },
  {
    id: 4,
    offerId: 3,
    user: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    rating: 5,
    comment:
      'Perfect loft in the heart of the city. Stylish interior, everything you need is within walking distance. Highly recommend!',
    date: '2019-07-18',
  },
  {
    id: 5,
    offerId: 4,
    user: {
      name: 'Liam',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4,
    comment:
      'Cozy studio, ideal for a couple. Small but very clean and well-equipped. Great value for money.',
    date: '2019-08-02',
  },
];
