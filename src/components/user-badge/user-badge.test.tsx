import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import UserBadge from './user-badge';
import { makeFakeAuthInfo } from '@/utils/mocks';

const user = makeFakeAuthInfo({ name: 'Angelina' });

describe('UserBadge', () => {
  it('выводит имя пользователя', () => {
    renderWrapper(<UserBadge user={user} variant="offer" />);

    expect(screen.getByText('Angelina')).toBeInTheDocument();
  });

  it('подписывает аватар по-разному для оффера и отзыва', () => {
    const { rerender } = renderWrapper(<UserBadge user={user} variant="offer" />);
    expect(screen.getByAltText('Host avatar')).toBeInTheDocument();

    rerender(<UserBadge user={user} variant="reviews" />);
    expect(screen.getByAltText('Angelina avatar')).toBeInTheDocument();
  });

  it('показывает метку Pro только у PRO-пользователя', () => {
    const { rerender } = renderWrapper(<UserBadge user={user} variant="offer" />);
    expect(screen.queryByText('Pro')).not.toBeInTheDocument();

    rerender(<UserBadge user={{ ...user, isPro: true }} variant="offer" />);
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('задаёт размеры аватара под вариант использования', () => {
    const { rerender } = renderWrapper(<UserBadge user={user} variant="offer" />);
    expect(screen.getByAltText('Host avatar')).toHaveAttribute('width', '74');

    rerender(<UserBadge user={user} variant="reviews" />);
    expect(screen.getByAltText('Angelina avatar')).toHaveAttribute('width', '54');
  });
});
