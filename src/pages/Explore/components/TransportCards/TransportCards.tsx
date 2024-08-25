import { memo } from 'react';
import { Icons } from '../../../../assets/icons';
import { TransportType } from '../../../../types';

type TransportCardsProps = {
  onSelect: (type: TransportType) => void;
};

const TransportCards = ({ onSelect }: TransportCardsProps) => {
  return (
    <div className="TransportCards">
      <div
        className="TransportCards__card"
        onClick={() => onSelect(TransportType.Plane)}
      >
        <div className="TransportCards__card__icon">
          <Icons.PlaneIcon width={64} height={64} />
        </div>
        <div className="TransportCards__card__label">Plane</div>
      </div>
      <div
        className="TransportCards__card"
        onClick={() => onSelect(TransportType.Car)}
      >
        <div className="TransportCards__card__icon">
          <Icons.CarIcon width={64} height={64} />
        </div>
        <div className="TransportCards__card__label">Car</div>
      </div>
      <div
        className="TransportCards__card"
        onClick={() => onSelect(TransportType.Train)}
      >
        <div className="TransportCards__card__icon">
          <Icons.TrainIcon width={64} height={64} />
        </div>
        <div className="TransportCards__card__label">Rail</div>
      </div>
    </div>
  );
};

export default memo(TransportCards);
