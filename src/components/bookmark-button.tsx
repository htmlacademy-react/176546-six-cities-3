import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAuthorizationStatus } from '@/store/slices/auth';
import { changeFavoriteAction } from '@/store/slices/offers';

type BookmarkButtonProps = {
  offerId: string;
  isFavorite: boolean;
  variant?: 'place-card' | 'offer';
};

function BookmarkButton({
  offerId,
  isFavorite,
  variant = 'place-card',
}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isPending, setIsPending] = useState(false);

  const buttonClass =
    variant === 'offer' ? 'offer__bookmark-button' : 'place-card__bookmark-button';
  const iconClass = variant === 'offer' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon';
  const iconWidth = variant === 'offer' ? 31 : 18;
  const iconHeight = variant === 'offer' ? 33 : 19;

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    if (isPending) {
      return;
    }

    setIsPending(true);
    dispatch(changeFavoriteAction({ offerId, status: !isFavorite }))
      .unwrap()
      .catch(() => undefined)
      .finally(() => setIsPending(false));
  };

  return (
    <button
      className={clsx(buttonClass, 'button', {
        [`${buttonClass}--active`]: isFavorite,
      })}
      type="button"
      onClick={handleClick}
      disabled={isPending}
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
