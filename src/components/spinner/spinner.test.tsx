import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import Spinner from './spinner';

describe('Spinner', () => {
  it('объявляет себя статусом для экранного диктора', () => {
    renderWrapper(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('показывает подпись по умолчанию', () => {
    renderWrapper(<Spinner />);

    expect(screen.getByText('Loading offers')).toBeInTheDocument();
  });

  it('показывает переданную подпись', () => {
    renderWrapper(<Spinner label="Загружаем отзывы" />);

    expect(screen.getByText('Загружаем отзывы')).toBeInTheDocument();
    expect(screen.queryByText('Loading offers')).not.toBeInTheDocument();
  });
});
