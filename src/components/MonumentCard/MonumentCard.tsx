import { Monument } from '../../types';
import useMonumentImage from './hooks/useMonumentImage';

const MonumentCard = (monument: Monument) => {
  const { image } = useMonumentImage(monument);
  return (
    <div className="MonumentCard">
      <div className="MonumentCard__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="MonumentCard__name">{monument.monument}</div>
    </div>
  );
};

export default MonumentCard;
