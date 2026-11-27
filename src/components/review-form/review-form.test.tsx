import { screen } from '@testing-library/react';
import { RequestStatus } from '@/store/types';
import { renderWrapper } from '@/test-utils/render';
import { makeFakeStore } from '@/test-utils/mocks';
import ReviewForm from './review-form';
import type { OfferState } from '@/store/slices/offer/offer-slice';

const renderForm = (offer: Partial<OfferState> = {}) => {
  const initialState = makeFakeStore();

  return renderWrapper(<ReviewForm offerId="1" />, {
    initialState: { offer: { ...initialState.offer, ...offer } },
  });
};

describe('ReviewForm', () => {
  it('показывает текст ошибки сервера отдельным абзацем', () => {
    renderForm({ commentStatus: RequestStatus.Failed, commentError: 'Server is down' });

    const alert = screen.getByRole('alert');

    expect(alert).toHaveTextContent('Server is down');
    expect(alert.tagName).toBe('P');
  });

  it('не задаёт цвет инлайновым стилем — только классом', () => {
    renderForm({ commentStatus: RequestStatus.Failed, commentError: 'Server is down' });

    const alert = screen.getByRole('alert');

    expect(alert).not.toHaveAttribute('style');
    expect(alert.className).toContain('reviews__help');
  });

  it('не показывает абзац ошибки, пока ошибки нет', () => {
    renderForm({ commentStatus: RequestStatus.Idle, commentError: '' });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
