import { screen } from '@testing-library/react';
import Logo from './logo';
import { renderWrapper } from '@/test-utils/render';

describe('Logo', () => {
  it('ссылается на главную страницу', () => {
    renderWrapper(<Logo type="header" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('показывает логотип с описанием', () => {
    renderWrapper(<Logo type="header" />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('использует размеры под шапку и подвал', () => {
    const { rerender } = renderWrapper(<Logo type="header" />);
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('width', '81');
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('height', '41');

    rerender(<Logo type="footer" />);
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('width', '64');
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('height', '33');
  });
});
