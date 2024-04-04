import { ReactNode } from 'react';
import { Portal } from 'react-portal';

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return (
    <Portal>
      <div className="Modal">{children}</div>
    </Portal>
  );
};

export default Modal;
