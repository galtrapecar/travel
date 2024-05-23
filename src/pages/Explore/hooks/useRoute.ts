import { useEffect, useState } from 'react';
import { City, Route } from '../../../types';
import { RoutesAPIUrls } from '../../../urls';

const useRoute = (start?: City | null, end?: City | null) => {
  const [route, setRoute] = useState<Route>();

  useEffect(() => {
    fetchRoute();
  }, []);

  const toKilometers = (distance?: number) => {
    if (!distance) return 0;
    return Math.round(distance);
  };

  const fetchRoute = async () => {
    if (!start || !end) return;
    const url = RoutesAPIUrls.getRouteUrl();
    const request = {
      route: [
        {
          name: start.city,
          country: start.iso3,
        },
        {
          name: end.city,
          country: end.iso3,
        },
      ],
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(request),
    });
    if (!response.ok) return setRoute(undefined);
    const route = await response.json();
    setRoute({
      distance: toKilometers(route?.distance) || 0,
    });
  };

  return {
    route,
    fetchRoute,
  };
};

export default useRoute;
