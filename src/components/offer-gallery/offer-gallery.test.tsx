import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import OfferGallery from './offer-gallery';

const makeImages = (count: number) =>
  Array.from({ length: count }, (_, index) => `img/room-${index + 1}.jpg`);

describe('OfferGallery', () => {
  it('показывает не больше шести фотографий', () => {
    renderWrapper(<OfferGallery images={makeImages(9)} />);

    expect(screen.getAllByRole('img')).toHaveLength(6);
  });

  it('показывает все фотографии, если их меньше шести', () => {
    renderWrapper(<OfferGallery images={makeImages(3)} />);

    expect(screen.getAllByRole('img')).toHaveLength(3);
  });
});
