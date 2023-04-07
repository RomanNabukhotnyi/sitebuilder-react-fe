import { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';

interface IProps {
  className?: string;
  children?: ReactNode;
  setIsOpen: (value: boolean) => void;
}

export function Modal({ className, children, setIsOpen }: IProps) {
  return (
    <div className={`c-modal ${className}`}>
      <CSSTransition
        in={true}
        classNames="fade"
        appear
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
      >
        <div className="modal-overlay" onClick={() => setIsOpen(false)} />
      </CSSTransition>
      <CSSTransition
        in={true}
        classNames="pop"
        appear
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
      >
        <div className="modal">{children}</div>
      </CSSTransition>
    </div>
  );
}
