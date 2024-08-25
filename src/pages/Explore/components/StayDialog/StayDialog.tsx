import { useState } from 'react';
import { Icons } from '../../../../assets/icons';
import InputField from '../../../../components/InputField/InputField';
import useBuildTrip from '../../hooks/useBuildTrip';
import { Location, StayType } from '../../../../types';
import _ from 'lodash';

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
        return 'How many hoours?';
    }
  };
  if (
    _.isObject(location.transport) &&
    _.isObject(location.city) &&
    !_.isObject(location.stay)
  ) {
    return (
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
            // @ts-ignore
            setDuration(e.currentTarget.value);
          }}
          value={duration}
          type="number"
        />
      </div>
    );
  }

  return null;
};

export default StayDialog;
