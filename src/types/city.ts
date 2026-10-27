import { CITIES } from '@/const';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type CityName = (typeof CITIES)[number]['name'];
