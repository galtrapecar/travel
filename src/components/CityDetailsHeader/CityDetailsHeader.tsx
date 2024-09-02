import _ from 'lodash';
import { Icons } from '../../assets/icons';
import ExpandableButton from '../ExpandableButton/ExpandableButton';
import FlagIcon from '../FlagIcon/FlagIcon';
import { searchOnDuckDuckGo, searchOnGoogle } from '../../search';
import { memo } from 'react';

type CityDetailsHeaderProps = {
  city: string;
  country: string;
  iso2: string;
  image?: string;
};

const CityDetailsHeader = ({
  city,
  country,
  iso2,
  image,
}: CityDetailsHeaderProps) => {
  const openDuckDuckGo = () => {
    searchOnDuckDuckGo(`${city}%20${country}`);
  };

  const openGoogle = () => {
    searchOnGoogle(`${city}%20${country}`);
  };

  return (
    <div className="CityDetailsHeader">
      <div className="CityDetailsHeader__left">
        <div className="CityDetailsHeader__image">
          {_.isString(image) && (
            <img
              src={image}
              onError={(e) => (e.currentTarget.style.display = 'none')}
              onLoad={(e) => (e.currentTarget.style.display = 'initial')}
            />
          )}
        </div>
        <div>
          <div className="CityDetailsHeader__title">{city}</div>
          <div className="CityDetailsHeader__subtitleWrapper">
            <FlagIcon iso2={iso2} />
            <div className="CityDetailsHeader__subtitle">{country}</div>
          </div>
        </div>
      </div>
      <div className="CityDetailsHeader__links">
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

export default memo(CityDetailsHeader);
