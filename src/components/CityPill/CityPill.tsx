import { memo } from 'react';
import { City } from '../../types';
import FlagIcon from '../FlagIcon/FlagIcon';
import cx from 'classnames';

const CityPill = ({
  city,
  iso2,
  darker,
  onClick,
}: City & { darker?: boolean; onClick?: (city: City) => void }) => {
  return (
    <div
      className={cx('CityPill', {
        'CityPill--darker': Boolean(darker),
        'CityPill--clickable': onClick,
      })}
    >
      {[city].join(', ')}
      <FlagIcon iso2={iso2} />
    </div>
  );
};

export default memo(CityPill);
