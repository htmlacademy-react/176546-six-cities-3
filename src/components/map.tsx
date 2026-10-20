import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '@/hooks/useMap';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@/const';
import type { Location } from '@/types/city.ts';
import type { MapPoint } from '@/types/map.ts';

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type MapProps = {
  className: string;
  city: Location;
  points: MapPoint[];
  selectedPointId?: string;
};

function Map({ className, city, points, selectedPointId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (!map) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = points.map((point) =>
      leaflet
        .marker([point.latitude, point.longitude], {
          icon: point.id === selectedPointId ? currentCustomIcon : defaultCustomIcon,
        })
        .addTo(map)
    );
  }, [map, points, selectedPointId]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (points.length === 0) {
      map.setView([city.latitude, city.longitude], city.zoom);
      return;
    }

    const bounds = leaflet.latLngBounds(points.map((point) => [point.latitude, point.longitude]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: city.zoom });
  }, [map, city, points]);

  return (
    <section className={clsx(className, 'map')}>
      <div className="map__inner" ref={mapRef} style={{ height: '100%', minHeight: 500 }}></div>
    </section>
  );
}

export default Map;
