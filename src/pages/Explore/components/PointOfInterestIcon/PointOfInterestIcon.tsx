import { Icons } from '../../../../assets/icons';
import { PointOfInterestType } from '../../../../types';
import { memo } from 'react';

type PointOfInterestIconProps = {
  type: PointOfInterestType;
  width: number;
  height: number;
};

const PointOfInterestIcon = ({
  type,
  width,
  height,
}: PointOfInterestIconProps) => {
  switch (type) {
    case PointOfInterestType.Bridge:
      return <Icons.BridgeIcon width={width} height={height} />;
    case PointOfInterestType.Castle:
      return <Icons.CastleIcon width={width} height={height} />;
    case PointOfInterestType.Church:
      return <Icons.ChurchIcon width={width} height={height} />;
    case PointOfInterestType.HistoricalSite:
      return <Icons.MuseumIcon width={width} height={height} />; // TODO: add icon
    case PointOfInterestType.Monument:
      return <Icons.MuseumIcon width={width} height={height} />; // TODO: add icon
    case PointOfInterestType.Mosque:
      return <Icons.MuseumIcon width={width} height={height} />; // TODO: add icon
    case PointOfInterestType.Museum:
      return <Icons.MuseumIcon width={width} height={height} />;
    case PointOfInterestType.Palace:
      return <Icons.MuseumIcon width={width} height={height} />; // TODO: add icon
    case PointOfInterestType.PieceOfArt:
      return <Icons.PictureIcon width={width} height={height} />;
    case PointOfInterestType.Pyramid:
      return <Icons.MuseumIcon width={width} height={height} />; // TODO: add icon
    case PointOfInterestType.ReligiousSite:
      return <Icons.MuseumIcon width={width} height={height} />; // TODO: add icon
    case PointOfInterestType.Tower:
      return <Icons.MuseumIcon width={width} height={height} />; // TODO: add icon
    case PointOfInterestType.Windmill:
      return <Icons.WindmillIcon width={width} height={height} />;
  }
};

export default memo(PointOfInterestIcon);
