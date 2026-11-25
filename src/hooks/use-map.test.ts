import { renderHook } from '@testing-library/react-hooks';
import type { MutableRefObject } from 'react';
import leaflet from 'leaflet';
import useMap from './use-map';
import type { Location } from '@/types/city';

const { mapInstance, tileLayerInstance } = vi.hoisted(() => {
  const tileLayer = { addTo: vi.fn() };

  tileLayer.addTo.mockReturnValue(tileLayer);

  return {
    mapInstance: { remove: vi.fn() },
    tileLayerInstance: tileLayer,
  };
});

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => mapInstance),
    tileLayer: vi.fn(() => tileLayerInstance),
  },
}));

const PARIS: Location = { latitude: 48.85661, longitude: 2.351499, zoom: 13 };
const COLOGNE: Location = { latitude: 50.938361, longitude: 6.959974, zoom: 13 };

const makeMapRef = () => {
  const element = document.createElement('div');

  return { current: element } as MutableRefObject<HTMLDivElement | null>;
};

describe('useMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('не создаёт карту, пока контейнер не отрисован', () => {
    const ref = { current: null } as MutableRefObject<HTMLDivElement | null>;

    const { result } = renderHook(() => useMap(ref, PARIS));

    expect(result.current).toBeNull();
    expect(leaflet.map).not.toHaveBeenCalled();
  });

  it('создаёт карту с центром и зумом города', () => {
    const { result } = renderHook(() => useMap(makeMapRef(), PARIS));

    expect(leaflet.map).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      center: [PARIS.latitude, PARIS.longitude],
      zoom: PARIS.zoom,
    });
    expect(result.current).toBe(mapInstance);
  });

  it('добавляет слой плиток и возвращает его карте', () => {
    renderHook(() => useMap(makeMapRef(), PARIS));

    expect(leaflet.tileLayer).toHaveBeenCalledWith(
      expect.stringContaining('tile.openstreetmap.org'),
      expect.objectContaining({ maxZoom: 19 })
    );
    expect(tileLayerInstance.addTo).toHaveBeenCalledWith(mapInstance);
  });

  it('создаёт карту один раз при смене города', () => {
    const { rerender } = renderHook(({ city }) => useMap(makeMapRef(), city), {
      initialProps: { city: PARIS },
    });

    rerender({ city: COLOGNE });

    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });

  it('удаляет карту при размонтировании', () => {
    const { unmount } = renderHook(() => useMap(makeMapRef(), PARIS));

    unmount();

    expect(mapInstance.remove).toHaveBeenCalledTimes(1);
  });
});
