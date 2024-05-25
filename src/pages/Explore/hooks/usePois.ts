import { useEffect } from 'react';
import { PoisAPIUrls } from '../../../urls';
import { useRecoilState } from 'recoil';
import { poisAtom } from '../state';
import { PointOfInterest } from '../../../types';
import _ from 'lodash';

const usePois = (lat?: number, lng?: number) => {
  const [pois, setPois] = useRecoilState(poisAtom);

  useEffect(() => {
    if (!lat || !lng) return;
    fetchPois(lat, lng);
  }, [lat, lng]);

  const fetchPois = async (
    lat?: number,
    lng?: number,
  ): Promise<PointOfInterest[]> => {
    const indexString = `${lat}, ${lng}`;
    if (_.isArray(pois[indexString])) return pois[indexString];
    if (!lat || !lng) return [];
    const url = PoisAPIUrls.getPoisInRadius(lat, lng);
    const response = await fetch(url);
    if (!response.ok) return [];
    const fetchedPois = await response.json();
    setPois((poisMap) => {
      const newPoisMap = _.cloneDeep(poisMap);
      newPoisMap[indexString] = fetchedPois as PointOfInterest[];
      return newPoisMap;
    });
    return [];
  };

  return {
    pois: pois[`${lat}, ${lng}`] || [],
    fetchPois,
  };
};

export default usePois;
