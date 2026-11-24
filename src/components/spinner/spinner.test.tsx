import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner', () => {
  it('объявляет себя статусом для экранного диктора', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('показывает подпись по умолчанию', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading offers')).toBeInTheDocument();
  });

  it('показывает переданную подпись', () => {
    render(<Spinner label="Загружаем отзывы" />);

    expect(screen.getByText('Загружаем отзывы')).toBeInTheDocument();
    expect(screen.queryByText('Loading offers')).not.toBeInTheDocument();
  });
});
