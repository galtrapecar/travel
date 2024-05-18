import { City } from '../../types';
import FlagIcon from '../FlagIcon/FlagIcon';
import cx from 'classnames';

const CityPill = ({
  city,
  country,
  iso2,
  darker,
}: City & { darker?: boolean }) => {
  return (
    <div
      className={cx('CityPill', {
        'CityPill--darker': Boolean(darker),
      })}
    >
      {[city, country].join(', ')}
      <FlagIcon iso2={iso2} />
    </div>
  );
};

export default CityPill;
