import { useEffect } from 'react';
import { AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAuthorizationStatus } from '@/store/slices/auth';
import { fetchFavoritesAction, getFavoritesStatus } from '@/store/slices/favorites';
import { RequestStatus } from '@/store/types';

export const useFavoritesBootstrap = (): void => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoritesStatus = useAppSelector(getFavoritesStatus);

  useEffect(() => {
    if (
      authorizationStatus === AuthorizationStatus.Auth &&
      favoritesStatus === RequestStatus.Idle
    ) {
      void dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, favoritesStatus, dispatch]);
};
