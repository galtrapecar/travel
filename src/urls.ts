import { API_URL } from './config';

export const CitiesAPIUrls = {
  getCitiesSearchUrl: (query: string) => {
    const url = new URL(`${API_URL}/cities/search`);
    url.searchParams.append('query', query);
    return url.toString();
  },

  getCitiesInRadiusUrl: (
    lat: number,
    lng: number,
    radius?: number,
    population?: number,
  ) => {
    const url = new URL(`${API_URL}/cities/inRadius`);
    url.searchParams.append('lat', String(lat));
    url.searchParams.append('lng', String(lng));
    if (radius) url.searchParams.append('radius', String(radius));
    if (population) url.searchParams.append('population', String(population));
    return url.toString();
  },
};

export const RoutesAPIUrls = {
  getRouteUrl: () => `${API_URL}/routes`,
};

export const MonumentsAPIUrls = {
  getMonuments: (iso2: string, city?: string) => {
    const url = new URL(`${API_URL}/monuments`);
    url.searchParams.append('iso2', iso2);
    if (city) url.searchParams.append('city', city);
    return url.toString();
  },

  getMonumentsInRadius: (lat: number, lng: number, radius?: number) => {
    const url = new URL(`${API_URL}/monuments/inRadius`);
    url.searchParams.append('lat', String(lat));
    url.searchParams.append('lng', String(lng));
    if (radius) url.searchParams.append('radius', String(radius));
    return url.toString();
  },
};

export const WorldHeritageSitesAPIUrls = {
  getWorldHeritageSitesInRadius: (
    lat: number,
    lng: number,
    radius?: number,
  ) => {
    const url = new URL(`${API_URL}/worldHeritageSites/inRadius`);
    url.searchParams.append('lat', String(lat));
    url.searchParams.append('lng', String(lng));
    if (radius) url.searchParams.append('radius', String(radius));
    return url.toString();
  },
};

export const ImagesAPIUrls = {
  getImages: (query: string) => {
    const url = new URL(`${API_URL}/images`);
    url.searchParams.append('query', query);
    url.searchParams.append('random', String(Math.random()));
    return url.toString();
  },
};
