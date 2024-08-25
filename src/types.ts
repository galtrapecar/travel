export type City = {
  city: string;
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
};

export type PointOfInterest = {
  id: string;
  type: PointOfInterestType;
  name: string;
  name_ascii: string;
  lat: number;
  lng: number;
  iso2: string;
  location: string;
};

export enum PointOfInterestType {
  Bridge = 'bridge',
  Castle = 'castle',
  Church = 'church',
  HistoricalSite = 'historical_site',
  Monument = 'monument',
  Mosque = 'mosque',
  Museum = 'museum',
  Palace = 'palace',
  PieceOfArt = 'piece_of_art',
  Pyramid = 'pyramid',
  ReligiousSite = 'religious_site',
  Tower = 'tower',
  Windmill = 'windmill',
}

export type WorldHeritageSite = {
  id: number;
  name: string;
  category: string;
  url: string;
  image_url: string;
  iso2: string[];
  lat: number;
  lng: number;
  description: string;
};

export enum TransportType {
  Plane = 'tlane',
  Car = 'car',
  Train = 'train',
}

export type Transport = {
  type: TransportType;
};

export enum StayType {
  Overnight = 'overnight',
  MidDay = 'midday',
};

export type Stay = {
  duration: number;
  type: StayType;
};

export type Location = {
  city?: City & OSRMRouteOptional;
  transport?: Transport;
  stay?: Stay;
  startLocation?: boolean;
};

export type Trip = Location[];

// OSRM

export type OSRMRoute = { distance: number; duration: number; geometry: string };
export type OSRMRouteOptional = { distance?: number; duration?: number; geometry?: string };

export type OSRMQuery = {
  code: 'Ok';
  routes: OSRMRoute[];
};
