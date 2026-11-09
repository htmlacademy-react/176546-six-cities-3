import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { MARKER_HEIGHT, MARKER_WIDTH, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@/components/map/const';
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

function useMapMarkers(map: leaflet.Map | null, offers: MapOffer[], selectedPointId?: string): void {
  const markersRef = useRef(new Map<string, leaflet.Marker>());

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
}

export default useMapMarkers;
