export type City = {
  city?: string;
  city_ascii?: string;
  lat?: number;
  lng?: number;
  country?: string;
  iso2?: string;
  iso3?: string;
  population?: number;
  id?: number;
};

export type Transport = {

};

export type Location = {
  city: City;
  transport?: Transport;
  startLocation?: boolean;
}

export type Trip = Location[];
