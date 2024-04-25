import { useEffect, useState } from 'react';
import { City } from '../../../types';
import { CitiesAPIUrls } from '../../../urls';

const useGetCitiesInRadius = (fromCity: City | null) => {
  const [citiesInRadius, setCitiesInRadius] = useState<City[]>([]);

  const fetchCitiesInRadius = async () => {
    if (!fromCity) {
      return setCitiesInRadius([]);
    }
    const url = CitiesAPIUrls.getCitiesInRadiusUrl(
      fromCity.lat || 0,
      fromCity.lng || 0,
      undefined,
      50_000,
    );
    const response = await fetch(url);
    if (!response.ok) return setCitiesInRadius([]);
    setCitiesInRadius(await response.json());
  };

  useEffect(() => {
    fetchCitiesInRadius();
  }, [fromCity]);

  return {
    citiesInRadius,
    fetchCitiesInRadius,
  };
};

export default useGetCitiesInRadius;
