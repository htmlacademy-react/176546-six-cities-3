import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAuthorizationStatus } from '@/store/slices/auth';
import { changeFavoriteAction } from '@/store/slices/offers';

type FavoriteToggleParams = {
  offerId: string;
  isFavorite: boolean;
};

export const useFavoriteToggle = ({ offerId, isFavorite }: FavoriteToggleParams) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isPending, setIsPending] = useState(false);

  const toggleFavorite = () => {
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

  return { isPending, toggleFavorite };
};
