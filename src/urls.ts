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

export const ImagesAPIUrls = {
  getImages: (query: string) => {
    const url = new URL(`${API_URL}/images`);
    url.searchParams.append('query', query);
    url.searchParams.append('random', String(Math.random()));
    return url.toString();
  }
}
