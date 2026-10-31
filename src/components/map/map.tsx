import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '@/hooks/useMap';
import { MARKER_HEIGHT, MARKER_WIDTH, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from './const';
import type { Location } from '@/types/city';
import type { MapOffer } from '@/types/map';

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
  iconAnchor: [MARKER_WIDTH / 2, MARKER_HEIGHT],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
  iconAnchor: [MARKER_WIDTH / 2, MARKER_HEIGHT],
});

type MapProps = {
  className: string;
  city: Location;
  offers: MapOffer[];
  selectedPointId?: string;
};

function Map({ className, city, offers, selectedPointId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (!map) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = offers.map((offer) =>
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: offer.id === selectedPointId ? currentCustomIcon : defaultCustomIcon,
        })
        .addTo(map)
    );
  }, [map, offers, selectedPointId]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (offers.length === 0) {
      map.setView([city.latitude, city.longitude], city.zoom);
      return;
    }

    const bounds = leaflet.latLngBounds(
      offers.map((offer) => [offer.location.latitude, offer.location.longitude])
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: city.zoom });
  }, [map, city, offers]);

  return (
    <section className={clsx(className, 'map')}>
      <div className="map__inner" ref={mapRef} style={{ height: '100%', minHeight: 500 }}></div>
    </section>
  );
}

export default Map;
