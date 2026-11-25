import { renderHook } from '@testing-library/react-hooks';
import leaflet from 'leaflet';
import useMapMarkers from './use-map-markers';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@/components/map/const';
import type { MapOffer } from '@/types/map';

type MarkerStub = {
  addTo: ReturnType<typeof vi.fn>;
  setLatLng: ReturnType<typeof vi.fn>;
  setIcon: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
};

const { mapStub, markers } = vi.hoisted(() => {
  const created: MarkerStub[] = [];
  const map = {};

  return { mapStub: map, markers: created };
});

vi.mock('leaflet', () => ({
  default: {
    icon: vi.fn((options: unknown) => ({ options })),
    marker: vi.fn(() => {
      const marker = {
        addTo: vi.fn(),
        setLatLng: vi.fn(),
        setIcon: vi.fn(),
        remove: vi.fn(),
      };

      marker.addTo.mockReturnValue(marker);
      markers.push(marker);

      return marker;
    }),
  },
}));

const makeOffer = (id: string, latitude = 48.85, longitude = 2.35): MapOffer => ({
  id,
  location: { latitude, longitude },
});

const getMap = () => mapStub as unknown as leaflet.Map;

const iconUrlOf = (icon: unknown) => (icon as { options?: { iconUrl?: string } }).options?.iconUrl;

const markerIconUrl = (index: number) =>
  iconUrlOf(vi.mocked(leaflet.marker).mock.calls[index][1]?.icon);

const setIconUrl = (markerIndex: number, callIndex: number) =>
  iconUrlOf((markers[markerIndex].setIcon.mock.calls[callIndex][0] as unknown) ?? null);

describe('useMapMarkers', () => {
  beforeEach(() => {
    markers.length = 0;
    vi.clearAllMocks();
  });

  it('ничего не рисует, пока карты нет', () => {
    renderHook(() => useMapMarkers(null, [makeOffer('1')]));

    expect(leaflet.marker).not.toHaveBeenCalled();
  });

  it('ставит по маркеру на каждое предложение', () => {
    renderHook(() => useMapMarkers(getMap(), [makeOffer('1'), makeOffer('2')]));

    expect(leaflet.marker).toHaveBeenCalledTimes(2);
    expect(markers[0].addTo).toHaveBeenCalledWith(mapStub);
    expect(markers[1].addTo).toHaveBeenCalledWith(mapStub);
  });

  it('передаёт координаты предложения в маркер', () => {
    renderHook(() => useMapMarkers(getMap(), [makeOffer('1', 50.1, 6.9)]));

    expect(leaflet.marker).toHaveBeenCalledWith([50.1, 6.9], expect.anything());
  });

  it('переиспользует маркер, когда меняются координаты', () => {
    const { rerender } = renderHook(({ offers }) => useMapMarkers(getMap(), offers), {
      initialProps: { offers: [makeOffer('1', 48.85, 2.35)] },
    });

    rerender({ offers: [makeOffer('1', 50.1, 6.9)] });

    expect(leaflet.marker).toHaveBeenCalledTimes(1);
    expect(markers[0].setLatLng).toHaveBeenCalledWith([50.1, 6.9]);
  });

  it('удаляет маркер, которого больше нет в списке', () => {
    const { rerender } = renderHook(({ offers }) => useMapMarkers(getMap(), offers), {
      initialProps: { offers: [makeOffer('1'), makeOffer('2')] },
    });

    rerender({ offers: [makeOffer('1')] });

    expect(markers[1].remove).toHaveBeenCalledTimes(1);
  });

  it('подсвечивает выбранный маркер и снимает подсветку с предыдущего', () => {
    const offers = [makeOffer('1'), makeOffer('2')];

    const { rerender } = renderHook(
      ({ selectedId }) => useMapMarkers(getMap(), offers, selectedId),
      { initialProps: { selectedId: undefined as string | undefined } }
    );

    rerender({ selectedId: '1' });
    rerender({ selectedId: '2' });

    expect(setIconUrl(0, 0)).toBe(URL_MARKER_CURRENT);
    expect(setIconUrl(0, 1)).toBe(URL_MARKER_DEFAULT);
    expect(markers[1].setIcon).toHaveBeenCalledTimes(1);
    expect(setIconUrl(1, 0)).toBe(URL_MARKER_CURRENT);
  });

  it('использует обычную иконку, когда ничего не выбрано', () => {
    renderHook(() => useMapMarkers(getMap(), [makeOffer('1')]));

    expect(markerIconUrl(0)).toBe(URL_MARKER_DEFAULT);
  });

  it('убирает маркеры при размонтировании', () => {
    const { unmount } = renderHook(() => useMapMarkers(getMap(), [makeOffer('1')]));

    unmount();

    expect(markers[0].remove).toHaveBeenCalledTimes(1);
  });
});
