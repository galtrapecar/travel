import { useEffect, useState } from 'react';
import { WorldHeritageSitesAPIUrls } from '../../../urls';
import { WorldHeritageSite } from '../../../types';

const useWorldHeritageSites = (lat: number, lng: number) => {
  const [worldHeritageSites, setWorldHeritageSites] = useState<
    WorldHeritageSite[]
  >([]);

  useEffect(() => {
    fetchWorldHeritageSites();
  }, [lat, lng]);

  const fetchWorldHeritageSites = async () => {
    const url = WorldHeritageSitesAPIUrls.getWorldHeritageSitesInRadius(
      lat,
      lng,
    );
    const response = await fetch(url);
    if (!response.ok) return setWorldHeritageSites([]);
    setWorldHeritageSites(await response.json());
  };

  return {
    worldHeritageSites,
    fetchWorldHeritageSites,
  };
};

export default useWorldHeritageSites;
