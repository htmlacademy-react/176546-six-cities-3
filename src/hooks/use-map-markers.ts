import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import {
  MARKER_HEIGHT,
  MARKER_WIDTH,
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
} from '@/components/map/const';
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

const getIcon = (id: string, selectedPointId?: string): leaflet.Icon =>
  id === selectedPointId ? currentCustomIcon : defaultCustomIcon;

function useMapMarkers(map: leaflet.Map | null, offers: MapOffer[], selectedPointId?: string): void {
  const markersRef = useRef(new Map<string, leaflet.Marker>());
  const selectedIdRef = useRef(selectedPointId);
  const paintedIdRef = useRef<string | undefined>(selectedPointId);

  selectedIdRef.current = selectedPointId;

  useEffect(() => {
    if (!map) {
      return;
    }

    const markers = markersRef.current;
    const actualIds = new Set(offers.map(({ id }) => id));

    markers.forEach((marker, id) => {
      if (!actualIds.has(id)) {
        marker.remove();
        markers.delete(id);
      }
    });

    offers.forEach(({ id, location }) => {
      const marker = markers.get(id);
      const position: leaflet.LatLngExpression = [location.latitude, location.longitude];

      if (marker) {
        marker.setLatLng(position);
        return;
      }

      const icon = getIcon(id, selectedIdRef.current);
      markers.set(id, leaflet.marker(position, { icon }).addTo(map));
    });
  }, [map, offers]);

  useEffect(() => {
    const markers = markersRef.current;
    const previousId = paintedIdRef.current;

    if (previousId === selectedPointId) {
      return;
    }

    paintedIdRef.current = selectedPointId;

    if (previousId !== undefined) {
      markers.get(previousId)?.setIcon(defaultCustomIcon);
    }

    if (selectedPointId !== undefined) {
      markers.get(selectedPointId)?.setIcon(currentCustomIcon);
    }
  }, [selectedPointId]);

  useEffect(() => {
    const markers = markersRef.current;

    return () => {
      markers.forEach((marker) => marker.remove());
      markers.clear();
    };
  }, [map]);
}

export default useMapMarkers;
