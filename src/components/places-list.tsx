import PlaceCard from '@/components/place-card';
import type { Offer } from '@/mocks/offers';

type PlacesListProps = {
  offers: Offer[];
  variant?: 'cities' | 'near-places';
  activeOfferId?: number | null;
  onCardMouseEnter?: (id: number) => void;
  onCardMouseLeave?: () => void;
};

function PlacesList({
  offers,
  variant = 'cities',
  activeOfferId = null,
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
          isActive={offer.id === activeOfferId}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default PlacesList;
