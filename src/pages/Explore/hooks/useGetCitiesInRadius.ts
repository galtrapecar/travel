import { useEffect, useMemo, useState } from 'react';
import { City } from '../../../types';
import { CitiesAPIUrls } from '../../../urls';
import { useRecoilValue } from 'recoil';
import { startLocationAtom, tripAtom } from '../state';

const useGetCitiesInRadius = (fromCity: City | null) => {
  const [citiesInRadius, setCitiesInRadius] = useState<City[]>([]);
  const startLocation = useRecoilValue(startLocationAtom);
  const trip = useRecoilValue(tripAtom);

  const selectedCityNames = useMemo(() => {
    const cities = [];
    if (startLocation?.city_ascii) cities.push(startLocation.city_ascii);
    trip.forEach(
      (location) =>
        location.city?.city_ascii && cities.push(location.city.city_ascii),
    );
    return cities;
  }, [startLocation, trip]);

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

    const cities: City[] = await response.json();
    const selectedCities = selectedCityNames;
    const filteredCities = cities.filter(
      (city) => city.city_ascii && !selectedCities.includes(city.city_ascii),
    );

    setCitiesInRadius(filteredCities);
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
