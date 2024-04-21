import { ReactNode, useState } from 'react';
import { Portal } from 'react-portal';
import IconButton from '../IconButton/IconButton';
import { Icons } from '../../assets/icons';

type ModalProps = {
  children: ReactNode;
};

type OpenModalButtonProps = {
  open: boolean;
  onOpen: () => void;
};

const OpenModalButton = ({ open, onOpen }: OpenModalButtonProps) => {
  return (
    <div className={`OpenModalButton ${open ? 'open' : 'closed'}`} onClick={onOpen}>
      <IconButton
        className='OpenModalButton__button'
        small
        icon={
          <Icons.ChevronLeftIcon
            width={24}
            height={24}
            style={{ transform: 'rotate(180deg)' }}
          />
        }
      />
    </div>
  );
};

const Modal = ({ children }: ModalProps) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Portal>
        <div className={`Modal ${open ? 'open' : 'closed'}`}>
          <IconButton
            className="Explore__closeModalButton"
            small
            icon={<Icons.ChevronLeftIcon width={24} height={24} />}
            onClick={() => {
              setOpen(false);
            }}
          />
          {children}
        </div>
      </Portal>
      <Portal>
        <OpenModalButton open={!open} onOpen={() => setOpen(true)} />
      </Portal>
    </>
  );
};

export default Modal;
