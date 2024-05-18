import { useState } from 'react';
import { Icons } from '../../assets/icons';
import IconButton from '../IconButton/IconButton';

type DrawerProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const Drawer = ({ children, open, onClose }: DrawerProps) => {
  return (
    <div className={`Drawer ${open ? 'open' : 'closed'}`}>
      <IconButton
        small
        icon={
          <Icons.ChevronLeftIcon
            width={24}
            height={24}
            style={{ transform: 'rotate(180deg)' }}
          />
        }
        onClick={onClose}
      />
      {children}
    </div>
  );
};

export default Drawer;
