import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import { makeFakeOfferPreview, makeFakeStore } from '@/test-utils/mocks';
import BookmarkButton from './bookmark-button';

const offersState = (offers: ReturnType<typeof makeFakeOfferPreview>[]) => ({
  offers: { ...makeFakeStore().offers, offers },
});

const favoritesState = (favoriteIds: string[]) => ({
  favorites: { ...makeFakeStore().favorites, favoriteIds },
});

describe('BookmarkButton', () => {
  it('активна, если предложение помечено избранным', () => {
    renderWrapper(<BookmarkButton offerId="1" />, {
      initialState: offersState([{ ...makeFakeOfferPreview('1'), isFavorite: true }]),
    });

    expect(screen.getByRole('button', { name: 'In bookmarks' })).toHaveClass(
      'place-card__bookmark-button--active'
    );
  });

  it('не активна, если предложение не помечено', () => {
    renderWrapper(<BookmarkButton offerId="1" />, {
      initialState: offersState([{ ...makeFakeOfferPreview('1'), isFavorite: false }]),
    });

    expect(screen.getByRole('button', { name: 'To bookmarks' })).not.toHaveClass(
      'place-card__bookmark-button--active'
    );
  });

  it('активна по списку избранного, когда предложения нет в списке', () => {
    renderWrapper(<BookmarkButton offerId="1" />, {
      initialState: favoritesState(['1']),
    });

    expect(screen.getByRole('button', { name: 'In bookmarks' })).toHaveClass(
      'place-card__bookmark-button--active'
    );
  });
});
