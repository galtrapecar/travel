import { useRecoilState } from 'recoil';
import { tripAtom } from '../state';
import { City, Location, OSRMRoute, Stay, TransportType } from '../../../types';
import _ from 'lodash';

const useBuildTrip = () => {
  const [trip, setTrip] = useRecoilState(tripAtom);

  const addTransport = (type: TransportType) => {
    const location = {
      transport: {
        type,
      },
    };
    const updatedTrip = [...trip.slice(0, trip.length - 1), location];
    setTrip(updatedTrip);
  };

  const addCity = (city: City, route?: OSRMRoute) => {
    const updatedTrip = [
      ...trip.slice(0, trip.length - 1),
      {
        ...{
          ...trip.at(-1),
          city: { ...city, ...route },
        },
      },
    ];
    setTrip(updatedTrip);
  };

  const addStay = (stay: Stay) => {
    const updatedTrip = [
      ...trip.slice(0, trip.length - 1),
      {
        ...trip.at(-1),
        stay,
      },
    ];
    setTrip(updatedTrip);
  };

  const addLocation = (location: Location) => {
    const updatedTrip = [...(trip || []), location];
    setTrip(updatedTrip);
  };

  const removeLocation = (location: Location) => {
    if (location.startLocation) return;
    const updatedTrip = [
      ...(trip.filter(
        (location) =>
          !(location.city?.city === location.city?.city) &&
          !(location.city?.country === location.city?.country),
      ) || []),
    ];
    setTrip(updatedTrip);
  };

  return {
    trip,
    addTransport,
    addCity,
    addStay,
    addLocation,
    removeLocation,
  };
};

export default useBuildTrip;
