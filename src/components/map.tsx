import clsx from 'clsx';
import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../const';

type MapProps = {
  className: string;
};

function Map({ className }: MapProps): JSX.Element {
  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

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

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker(
            {
              lat: point.lat,
              lng: point.lng,
            },
            {
              icon: defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, points]);

  return (
    <section className={clsx(className, 'map')}>
      <div style={{ height: '500px' }} ref={mapRef}></div>
    </section>
  );
}

export default Map;
