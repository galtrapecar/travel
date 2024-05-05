import { useSetRecoilState } from 'recoil';
import { Icons } from '../../assets/icons';
import { selectedCityInfoAtom } from '../../pages/Explore/state';
import CityInfoHeader from '../CityInfoHeader/CityInfoHeader';
import IconButton from '../IconButton/IconButton';
import _ from 'lodash';
import { useRef, useState } from 'react';
import cx from 'classnames';

type CityInfoProps = {
  city?: string;
  country?: string;
  iso2?: string;
  image?: string;
};

const CityInfo = ({ city, country, iso2, image }: CityInfoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setSelectedCityInfo = useSetRecoilState(selectedCityInfoAtom);
  const [isClosing, setIsClosing] = useState(false);

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
    </div>
  );
};

export default CityInfo;
