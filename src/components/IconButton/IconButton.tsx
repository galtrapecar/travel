type IconButtonProps = {
  className?: string;
  icon?: JSX.Element;
  label?: JSX.Element | string;
  onClick?: () => void;
  small?: boolean;
};

const IconButton = ({
  className,
  icon,
  label,
  onClick,
  small,
}: IconButtonProps) => {
  if (small) {
    return (
      <div className={`IconButtonSmall ${className}`} onClick={onClick}>
        {icon}
      </div>
    );
  }
  return (
    <div className={`IconButton ${className}`} onClick={onClick}>
      {label}
      {icon}
    </div>
  );
};

export default IconButton;
