import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '@/hooks/use-map.ts';
import { MARKER_HEIGHT, MARKER_WIDTH, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from './const';
import type { Location } from '@/types/city';
import type { MapOffer } from '@/types/map';

type Point = [number, number];

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
  const markersRef = useRef(new globalThis.Map<string, leaflet.Marker>());

  const points: Point[] = offers.map((offer) => [offer.location.latitude, offer.location.longitude]);
  const pointsKey = points.map(([latitude, longitude]) => `${latitude},${longitude}`).join('|');
  const pointsRef = useRef<Point[]>(points);
  pointsRef.current = points;

  useEffect(() => {
    if (!map) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    offers.forEach((offer) => {
      const marker = leaflet
        .marker([offer.location.latitude, offer.location.longitude], { icon: defaultCustomIcon })
        .addTo(map);

      markersRef.current.set(offer.id, marker);
    });
  }, [map, offers]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      marker.setIcon(id === selectedPointId ? currentCustomIcon : defaultCustomIcon);
    });
  }, [selectedPointId, offers]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (pointsRef.current.length === 0) {
      map.setView([city.latitude, city.longitude], city.zoom);
      return;
    }

    map.fitBounds(leaflet.latLngBounds(pointsRef.current), {
      padding: [40, 40],
      maxZoom: city.zoom,
    });
  }, [map, city, pointsKey]);

  return (
    <section className={clsx(className, 'map')}>
      <div className="map__inner" ref={mapRef} style={{ height: '100%', minHeight: 500 }}></div>
    </section>
  );
}

export default Map;
