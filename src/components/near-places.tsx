import PlacesList from '@/components/places-list';
import type { OfferPreview } from '@/types/offer';

type NearPlacesProps = {
  offers: OfferPreview[];
};

function NearPlaces({ offers }: NearPlacesProps): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <PlacesList offers={offers} variant="near-places" />
      </section>
    </div>
  );
}

export default NearPlaces;
