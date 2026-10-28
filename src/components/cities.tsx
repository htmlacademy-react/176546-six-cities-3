import { useState } from 'react';
import type { ReactNode } from 'react';
import PlacesList from '@/components/places-list';
import Map from '@/components/map';
import type { OfferPreview } from '@/types/offer';
import type { Location } from '@/types/city';

type CitiesProps = {
  offers: OfferPreview[];
  placesCount: number;
  city: Location;
  cityName: string;
  sorting: ReactNode;
};

function Cities({ offers, placesCount, city, cityName, sorting }: CitiesProps): JSX.Element {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {placesCount} places to stay in {cityName}
          </b>

          {sorting}

          <PlacesList offers={offers} onCardHover={setHoveredId} />
        </section>
        <div className="cities__right-section">
          <Map
            className="cities__map"
            city={city}
            offers={offers}
            selectedPointId={hoveredId ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default Cities;
