import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './logo';

describe('Logo', () => {
  it('ссылается на главную страницу', () => {
    render(
      <MemoryRouter>
        <Logo type="header" />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('показывает логотип с описанием', () => {
    render(
      <MemoryRouter>
        <Logo type="header" />
      </MemoryRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('использует размеры под шапку и подвал', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Logo type="header" />
      </MemoryRouter>
    );
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('width', '81');
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('height', '41');

    rerender(
      <MemoryRouter>
        <Logo type="footer" />
      </MemoryRouter>
    );
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('width', '64');
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('height', '33');
  });
});
