import { useRecoilValue } from 'recoil';
import { startLocationAtom } from '../../state';
import _ from 'lodash';
import useBuildTrip from '../../hooks/useBuildTrip';
import CityPill from '../../../../components/CityPill/CityPill';
import { TransportType } from '../../../../types';
import TransportDialog from '../TransportDialog/TransportDialog';
import React, { memo } from 'react';
import StayDialog from '../StayDialog/StayDialog';
import IconButton from '../../../../components/IconButton/IconButton';
import TripCard from '../TripCard/TripCard';
import TripBuilderTransportCards from '../TripBuilderTransportCards/TripBuilderTransportCards';
import TripBuilderDestination from '../TripBuilderDestination/TripBuilderDestination';

const TripBuilderDialog = () => {
  const startLocation = useRecoilValue(startLocationAtom);
  const { trip, addTransport, addLocation } = useBuildTrip();

  const onSelectTransport = (type: TransportType) => {
    addTransport(type);
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
        return (
          <React.Fragment key={i}>
            <TripBuilderTransportCards
              location={location}
              onSelectTransport={onSelectTransport}
            />
            <TransportDialog location={location} />
            <TripBuilderDestination location={location} />
            <StayDialog location={location} />
            <TripCard {...location} />
          </React.Fragment>
        );
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

export default memo(TripBuilderDialog);
