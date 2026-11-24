import { selectFavoriteFlags } from './favorites-selectors';
import { makeFakeOfferDetails, makeFakeOfferPreview, makeFakeStore } from '@/test-utils/mocks';

const makeState = (favoriteIds: string[], offers: ReturnType<typeof makeFakeOfferPreview>[]) =>
  makeFakeStore({
    favorites: { ...makeFakeStore().favorites, favoriteIds },
    offers: { ...makeFakeStore().offers, offers },
  });

describe('selectFavoriteFlags', () => {
  it('ставит отметку по списку избранного', () => {
    const state = makeState(['1'], []);

    expect(selectFavoriteFlags(state).get('1')).toBe(true);
  });

  it('перекрывает отметку полем предложения', () => {
    const state = makeState(['1'], [{ ...makeFakeOfferPreview('1'), isFavorite: false }]);

    expect(selectFavoriteFlags(state).get('1')).toBe(false);
  });

  it('отдаёт приоритет загруженному офферу', () => {
    const state = makeFakeStore({
      favorites: { ...makeFakeStore().favorites, favoriteIds: ['1'] },
      offer: {
        ...makeFakeStore().offer,
        offer: { ...makeFakeOfferDetails('1'), isFavorite: false },
      },
    });

    expect(selectFavoriteFlags(state).get('1')).toBe(false);
  });

  it('не возвращает отметку для незнакомого предложения', () => {
    const state = makeState([], []);

    expect(selectFavoriteFlags(state).get('42')).toBeUndefined();
  });
});
