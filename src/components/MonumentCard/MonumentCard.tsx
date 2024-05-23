import { Icons } from '../../assets/icons';
import { searchOnDuckDuckGo, searchOnGoogle } from '../../search';
import { Monument } from '../../types';
import IconButton from '../IconButton/IconButton';
import useMonumentImage from './hooks/useMonumentImage';

const MonumentCard = (monument: Monument) => {
  const { image } = useMonumentImage(monument);

  const openDuckDuckGo = () => {
    searchOnDuckDuckGo(`${monument.monument}%20${monument.location}`);
  };

  const openGoogle = () => {
    searchOnGoogle(`${monument.monument}%20${monument.location}`);
  };

  return (
    <div className="MonumentCard">
      <div
        className="MonumentCard__image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="MonumentCard__info">
        <div className="MonumentCard__name">{monument.monument}</div>
        <div className="MonumentCard__buttons">
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

export default MonumentCard;
