import { City } from '../../types';
import FlagIcon from '../FlagIcon/FlagIcon';
import useCityImage from './hooks/useCityImage';

const CityCard = (props: City & { onMouseEnter?: (city: City) => void }) => {
  const { city, country, iso2, onMouseEnter } = props;
  const { image } = useCityImage(props);

  return (
    <div
      className="CityCard"
      style={{backgroundImage: `url(${image})`}}
      onMouseEnter={() => {
        if (!onMouseEnter) return;
        let city = { ...props };
        delete city.onMouseEnter;
        onMouseEnter(city as City);
      }}
    >
      <FlagIcon iso2={iso2} />
      <div className="CityCard__info">
        <div className="CityCard__info__name">{city}</div>
        <div className="CityCard__info__country">{country}</div>
      </div>
    </div>
  );
};

export default CityCard;
