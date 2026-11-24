import { render, screen } from '@testing-library/react';
import Price from './price';

describe('Price', () => {
  it('выводит цену в евро', () => {
    render(<Price price={120} variant="place-card" />);

    expect(screen.getByText('€120')).toBeInTheDocument();
  });

  it('показывает суффикс «за ночь» для карточки места', () => {
    const { container } = render(<Price price={120} variant="place-card" />);

    expect(container.querySelector('.place-card__price-text')?.textContent).toContain('night');
  });

  it('показывает суффикс «за ночь» для карточки предложения', () => {
    const { container } = render(<Price price={999} variant="offer" />);

    expect(container.querySelector('.offer__price-value')?.textContent).toBe('€999');
    expect(container.querySelector('.offer__price-text')?.textContent).toContain('night');
  });

  it('применяет классы под вариант использования', () => {
    const { container } = render(<Price price={120} variant="offer" />);

    expect(container.querySelector('.offer__price')).not.toBeNull();
    expect(container.querySelector('.place-card__price')).toBeNull();
  });
});
