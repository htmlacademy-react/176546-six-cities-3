import PlacesList from '@/components/places-list';
import Sorting from '@/components/sorting';
import Map from '@/components/map';
import type { OfferPreview } from '@/types/offer.ts';
import type { Location } from '@/types/city.ts';

type CitiesProps = {
  offers: OfferPreview[];
  placesCount: number;
  city: Location;
  cityName: string;
};

function Cities({ offers, placesCount, city, cityName }: CitiesProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {placesCount} places to stay in {cityName}
          </b>

          <Sorting />

          <PlacesList offers={offers} />
        </section>
        <div className="cities__right-section">
          <Map className="cities__map" city={city} offers={offers} />
        </div>
      </div>
    </div>
  );
}

export default Cities;
