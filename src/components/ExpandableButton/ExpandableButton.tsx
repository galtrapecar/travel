import { memo } from 'react';
import cx from 'classnames';

type ExpandableButtonProps = {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
  small?: boolean;
  notExpandable?: boolean;
};

const ExpandableButton = ({
  icon,
  label,
  onClick,
  small,
  notExpandable,
}: ExpandableButtonProps) => {
  return (
    <div
      className={cx('ExpandableButton', {
        'ExpandableButton--small': small,
        'ExpandableButton--notExpandable': notExpandable,
      })}
      onClick={onClick}
    >
      <div
        className={cx('ExpandableButton__icon', {
          'ExpandableButton__icon--small': small,
        })}
      >
        {icon}
      </div>
      <div
        className={cx('ExpandableButton__label', {
          'ExpandableButton__label--small': small,
        })}
      >
        {label}
      </div>
    </div>
  );
};

export default memo(ExpandableButton);
