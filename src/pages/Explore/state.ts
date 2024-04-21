import { atom } from 'recoil';
import { City, Trip } from '../../types';

export const startLocationAtom = atom<City | null>({
  key: 'startLocation',
  default: null,
});

export const tripAtom = atom<Trip>({
  key: 'trip',
  default: [],
})
