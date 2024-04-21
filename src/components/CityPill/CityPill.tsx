import { City } from '../../types';
import FlagIcon from '../FlagIcon/FlagIcon';

const CityPill = ({ city, country, iso2 }: City) => {
  return (
    <div className="CityPill">
      {[city, country].join(',')}
      <FlagIcon iso2={iso2} />
    </div>
  );
};

export default CityPill;
