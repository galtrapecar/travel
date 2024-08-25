import { useSetRecoilState } from 'recoil';
import { Icons } from '../../assets/icons';
import { selectedCityInfoAtom } from '../../pages/Explore/state';
import CityInfoHeader from '../CityInfoHeader/CityInfoHeader';
import IconButton from '../IconButton/IconButton';
import _ from 'lodash';
import { memo, useRef, useState } from 'react';
import cx from 'classnames';
import { City, PointOfInterestType } from '../../types';
import useWorldHeritageSites from '../../pages/Explore/hooks/useWorldHeritageSites';
import WorldHeritageSiteCard from '../WorldHeritageSiteCard/WorldHeritageSiteCard';
import { Images } from '../../assets/img';
import usePois from '../../pages/Explore/hooks/usePois';
import PoiCard from '../PoiCard/PoiCard';

type CityInfoProps = City & { image?: string };

const CityInfo = ({ city, country, iso2, image, lat, lng }: CityInfoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setSelectedCityInfo = useSetRecoilState(selectedCityInfoAtom);
  const [isClosing, setIsClosing] = useState(false);
  const { pois } = usePois(lat, lng);
  const { worldHeritageSites } = useWorldHeritageSites(lat, lng);

  const onClose = () => {
    if (ref.current) {
      setIsClosing(true);
      ref.current.addEventListener('animationend', () =>
        setSelectedCityInfo(null),
      );
    } else {
      setSelectedCityInfo(null);
    }
  };

  const getPoiTypes = () => {
    return pois.reduce((types, poi) => {
      if (!types.find((type) => type === poi.type)) {
        const newTypes = [...types];
        newTypes.push(poi.type);
        return newTypes;
      }
      return types;
    }, [] as PointOfInterestType[]);
  };

  const poiTypeTitleMap = {
    [PointOfInterestType.Bridge]: 'Bridges',
    [PointOfInterestType.Castle]: 'Castles',
    [PointOfInterestType.Church]: 'Churches',
    [PointOfInterestType.HistoricalSite]: 'Historical sites',
    [PointOfInterestType.Monument]: 'Monuments',
    [PointOfInterestType.Mosque]: 'Mosques',
    [PointOfInterestType.Museum]: 'Museums',
    [PointOfInterestType.Palace]: 'Palaces',
    [PointOfInterestType.PieceOfArt]: 'Pieces of art',
    [PointOfInterestType.Pyramid]: 'Pyramids',
    [PointOfInterestType.ReligiousSite]: 'Religious sites',
    [PointOfInterestType.Tower]: 'Towers',
    [PointOfInterestType.Windmill]: 'Windmills',
  };

  if (!city || !country || !iso2) return null;
  return (
    <div
      className={cx('CityInfo', {
        'CityInfo--closing': isClosing,
      })}
      ref={ref}
    >
      <IconButton
        small
        label={'Back'}
        icon={<Icons.ChevronLeftIcon width={24} height={24} />}
        onClick={onClose}
      />
      <CityInfoHeader city={city} country={country} iso2={iso2} image={image} />
      {worldHeritageSites?.length > 0 && (
        <div className="CityInfo__section">
          <div className="CityInfo__section__header">
            {Images.WordlHeritage}World Heritage
          </div>
          <div className="CityInfo__section__cards">
            {worldHeritageSites.map((worldHeritageSite) => (
              <WorldHeritageSiteCard
                key={worldHeritageSite.id}
                {...worldHeritageSite}
              />
            ))}
          </div>
        </div>
      )}
      {getPoiTypes().map((poiType) => {
        return (
          <div className="CityInfo__section">
            <div className="CityInfo__section__header">
              {poiTypeTitleMap[poiType]}
            </div>
            <div className="CityInfo__section__cards">
              {pois
                .filter((poi) => poi.type === poiType)
                .map((poi) => (
                  <PoiCard key={poi.id} {...poi} />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(CityInfo);
