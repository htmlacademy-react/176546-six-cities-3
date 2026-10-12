import PlacesList from '@/components/places-list';
import Sorting from '@/components/sorting';
import Map from '@/components/map';
import type { OfferPreview } from '@/types/offer.ts';

type CitiesProps = {
  offers: OfferPreview[];
  placesCount: number;
};

function Cities({ offers, placesCount }: CitiesProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{placesCount} places to stay in Amsterdam</b>

          <Sorting />

          <PlacesList offers={offers} />
        </section>
        <div className="cities__right-section">
          <Map className="cities__map" />
        </div>
      </div>
    </div>
  );
}

export default Cities;
