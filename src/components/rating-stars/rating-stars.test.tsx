import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import RatingStars from './rating-stars';
import { getRatingWidth } from '@/utils';

describe('RatingStars', () => {
  it('показывает скрытую подпись для экранного диктора', () => {
    renderWrapper(<RatingStars rating={4} variant="place-card" />);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('задаёт ширину заливки звёзд по рейтингу', () => {
    renderWrapper(<RatingStars rating={4} variant="place-card" />);

    expect(screen.getByTestId('rating-stars-fill').style.width).toBe(getRatingWidth(4));
  });

  it('выводит числовое значение рейтинга только в карточке предложения', () => {
    const { rerender } = renderWrapper(<RatingStars rating={4.8} variant="offer" />);

    expect(screen.getByText('4.8')).toBeInTheDocument();

    rerender(<RatingStars rating={4.8} variant="place-card" />);

    expect(screen.queryByText('4.8')).not.toBeInTheDocument();
  });
});
