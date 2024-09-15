import { atom } from 'recoil';
import { City, PointOfInterest, Trip } from '../../types';

export const startLocationAtom = atom<City | null>({
  key: 'startLocation',
  default: null,
});

export const tripAtom = atom<Trip>({
  key: 'trip',
  default: [],
});

export const currentCityAtom = atom<City | null>({
  key: 'currentCity',
  default: null,
});

export const cityDrawerOpenAtom = atom<boolean>({
  key: 'cityDrawerOpen',
  default: false,
});

export const selectedCityDetailsAtom = atom<City | null>({
  key: 'selectedCityDetails',
  default: null,
});

export const poisAtom = atom<{ [x: string]: PointOfInterest[] }>({
  key: 'pois',
  default: {},
});

export const selectedPoiAtom = atom<PointOfInterest | null>({
  key: 'selectedPoi',
  default: null,
});
