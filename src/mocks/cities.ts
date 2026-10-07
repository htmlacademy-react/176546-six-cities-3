import type { City } from '@/types/city.ts';

export const paris: City = {
  name: 'Paris',
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
};

export const cologne: City = {
  name: 'Cologne',
  location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
};

export const brussels: City = {
  name: 'Brussels',
  location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 },
};

export const amsterdam: City = {
  name: 'Amsterdam',
  location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
};

export const hamburg: City = {
  name: 'Hamburg',
  location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
};

export const dusseldorf: City = {
  name: 'Dusseldorf',
  location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
};

export const cities: City[] = [paris, cologne, brussels, amsterdam, hamburg, dusseldorf];
