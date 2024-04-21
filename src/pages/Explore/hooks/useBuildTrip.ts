import { useRecoilState, useRecoilValue } from 'recoil';
import { startLocationAtom, tripAtom } from '../state';
import { City, Location } from '../../../types';
import { useEffect } from 'react';
import _ from 'lodash';

const useBuildTrip = () => {
  const startLocation = useRecoilValue(startLocationAtom);
  const [trip, setTrip] = useRecoilState(tripAtom);

  useEffect(() => {
    if (!_.isObject(startLocation)) {
      setTrip([]);
    } else {
      setStartLocation(startLocation);
    }
  }, [startLocation]);

  const setStartLocation = (city: City) => {
    setTrip([
      {
        city: city,
        startLocation: true,
      },
    ]);
  };

  const addLocation = () => {
    const updatedTrip = [...(trip || [])];
    setTrip(updatedTrip);
  };

  const removeLocation = (location: Location) => {
    if (location.startLocation) return;
    const updatedTrip = [
      ...(trip.filter(
        (location) =>
          !(location.city.city === location.city.city) &&
          !(location.city.country === location.city.country),
      ) || []),
    ];
    setTrip(updatedTrip);
  };

  return {
    trip,
    addLocation,
    removeLocation,
  };
};

export default useBuildTrip;
