import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import Price from './price';

describe('Price', () => {
  it('выводит цену и суффикс «за ночь» в карточке места', () => {
    renderWrapper(<Price price={120} variant="place-card" />);

    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText(/night/)).toBeInTheDocument();
  });

  it('выводит цену и суффикс «за ночь» на странице предложения', () => {
    renderWrapper(<Price price={999} variant="offer" />);

    expect(screen.getByText('€999')).toBeInTheDocument();
    expect(screen.getByText(/night/)).toBeInTheDocument();
  });
});
