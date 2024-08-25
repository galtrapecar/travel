import _ from 'lodash';
import { Icons } from '../../assets/icons';
import ExpandableButton from '../ExpandableButton/ExpandableButton';
import FlagIcon from '../FlagIcon/FlagIcon';
import { searchOnDuckDuckGo, searchOnGoogle } from '../../search';
import { memo } from 'react';

type CityInfoHeaderProps = {
  city: string;
  country: string;
  iso2: string;
  image?: string;
};

const CityInfoHeader = ({
  city,
  country,
  iso2,
  image,
}: CityInfoHeaderProps) => {
  const openDuckDuckGo = () => {
    searchOnDuckDuckGo(`${city}%20${country}`);
  };

  const openGoogle = () => {
    searchOnGoogle(`${city}%20${country}`);
  };

  return (
    <div className="CityInfoHeader">
      <div className="CityInfoHeader__left">
        <div className="CityInfoHeader__image">
          {_.isString(image) && (
            <img
              src={image}
              onError={(e) => (e.currentTarget.style.display = 'none')}
              onLoad={(e) => (e.currentTarget.style.display = 'initial')}
            />
          )}
        </div>
        <div>
          <div className="CityInfoHeader__title">{city}</div>
          <div className="CityInfoHeader__subtitleWrapper">
            <FlagIcon iso2={iso2} />
            <div className="CityInfoHeader__subtitle">{country}</div>
          </div>
        </div>
      </div>
      <div className="CityInfoHeader__links">
        <ExpandableButton
          icon={<Icons.DuckDuckGoLogoIcon width={24} height={24} />}
          onClick={openDuckDuckGo}
          label={'DuckDuckGo'}
        />
        <ExpandableButton
          icon={<Icons.GoogleLogoIcon width={24} height={24} />}
          onClick={openGoogle}
          label={'Google'}
        />
      </div>
    </div>
  );
};

export default memo(CityInfoHeader);
