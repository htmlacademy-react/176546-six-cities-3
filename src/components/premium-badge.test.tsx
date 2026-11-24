import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import PremiumBadge from './premium-badge';

describe('PremiumBadge', () => {
  it('выводит переданный текст', () => {
    renderWrapper(<PremiumBadge text="Premium" />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('по умолчанию использует класс карточки места', () => {
    const { container } = renderWrapper(<PremiumBadge text="Premium" />);

    expect(container.querySelector('.place-card__mark')).not.toBeNull();
    expect(container.querySelector('.offer__mark')).toBeNull();
  });

  it('использует класс оффера при variant="offer"', () => {
    const { container } = renderWrapper(<PremiumBadge text="Premium" variant="offer" />);

    expect(container.querySelector('.offer__mark')).not.toBeNull();
    expect(container.querySelector('.place-card__mark')).toBeNull();
  });
});
