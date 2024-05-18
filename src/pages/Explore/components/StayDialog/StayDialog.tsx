import { useState } from 'react';
import { Icons } from '../../../../assets/icons';
import InputField from '../../../../components/InputField/InputField';
import useBuildTrip from '../../hooks/useBuildTrip';

const StayDialog = () => {
  const { addStay } = useBuildTrip();
  const [duration, setDuration] = useState<number>();

  return (
    <div
      className="StayDialog"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (!duration) return;
          addStay({
            duration,
          });
        }
      }}
    >
      <InputField
        placeholder="How many days?"
        icon={<Icons.ClockIcon width={24} height={24} />}
        onInput={(e) => {
          // @ts-ignore
          setDuration(e.currentTarget.value);
        }}
        value={duration}
        type="number"
      />
      {/* chatgpt */}
      {/* reddit */}
    </div>
  );
};

export default StayDialog;
