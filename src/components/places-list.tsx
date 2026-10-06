import PlaceCard from '@/components/place-card';
import type { OfferPreview } from '@/types/offer.ts';

type PlacesListProps = {
  offers: OfferPreview[];
  variant?: 'cities' | 'near-places';
  onCardHover?: (id: string | null) => void;
};

function PlacesList({ offers, variant = 'cities', onCardHover }: PlacesListProps): JSX.Element {
  const listClass =
    variant === 'cities' ? 'cities__places-list places__list' : 'near-places__list places__list';

  return (
    <div className={listClass}>
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} variant={variant} onCardHover={onCardHover} />
      ))}
    </div>
  );
}

export default PlacesList;
