import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import PremiumBadge from './premium-badge';

describe('PremiumBadge', () => {
  it('выводит переданный текст', () => {
    renderWrapper(<PremiumBadge text="Premium" />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('применяет класс карточки места по умолчанию', () => {
    renderWrapper(<PremiumBadge text="Premium" />);

    expect(screen.getByTestId('premium-badge')).toHaveClass('place-card__mark');
  });

  it('применяет класс оффера для variant="offer"', () => {
    renderWrapper(<PremiumBadge text="Premium" variant="offer" />);

    expect(screen.getByTestId('premium-badge')).toHaveClass('offer__mark');
  });
});
