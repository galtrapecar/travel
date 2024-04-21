import { useRecoilValue } from 'recoil';
import { startLocationAtom } from '../../state';
import _ from 'lodash';
import useBuildTrip from '../../hooks/useBuildTrip';
import CityPill from '../../../../components/CityPill/CityPill';

const TripBuilderDialog = () => {
  const startLocation = useRecoilValue(startLocationAtom);
  const { trip, addLocation, removeLocation } = useBuildTrip();

  if (!_.isObject(startLocation)) {
    return null;
  }

  return (
    <div className="TripBuilderDialog">
      {trip.map((location) => {
        if (location.startLocation)
          return <div className="TripBuilderDialog__start">
            Starting from
            <CityPill {...startLocation} />
          </div>;
      })}
    </div>
  );
};

export default TripBuilderDialog;
