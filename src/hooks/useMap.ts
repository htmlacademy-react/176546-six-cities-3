import { useEffect, useState, useRef, type RefObject } from 'react';
import leaflet from 'leaflet';
import type { Location } from '@/types/city.ts';

export function useMap(mapRef: RefObject<HTMLDivElement>, city: Location) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: [city.latitude, city.longitude],
        zoom: city.zoom,
      });
      leaflet.tileLayer('...', { attribution: '...' }).addTo(instance);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  useEffect(
    () => () => {
      map?.remove();
    },
    [map]
  );

  return map;
}
