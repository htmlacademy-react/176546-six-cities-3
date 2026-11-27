import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NotFoundPage from './not-found-page';

const ThrowNotFound = () => {
  throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
};

const renderNotFound = (initialIndex: number) => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <p>Главная страница</p> },
      { path: '/broken', element: <ThrowNotFound />, errorElement: <NotFoundPage /> },
    ],
    { initialEntries: ['/', '/broken'], initialIndex }
  );

  render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );

  return router;
};

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('показывает 404 и текст ошибки из маршрута', async () => {
    renderNotFound(1);

    expect(await screen.findByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute('href', '/');
  });

  it('возвращает на предыдущую страницу по кнопке Back', async () => {
    const router = renderNotFound(1);

    await userEvent.click(await screen.findByRole('button', { name: 'Back' }));

    expect(await screen.findByText('Главная страница')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/');
  });
});
