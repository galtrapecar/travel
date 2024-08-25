import { memo } from 'react';

type ExpandableButtonProps = {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
};

const ExpandableButton = ({ icon, label, onClick }: ExpandableButtonProps) => {
  return (
    <div className="ExpandableButton" onClick={onClick}>
      <div className="ExpandableButton__icon">{icon}</div>
      <div className="ExpandableButton__label">{label}</div>
    </div>
  );
};

export default memo(ExpandableButton);
