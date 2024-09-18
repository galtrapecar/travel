import { PointOfInterestType } from '../../types';
import BridgeIcon from '../../assets/icons/Bridge.svg';
import CastleIcon from '../../assets/icons/Castle.svg';
import ChurchIcon from '../../assets/icons/Church.svg';
import MuseumIcon from '../../assets/icons/Museum.svg';
import PictureIcon from '../../assets/icons/Picture.svg';
import WindmillIcon from '../../assets/icons/Windmill.svg';

const PointOfInterestIconHTML = (type: PointOfInterestType) => {
  switch (type) {
    case PointOfInterestType.Bridge:
      return BridgeIcon;
    case PointOfInterestType.Castle:
      return CastleIcon;
    case PointOfInterestType.Church:
      return ChurchIcon;
    case PointOfInterestType.HistoricalSite:
      return MuseumIcon; // TODO: add icon
    case PointOfInterestType.Monument:
      return MuseumIcon; // TODO: add icon
    case PointOfInterestType.Mosque:
      return MuseumIcon; // TODO: add icon
    case PointOfInterestType.Museum:
      return MuseumIcon;
    case PointOfInterestType.Palace:
      return MuseumIcon; // TODO: add icon
    case PointOfInterestType.PieceOfArt:
      return PictureIcon;
    case PointOfInterestType.Pyramid:
      return MuseumIcon; // TODO: add icon
    case PointOfInterestType.ReligiousSite:
      return MuseumIcon; // TODO: add icon
    case PointOfInterestType.Tower:
      return MuseumIcon; // TODO: add icon
    case PointOfInterestType.Windmill:
      return WindmillIcon;
  }
};

export default PointOfInterestIconHTML;
