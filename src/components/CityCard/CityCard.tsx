import { useSetRecoilState } from 'recoil';
import { Icons } from '../../assets/icons';
import { City } from '../../types';
import FlagIcon from '../FlagIcon/FlagIcon';
import IconButton from '../IconButton/IconButton';
import useCityImage from './hooks/useCityImage';
import { selectedCityInfoAtom } from '../../pages/Explore/state';
import _ from 'lodash';

const CityCard = (props: City & { onMouseEnter?: (city: City) => void }) => {
  const { city, country, iso2, onMouseEnter } = props;
  const { image } = useCityImage(props);
  const setSelectedCityInfo = useSetRecoilState(selectedCityInfoAtom);

  return (
    <div
      className="CityCard"
      style={{ backgroundImage: `url(${image})` }}
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
      <IconButton
        small
        icon={<Icons.InfoIcon width={24} height={24} />}
        onClick={() => {
          const city = _.cloneDeep(props);
          delete city.onMouseEnter;
          (city as City & { image?: string }).image = image;
          setSelectedCityInfo(city);
        }}
      />
    </div>
  );
};

export default CityCard;
