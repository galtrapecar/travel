import { Icons } from '../../assets/icons';
import { searchOnDuckDuckGo, searchOnGoogle } from '../../search';
import { PointOfInterest } from '../../types';
import IconButton from '../IconButton/IconButton';
import usePoiImage from './hooks/usePoiImage';

const PoiCard = (poi: PointOfInterest) => {
  const { image } = usePoiImage(poi);

  const openDuckDuckGo = () => {
    searchOnDuckDuckGo(`${poi.name}%20${poi.location}`);
  };

  const openGoogle = () => {
    searchOnGoogle(`${poi.name}%20${poi.location}`);
  };

  return (
    <div className="PoiCard">
      <div
        className="PoiCard__image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="PoiCard__info">
        <div className="PoiCard__name">{poi.name}</div>
        <div className="PoiCard__buttons">
          <IconButton
            small
            icon={<Icons.DuckDuckGoLogoIcon />}
            onClick={openDuckDuckGo}
          />
          <IconButton
            small
            icon={<Icons.GoogleLogoIcon />}
            onClick={openGoogle}
          />
        </div>
      </div>
    </div>
  );
};

export default PoiCard;
