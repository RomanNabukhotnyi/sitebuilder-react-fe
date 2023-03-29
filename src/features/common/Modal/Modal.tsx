import { ReactNode } from "react";

import './Modal.scss';

interface IProps {
  className?: string;
  children?: ReactNode;
  setIsOpen: (value: boolean) => void;
}

export function Modal({ className, children, setIsOpen }: IProps) {
  return (
    <div className={`c-modal ${className}`}>
      {/* <Transition name="fade"> */}
      <div className="modal-overlay" onClick={() => setIsOpen(false)} />
      {/* </Transition>
        <Transition name="pop"> */}
      <div className="modal">
        {children}
      </div>
      {/* </Transition> */}
    </div>
  );
}
