import { useSetRecoilState } from 'recoil';
import { Icons } from '../../assets/icons';
import { selectedCityInfoAtom } from '../../pages/Explore/state';
import CityInfoHeader from '../CityInfoHeader/CityInfoHeader';
import IconButton from '../IconButton/IconButton';
import _ from 'lodash';
import { useRef, useState } from 'react';
import cx from 'classnames';
import useMonuments from '../../pages/Explore/hooks/useMonuments';
import { City } from '../../types';
import MonumentCard from '../MonumentCard/MonumentCard';
import useWorldHeritageSites from '../../pages/Explore/hooks/useWorldHeritageSites';
import WorldHeritageSiteCard from '../WorldHeritageSiteCard/WorldHeritageSiteCard';
import { Images } from '../../assets/img';

type CityInfoProps = City & { image?: string };

const CityInfo = ({ city, country, iso2, image, lat, lng }: CityInfoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setSelectedCityInfo = useSetRecoilState(selectedCityInfoAtom);
  const [isClosing, setIsClosing] = useState(false);
  const { monuments } = useMonuments(lat, lng);
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
      {monuments?.length > 0 && (
        <div className="CityInfo__section">
          <div className="CityInfo__section__header">Monuments</div>
          <div className="CityInfo__section__cards">
            {monuments.map((monument) => (
              <MonumentCard key={monument.id} {...monument} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityInfo;
