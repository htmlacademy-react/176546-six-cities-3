import { memo } from 'react';
import PlacesList from '@/components/places-list';
import Sorting from '@/components/sorting';
import type { OfferPreview } from '@/types/offer';

type PlacesSectionProps = {
  offers: OfferPreview[];
  cityName: string;
  onCardHover: (id: string | null) => void;
};

function PlacesSectionView({ offers, cityName, onCardHover }: PlacesSectionProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers.length} places to stay in {cityName}
      </b>

      <Sorting />

      <PlacesList offers={offers} onCardHover={onCardHover} />
    </section>
  );
}

const PlacesSection = memo(PlacesSectionView);

export default PlacesSection;
