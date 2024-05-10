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

const TripBuilderDialog = () => {
  const startLocation = useRecoilValue(startLocationAtom);
  const { trip, addTransport } = useBuildTrip();

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
              <div className="TripBuilderDialog__details">
                Taking <span>{getTransportIcon(location.transport)}</span> to:
              </div>
              {!_.isObject(location.city) && <TransportDialog />}
              {_.isObject(location.city) && (
                <>
                  <div className="TripBuilderDialog__destination">
                    {/* Trip details */}
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
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export default TripBuilderDialog;
