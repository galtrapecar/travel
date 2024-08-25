import { memo, useState } from 'react';
import { Icons } from '../../../../assets/icons';
import InputField from '../../../../components/InputField/InputField';
import useBuildTrip from '../../hooks/useBuildTrip';
import { Location, StayType } from '../../../../types';
import _ from 'lodash';
import IconButton from '../../../../components/IconButton/IconButton';

type StayDialogProps = {
  location: Location;
};

const StayDialog = ({ location }: StayDialogProps) => {
  const { addStay } = useBuildTrip();
  const [duration, setDuration] = useState<number>();
  const [type, setType] = useState<StayType>(StayType.Overnight);

  const getPlaceholder = () => {
    switch (type) {
      case StayType.Overnight:
        return 'How many nights?';
      case StayType.MidDay:
        return 'How many hours?';
    }
  };

  const getDialogIcon = () => {
    if (type === StayType.MidDay)
      return <Icons.SunIcon width={24} height={24} />;
    if (type === StayType.Overnight)
      return <Icons.BedIcon width={24} height={24} />;
  };

  const getButtonIcon = () => {
    if (type === StayType.Overnight)
      return <Icons.SunIcon width={24} height={24} />;
    if (type === StayType.MidDay)
      return <Icons.BedIcon width={24} height={24} />;
  };

  if (
    _.isObject(location.transport) &&
    _.isObject(location.city) &&
    !_.isObject(location.stay)
  ) {
    return (
      <>
        <div className="TripBuilderDialog__details">
          Staying <span>{getDialogIcon()}</span> for:
        </div>
        <div
          className="StayDialog"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (!duration) return;
              addStay({
                duration,
                type,
              });
            }
          }}
        >
          <InputField
            placeholder={getPlaceholder()}
            icon={<Icons.ClockIcon width={24} height={24} />}
            onInput={(e) => {
              setDuration(parseInt(e.currentTarget.value));
            }}
            value={duration}
            type="number"
          />
          <IconButton
            icon={getButtonIcon()}
            onClick={() => {
              if (type === StayType.MidDay) setType(StayType.Overnight);
              if (type === StayType.Overnight) setType(StayType.MidDay);
            }}
          />
        </div>
      </>
    );
  }

  return null;
};

export default memo(StayDialog);
