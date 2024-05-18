export type City = {
  city?: string;
  city_ascii?: string;
  lat: number;
  lng: number;
  country?: string;
  iso2?: string;
  iso3?: string;
  population?: number;
  id: number;
  image_url: string | null;
};

export type Route = {
  distance?: number;
  duration?: number;
}

export type Monument = {
  id: string;
  monument: string;
  monument_ascii: string;
  lat: number;
  lng: number;
  iso2: string;
  location: string;
};

export interface WorldHeritageSite {
  id: number;
  name: string,
  category: string;
  url: string;
  image_url: string;
  iso2: string[];
  lat: number;
  lng: number;
  description: string;
}

export enum TransportType {
  Plane = 'tlane',
  Car = 'car',
  Train = 'train',
}

export type Transport = {
  type: TransportType,
};

export type Stay = {
  duration: number,
};

export type Location = {
  city?: City;
  transport?: Transport;
  stay?: Stay;
  startLocation?: boolean;
}

export type Trip = Location[];
