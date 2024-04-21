type IconButtonProps = {
  icon?: JSX.Element;
  label: JSX.Element | string;
  onClick?: () => void;
};

const IconButton = ({ icon, label, onClick }: IconButtonProps) => {
  return (
    <div className="IconButton" onClick={onClick}>
      {label}
      {icon}
    </div>
  );
};

export default IconButton;
