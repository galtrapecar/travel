import { API_URL } from './config';

export const CitiesAPIUrls = {
  getCitiesSearchUrl: (query: string) => {
    const url = new URL(`${API_URL}/cities/search`);
    url.searchParams.append('query', query);
    return url.toString();
  },
};
