import { memo } from 'react';
import { useRecoilState } from 'recoil';
import { selectedPoiAtom } from '../../state';
import ExpandableButton from '../../../../components/ExpandableButton/ExpandableButton';
import { Icons } from '../../../../assets/icons';
import Modal from '../../../../components/Modal/Modal';
import usePoiImage from '../../../../components/PoiCard/hooks/usePoiImage';
import PendingContent from '../../../../components/PendingContent/PendingContent';
import { searchOnDuckDuckGo, searchOnGoogle } from '../../../../search';
import PointOfInterestIcon from '../PointOfInterestIcon/PointOfInterestIcon';

const PointOfInterestDetails = () => {
  const [poi, setSelectedPoi] = useRecoilState(selectedPoiAtom);
  const { image, loading } = usePoiImage(poi);

  const openDuckDuckGo = () => {
    searchOnDuckDuckGo(`${poi?.name}%20${poi?.type}`);
  };

  const openGoogle = () => {
    searchOnGoogle(`${poi?.name}%20${poi?.type}`);
  };

  if (!poi) return null;

  return (
    <Modal open={true} onRequestClose={() => setSelectedPoi(null)}>
      <div className="PointOfInterestDetails">
        <div className="PointOfInterestDetails__header">
          <div className="PointOfInterestDetails__details">
            <div className="PointOfInterestDetails__name">{poi.name}</div>
            <div className="PointOfInterestDetails__type">
              {<PointOfInterestIcon type={poi.type} width={24} height={24} />}
              {poi.type}
            </div>
          </div>
          <div className="PointOfInterestDetails__links">
            <ExpandableButton
              notExpandable
              icon={<Icons.DuckDuckGoLogoIcon width={24} height={24} />}
              onClick={openDuckDuckGo}
              label={'DuckDuckGo'}
            />
            <ExpandableButton
              notExpandable
              icon={<Icons.GoogleLogoIcon width={24} height={24} />}
              onClick={openGoogle}
              label={'Google'}
            />
          </div>
        </div>
        <PendingContent loading={loading}>
          <div className="PointOfInterestDetails__thumbnail">
            <div
              className="PointOfInterestDetails__thumbnailImage"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        </PendingContent>
      </div>
    </Modal>
  );
};

export default memo(PointOfInterestDetails);
