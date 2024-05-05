type ExpandableButtonProps = {
  icon: JSX.Element;
  label: string;
};

const ExpandableButton = ({ icon, label }: ExpandableButtonProps) => {
  return (
    <div className="ExpandableButton">
      <div className="ExpandableButton__icon">{icon}</div>
      <div className="ExpandableButton__label">{label}</div>
    </div>
  );
};

export default ExpandableButton;
