import { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '@/hooks/use-map.ts';
import useMapMarkers from '@/hooks/use-map-markers';
import type { Location } from '@/types/city';
import type { MapOffer } from '@/types/map';

type Point = [number, number];

type MapProps = {
  className: string;
  city: Location;
  offers: MapOffer[];
  selectedPointId?: string;
};

function Map({ className, city, offers, selectedPointId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

  const points = useMemo<Point[]>(
    () => offers.map((offer) => [offer.location.latitude, offer.location.longitude]),
    [offers]
  );
  const pointsKey = useMemo(
    () => points.map(([latitude, longitude]) => `${latitude},${longitude}`).join('|'),
    [points]
  );
  const pointsRef = useRef<Point[]>(points);
  pointsRef.current = points;

  useMapMarkers(map, offers, selectedPointId);

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
