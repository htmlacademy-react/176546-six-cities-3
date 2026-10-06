import PlaceCard from '@/components/place-card';
import type { OfferPreview } from '@/types/offer.ts';

type PlacesListProps = {
  offers: OfferPreview[];
  variant?: 'cities' | 'near-places';
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
};

function PlacesList({
  offers,
  variant = 'cities',
  onCardMouseEnter,
  onCardMouseLeave,
}: PlacesListProps): JSX.Element {
  const listClass =
    variant === 'cities'
      ? 'cities__places-list places__list tabs__content'
      : 'near-places__list places__list';

  return (
    <div className={listClass}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default PlacesList;
