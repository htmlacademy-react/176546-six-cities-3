import Map from '@/components/map/map.tsx';
import type { Location } from '@/types/city';
import type { OfferPreview } from '@/types/offer';

type MapSectionProps = {
  city: Location;
  offers: OfferPreview[];
  selectedPointId?: string;
};

function MapSection({ city, offers, selectedPointId }: MapSectionProps): JSX.Element {
  return (
    <div className="cities__right-section">
      <Map
        className="cities__map"
        city={city}
        offers={offers}
        selectedPointId={selectedPointId}
      />
    </div>
  );
}

export default MapSection;
