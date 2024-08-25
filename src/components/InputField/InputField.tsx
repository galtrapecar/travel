import { memo } from 'react';

type InputFieldProps = {
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: JSX.Element;
  value: any;
  type?: 'text' | 'number';
};

const InputField = ({
  onInput,
  placeholder,
  icon,
  value,
  type = 'text',
}: InputFieldProps) => {
  return (
    <div className="InputField">
      <input
        type={type}
        placeholder={placeholder}
        onInput={onInput}
        value={value}
      />
      {icon}
    </div>
  );
};

export default memo(InputField);
