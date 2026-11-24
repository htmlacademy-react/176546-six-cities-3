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

  it('применяет класс карточки места по умолчанию', () => {
    renderWrapper(<Price price={120} variant="place-card" />);

    expect(screen.getByTestId('price')).toHaveClass('place-card__price');
  });

  it('применяет класс страницы предложения для variant="offer"', () => {
    renderWrapper(<Price price={120} variant="offer" />);

    expect(screen.getByTestId('price')).toHaveClass('offer__price');
  });
});
