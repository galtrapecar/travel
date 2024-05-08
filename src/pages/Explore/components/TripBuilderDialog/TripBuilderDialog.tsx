import { useRecoilValue } from 'recoil';
import { startLocationAtom } from '../../state';
import _ from 'lodash';
import useBuildTrip from '../../hooks/useBuildTrip';
import CityPill from '../../../../components/CityPill/CityPill';
import TransportCards from '../TransportCards/TransportCards';
import { TransportType } from '../../../../types';
import TransportDialog from '../TransportDialog/TransportDialog';

const TripBuilderDialog = () => {
  const startLocation = useRecoilValue(startLocationAtom);
  const { trip, addTransport } = useBuildTrip();

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
        if (!_.isObject(location.transport)) {
          return (
            <div key={location.city?.city || String(i)} className="TripBuilderDialog__transportCards">
              <TransportCards onSelect={onSelectTransport} />
            </div>
          );
        }
        if (_.isObject(location.transport) && !_.isObject(location.city)) {
          return <TransportDialog transport={location.transport} />;
        }
      })}
    </div>
  );
};

export default TripBuilderDialog;
