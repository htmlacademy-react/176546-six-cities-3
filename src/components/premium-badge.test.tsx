import { render, screen } from '@testing-library/react';
import PremiumBadge from './premium-badge';

describe('PremiumBadge', () => {
  it('выводит переданный текст', () => {
    render(<PremiumBadge text="Premium" />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('по умолчанию использует класс карточки места', () => {
    const { container } = render(<PremiumBadge text="Premium" />);

    expect(container.querySelector('.place-card__mark')).not.toBeNull();
    expect(container.querySelector('.offer__mark')).toBeNull();
  });

  it('использует класс оффера при variant="offer"', () => {
    const { container } = render(<PremiumBadge text="Premium" variant="offer" />);

    expect(container.querySelector('.offer__mark')).not.toBeNull();
    expect(container.querySelector('.place-card__mark')).toBeNull();
  });
});
