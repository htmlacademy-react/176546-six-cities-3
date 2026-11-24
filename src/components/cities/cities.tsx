import { useState } from 'react';
import PlacesSection from '@/components/places-section';
import MapSection from '@/components/map-section';
import type { OfferPreview } from '@/types/offer';
import type { Location } from '@/types/city';

type CitiesProps = {
  offers: OfferPreview[];
  city: Location;
  cityName: string;
};

function Cities({ offers, city, cityName }: CitiesProps): JSX.Element {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <PlacesSection offers={offers} cityName={cityName} onCardHover={setHoveredId} />
        <MapSection city={city} offers={offers} selectedPointId={hoveredId ?? undefined} />
      </div>
    </div>
  );
}

export default Cities;
