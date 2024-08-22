import { useEffect, useState } from 'react';
import { City, OSRMQuery, Route } from '../../../types';
import { OSRM_API_URL } from '../../../config';

const useRoute = (start?: City | null, end?: City | null) => {
  const [route, setRoute] = useState<Route>();

  useEffect(() => {
    fetchRoute();
  }, []);

  const toKilometers = (distance?: number) => {
    if (!distance) return 0;
    return Math.round(distance / 1000);
  };

  const fetchRoute = async () => {
    if (!start || !end) return;
    try {
      // const response = await fetch(
      //   `${OSRM_API_URL}/driving/${start.lng},${start.lat};${end.lng},${end.lat}`,
      // );
      // const route: OSRMQuery = await response.json();
      // if (!response.ok) return setRoute(undefined);
      setRoute({
        // distance: toKilometers(route?.routes[0].distance) || 0,
        // duration: route?.routes[0].duration || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    route,
    fetchRoute,
  };
};

export default useRoute;
