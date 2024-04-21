import { useRecoilValue } from 'recoil';
import { startLocationAtom } from '../../state';
import _ from 'lodash';
import useBuildTrip from '../../hooks/useBuildTrip';
import CityPill from '../../../../components/CityPill/CityPill';
import TransportCards from '../TransportCards/TransportCards';
import { TransportType } from '../../../../types';

const TripBuilderDialog = () => {
  const startLocation = useRecoilValue(startLocationAtom);
  const { trip, addTransport, removeLocation } = useBuildTrip();

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
      {trip.map((location) => {
        if (!_.isObject(location.transport)) {
          return (
            <div className="TripBuilderDialog__transportCards">
              <TransportCards onSelect={onSelectTransport} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default TripBuilderDialog;
