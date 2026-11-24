import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import PremiumBadge from './premium-badge';

describe('PremiumBadge', () => {
  it('выводит переданный текст в обоих вариантах', () => {
    const { rerender } = renderWrapper(<PremiumBadge text="Premium" />);

    expect(screen.getByText('Premium')).toBeInTheDocument();

    rerender(<PremiumBadge text="Premium" variant="offer" />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
