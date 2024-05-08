import { useEffect, useState } from 'react';
import { MonumentsAPIUrls } from '../../../urls';
import { Monument } from '../../../types';

const useMonuments = (lat: number, lng: number) => {
  const [monuments, setMonuments] = useState<Monument[]>([]);

  useEffect(() => {
    fetchMonuments();
  }, [lat, lng]);

  const fetchMonuments = async () => {
    const url = MonumentsAPIUrls.getMonumentsInRadius(lat, lng);
    const response = await fetch(url);
    if (!response.ok) return setMonuments([]);
    setMonuments(await response.json());
  };

  return {
    monuments,
    fetchMonuments,
  };
};

export default useMonuments;
