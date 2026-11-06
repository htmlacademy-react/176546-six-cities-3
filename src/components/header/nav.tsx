import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutAction } from '@/store/api-actions';
import { getAuthorizationStatus, getFavoriteCount, getUser } from '@/store/selectors';

function Nav(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoriteCount = useAppSelector(getFavoriteCount);
  const dispatch = useAppDispatch();

  const handleSignOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <nav className="header__nav" />;
  }

  if (authorizationStatus !== AuthorizationStatus.Auth || !user) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div
              className="header__avatar-wrapper user__avatar-wrapper"
              style={{ backgroundImage: `url(${user.avatarUrl})` }}
            />
            <span className="header__user-name user__name">{user.email}</span>
            <span className="header__favorite-count">{favoriteCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#" onClick={handleSignOut}>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
