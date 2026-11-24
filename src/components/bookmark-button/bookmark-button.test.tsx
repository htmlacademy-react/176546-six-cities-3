import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import { makeFakeStore } from '@/test-utils/mocks';
import BookmarkButton from './bookmark-button';

const favoritesState = (favoriteIds: string[]) => ({
  favorites: { ...makeFakeStore().favorites, favoriteIds },
});

describe('BookmarkButton', () => {
  it('активна, если предложение есть в избранном', () => {
    renderWrapper(<BookmarkButton offerId="1" />, { initialState: favoritesState(['1']) });

    expect(screen.getByRole('button', { name: 'In bookmarks' })).toHaveClass(
      'place-card__bookmark-button--active'
    );
  });

  it('не активна, если предложения нет в избранном', () => {
    renderWrapper(<BookmarkButton offerId="1" />, { initialState: favoritesState([]) });

    expect(screen.getByRole('button', { name: 'To bookmarks' })).not.toHaveClass(
      'place-card__bookmark-button--active'
    );
  });
});
