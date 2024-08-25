import { useSetRecoilState } from 'recoil';
import { Icons } from '../../../../assets/icons';
import IconButton from '../../../../components/IconButton/IconButton';
import { cityDrawerOpenAtom } from '../../state';
import _ from 'lodash';
import { Location, Transport, TransportType } from '../../../../types';
import { memo } from 'react';

type TransportDialogProps = {
  location: Location;
};

const TransportDialog = ({ location }: TransportDialogProps) => {
  const setDrawerOpen = useSetRecoilState(cityDrawerOpenAtom);

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
    !_.isObject(location.city) &&
    !_.isObject(location.stay)
  ) {
    return (
      <>
        <div className="TripBuilderDialog__details">
          Taking <span>{getTransportIcon()}</span> to:
        </div>
        <div className="TransportDialog">
          <IconButton
            label={'Select from the list'}
            icon={<Icons.MapIcon width={24} height={24} />}
            onClick={() => setDrawerOpen(true)}
          />
        </div>
      </>
    );
  }

  return null;
};

export default memo(TransportDialog);
