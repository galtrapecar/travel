import { useSetRecoilState } from 'recoil';
import { Icons } from '../../../../assets/icons';
import IconButton from '../../../../components/IconButton/IconButton';
import { Location, TransportType } from '../../../../types';
import { cityDrawerOpenAtom } from '../../state';

const TransportDialog = ({ transport }: Location) => {
  const setDrawerOpen = useSetRecoilState(cityDrawerOpenAtom);

  const getIcon = () => {
    switch (transport?.type) {
      case TransportType.Plane:
        return <Icons.PlaneIcon width={24} height={24} />;
      case TransportType.Car:
        return <Icons.CarIcon width={24} height={24} />;
      case TransportType.Train:
        return <Icons.TrainIcon width={24} height={24} />;
    }
  };

  if (!transport) return null;

  return (
    <div className="TransportDialog">
      <div className="TransportDialog__type">
        Taking <span>{getIcon()}</span> to:
      </div>
      <IconButton
        label={'Select from the list'}
        icon={<Icons.MapIcon width={24} height={24} />}
        onClick={() => setDrawerOpen(true)}
      />
    </div>
  );
};

export default TransportDialog;
