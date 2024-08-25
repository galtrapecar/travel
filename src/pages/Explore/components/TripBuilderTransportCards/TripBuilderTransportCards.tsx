import { memo } from 'react';
import { Location, TransportType } from '../../../../types';
import _ from 'lodash';
import TransportCards from '../TransportCards/TransportCards';

type TripBuilderTransportCardsProps = {
  location: Location;
  onSelectTransport: (type: TransportType) => void;
};

const TripBuilderTransportCards = ({
  location,
  onSelectTransport,
}: TripBuilderTransportCardsProps) => {
  if (!_.isObject(location.transport)) {
    return (
      <div
        key={location.city?.city || _.uniqueId()}
        className="TripBuilderDialogTransportCards"
      >
        <TransportCards onSelect={onSelectTransport} />
      </div>
    );
  }
  return null;
};

export default memo(TripBuilderTransportCards);
