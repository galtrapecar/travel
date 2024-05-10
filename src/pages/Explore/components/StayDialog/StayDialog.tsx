import { useState } from 'react';
import { Icons } from '../../../../assets/icons';
import InputField from '../../../../components/InputField/InputField';

const StayDialog = () => {
  const [duration, setDuration] = useState<number>();
  return (
    <div className="StayDialog">
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
