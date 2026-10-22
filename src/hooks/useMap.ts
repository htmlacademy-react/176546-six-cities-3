import { useEffect, useState, useRef, type RefObject } from 'react';
import leaflet from 'leaflet';
import type { Location } from '@/types/city.ts';

function useMap(mapRef: RefObject<HTMLDivElement>, city: Location): leaflet.Map | null {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: [city.latitude, city.longitude],
        zoom: city.zoom,
      });

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
        .addTo(instance);

      mapInstanceRef.current = instance;
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  useEffect(
    () => () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      isRenderedRef.current = false;
    },
    []
  );

  return map;
}

export default useMap;
