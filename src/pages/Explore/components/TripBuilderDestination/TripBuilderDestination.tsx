import { memo } from 'react';
import { Location, TransportType } from '../../../../types';
import { Icons } from '../../../../assets/icons';
import { formatTimeFromSeconds } from '../../../../utils/time';
import CityPill from '../../../../components/CityPill/CityPill';
import _ from 'lodash';

type TripBuilderDestinationProps = { location: Location };

const TripBuilderDestination = ({ location }: TripBuilderDestinationProps) => {
  const getBedIcon = () => {
    return <Icons.BedIcon width={24} height={24} />;
  };

  const getTransportIcon = () => {
    switch (location.transport?.type) {
      case TransportType.Plane:
        return <Icons.PlaneIcon width={24} height={24} />;
      case TransportType.Car:
        return <Icons.CarIcon width={24} height={24} />;
      case TransportType.Train:
        return <Icons.TrainIcon width={24} height={24} />;
    }
  };

  if (
    _.isObject(location.transport) &&
    _.isObject(location.city) &&
    !_.isObject(location.stay)
  ) {
    return (
      <>
        <div className="TripBuilderDialog__details">
          Taking <span>{getTransportIcon()}</span> to:
        </div>
        <div className="TripBuilderDialog__destination">
          {location.city?.duration && (
            <div className="TripBuilderDialog__destinationIcon">
              <Icons.ClockIcon width={24} height={24} />
              <div>{formatTimeFromSeconds(location.city.duration)}</div>
            </div>
          )}
          {location.city?.distance && (
            <div className="TripBuilderDialog__destinationIcon">
              <Icons.CarIcon width={24} height={24} />
              <div>{`${Math.round(location.city.distance / 1000)} km`}</div>
            </div>
          )}
          <div />
          <CityPill darker {...location.city} />
        </div>
        <div className="TripBuilderDialog__details">
          Staying <span>{getBedIcon()}</span> for:
        </div>
      </>
    );
  }

  return null;
};

export default memo(TripBuilderDestination);
