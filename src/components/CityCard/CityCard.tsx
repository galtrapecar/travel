import { memo } from 'react';
import { Icons } from '../../assets/icons';
import useRoute from '../../pages/Explore/hooks/useRoute';
import { City } from '../../types';
import FlagIcon from '../FlagIcon/FlagIcon';
import IconButton from '../IconButton/IconButton';
import useCityImage from './hooks/useCityImage';
import _ from 'lodash';

type CityCardProps = City & {
  onMouseEnter?: (city: City) => void;
  onClick?: (city: City) => void;
  onInfoClick?: (city: City & { image?: string }) => void;
  startLocation?: City | null;
};

const CityCard = (props: CityCardProps) => {
  const {
    city,
    country,
    iso2,
    onMouseEnter,
    onClick,
    onInfoClick,
    startLocation,
    image_url,
  } = props;
  const { image } = useCityImage(props, image_url);
  const { route } = useRoute(startLocation, props);

  const toCity = (city: CityCardProps): City => {
    const cleanCity = { ...city };
    delete cleanCity.onMouseEnter;
    delete cleanCity.onClick;
    delete cleanCity.startLocation;
    return cleanCity;
  };

  return (
    <div
      className="CityCard"
      onMouseEnter={() => {
        if (!onMouseEnter) return;
        onMouseEnter(toCity(props));
      }}
      onClick={() => {
        if (!onClick) return;
        onClick(toCity(props));
      }}
    >
      {_.isString(image) && (
        <img
          src={image}
          onError={(e) => (e.currentTarget.style.display = 'none')}
          onLoad={(e) => (e.currentTarget.style.display = 'initial')}
        />
      )}
      <FlagIcon iso2={iso2} />
      <div className="CityCard__info">
        <div className="CityCard__info__name">{city}</div>
        <div className="CityCard__info__country">{country}</div>
      </div>
      <div className="CityCard__route">
        {_.isNumber(route?.duration) && (
          <div className="CityCard__route__duration">
            <Icons.ClockIcon width={24} height={24} />
            {route?.duration}
          </div>
        )}
        {_.isNumber(route?.distance) && (
          <div className="CityCard__route__distance">
            <Icons.CarIcon width={24} height={24} />
            {`${route?.distance} km`}
          </div>
        )}
      </div>
      <IconButton
        small
        label={'More info'}
        onClick={(e) => {
          e.stopPropagation();
          onInfoClick?.({ ...toCity(props), image: image });
        }}
      />
    </div>
  );
};

export default memo(CityCard);
