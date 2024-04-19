import { useEffect, useState } from 'react';
import { City } from '../../../types';
import { CitiesAPIUrls } from '../../../urls';

const useSearchCity = (query: string) => {
  const [results, setResults] = useState<City[]>([]);

  useEffect(() => {
    if (query.length < 3) {
      if (results.length) setResults([]);
      return;
    }
    const url = CitiesAPIUrls.getCitiesSearchUrl(query);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setResults(json))
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return { cities: results };
};

export default useSearchCity;
