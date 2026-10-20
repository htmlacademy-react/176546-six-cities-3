import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from '@/hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '@/const';
import type { Location } from '@/types/city.ts';

type MapPoint = Location & { id: string };

type MapProps = {
  className: string;
  city: Location;
  points: MapPoint[];
  selectedPointId?: string;
};

const defaultIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const currentIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ className, city, points, selectedPointId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (!map) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = points.map((point) => {
      const marker = leaflet.marker([point.latitude, point.longitude], {
        icon: point.id === selectedPointId ? currentIcon : defaultIcon,
      });
      marker.addTo(map);
      return marker;
    });
  }, [map, points, selectedPointId]);

  return (
    <section className={clsx(className, 'map')}>
      <div className="map__inner" ref={mapRef}></div>
    </section>
  );
}

export default Map;
