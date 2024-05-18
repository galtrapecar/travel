import { useSetRecoilState } from 'recoil';
import { Icons } from '../../../../assets/icons';
import IconButton from '../../../../components/IconButton/IconButton';
import { cityDrawerOpenAtom } from '../../state';

const TransportDialog = () => {
  const setDrawerOpen = useSetRecoilState(cityDrawerOpenAtom);

  return (
    <div className="TransportDialog">
      <IconButton
        label={'Select from the list'}
        icon={<Icons.MapIcon width={24} height={24} />}
        onClick={() => setDrawerOpen(true)}
      />
    </div>
  );
};

export default TransportDialog;
