import { useRecoilValue } from 'recoil';
import { startLocationAtom } from '../../state';
import _ from 'lodash';
import useBuildTrip from '../../hooks/useBuildTrip';
import CityPill from '../../../../components/CityPill/CityPill';
import TransportCards from '../TransportCards/TransportCards';
import { TransportType, Transport } from '../../../../types';
import TransportDialog from '../TransportDialog/TransportDialog';
import { Icons } from '../../../../assets/icons';
import React from 'react';
import StayDialog from '../StayDialog/StayDialog';
import IconButton from '../../../../components/IconButton/IconButton';
import { formatTimeFromSeconds } from '../../../../utils/time';
import TripCard from '../TripCard/TripCard';

const TripBuilderDialog = () => {
  const startLocation = useRecoilValue(startLocationAtom);
  const { trip, addTransport, addLocation } = useBuildTrip();

  const onSelectTransport = (type: TransportType) => {
    addTransport(type);
  };

  const getTransportIcon = (transport: Transport) => {
    switch (transport?.type) {
      case TransportType.Plane:
        return <Icons.PlaneIcon width={24} height={24} />;
      case TransportType.Car:
        return <Icons.CarIcon width={24} height={24} />;
      case TransportType.Train:
        return <Icons.TrainIcon width={24} height={24} />;
    }
  };

  const getBedIcon = () => {
    return <Icons.BedIcon width={24} height={24} />;
  };

  if (!_.isObject(startLocation)) {
    return null;
  }

  return (
    <div className="TripBuilderDialog">
      <div className="TripBuilderDialog__start">
        Starting from
        <CityPill {...startLocation} />
      </div>
      {trip.map((location, i) => {
        if (!_.isObject(location.transport)) {
          return (
            <div
              key={location.city?.city || String(i)}
              className="TripBuilderDialog__transportCards"
            >
              <TransportCards onSelect={onSelectTransport} />
            </div>
          );
        }

        if (_.isObject(location.transport)) {
          return (
            <React.Fragment key={location.city?.city || String(i)}>
              {!_.isObject(location.city) && !_.isObject(location.stay) && <div className="TripBuilderDialog__details">
                Taking <span>{getTransportIcon(location.transport)}</span> to:
              </div>}
              {!_.isObject(location.city) && !_.isObject(location.stay) && <TransportDialog />}
              {_.isObject(location.city) && !_.isObject(location.stay) && (
                <>
                  <div className="TripBuilderDialog__destination">
                    {location.city?.duration && (
                      <div className="TripBuilderDialog__destinationIcon">
                        <Icons.ClockIcon width={24} height={24} />
                        <div>
                          {formatTimeFromSeconds(location.city.duration)}
                        </div>
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
              )}
              {_.isObject(location.city) && !_.isObject(location.stay) && (
                <StayDialog />
              )}
              {_.isObject(location.city) && _.isObject(location.stay) && (
                <>
                  {<TripCard {...location} /> || (
                    <div className="TripBuilderDialog__destination">
                      <div>{`${location.stay!.duration} ${location.stay!.duration === 1 ? 'day' : 'days'}`}</div>
                      <Icons.ClockIcon width={24} height={24} />
                    </div>
                  )}
                </>
              )}
            </React.Fragment>
          );
        }
      })}
      {_.isObject(trip.at(-1)?.stay) && (
        <IconButton
          className="TripBuilderDialog__moreButton"
          onClick={() => addLocation({})}
          label={'Add more stops'}
        />
      )}
    </div>
  );
};

export default TripBuilderDialog;
