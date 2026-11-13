import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAuthorizationStatus } from '@/store/slices/auth';
import { selectFavoritesIds, selectPendingIds } from '@/store/slices/favorites';
import { changeFavoriteAction } from '@/store/slices/offers';

type BookmarkButtonProps = {
  offerId: string;
  variant?: 'place-card' | 'offer';
};

const BUTTON_CLASSES = {
  'place-card': 'place-card__bookmark-button',
  offer: 'offer__bookmark-button',
};

const ICON_CLASSES = {
  'place-card': 'place-card__bookmark-icon',
  offer: 'offer__bookmark-icon',
};

const ICON_SIZES = {
  'place-card': { width: 18, height: 19 },
  offer: { width: 31, height: 33 },
};

function BookmarkButton({ offerId, variant = 'place-card' }: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFavorite = useAppSelector(selectFavoritesIds).has(offerId);
  const isPending = useAppSelector(selectPendingIds).has(offerId);

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);

      return;
    }

    void dispatch(changeFavoriteAction({ offerId, status: !isFavorite }));
  };

  const buttonClass = BUTTON_CLASSES[variant];
  const { width, height } = ICON_SIZES[variant];

  return (
    <button
      className={clsx(buttonClass, 'button', {
        [`${buttonClass}--active`]: isFavorite,
      })}
      type="button"
      onClick={handleClick}
      disabled={isPending}
    >
      <svg className={ICON_CLASSES[variant]} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
