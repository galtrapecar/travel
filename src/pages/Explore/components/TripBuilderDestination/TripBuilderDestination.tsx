import { memo } from 'react';
import { Location, TransportType } from '../../../../types';
import { Icons } from '../../../../assets/icons';
import { formatTimeFromSeconds } from '../../../../utils/time';
import CityPill from '../../../../components/CityPill/CityPill';
import _ from 'lodash';
import { useSetRecoilState } from 'recoil';
import { selectedCityDetailsAtom } from '../../state';

type TripBuilderDestinationProps = { location: Location };

const TripBuilderDestination = ({ location }: TripBuilderDestinationProps) => {
  const setSelectedCityDetails = useSetRecoilState(selectedCityDetailsAtom);

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
          {location.city && (
            <CityPill
              onClick={() => setSelectedCityDetails(location.city!)}
              darker
              {...location.city}
            />
          )}
        </div>
      </>
    );
  }

  return null;
};

export default memo(TripBuilderDestination);
