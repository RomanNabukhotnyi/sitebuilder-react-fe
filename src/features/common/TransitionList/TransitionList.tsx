import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './TransitionList.scss';

interface IProps {
  children: JSX.Element[];
  className?: string;
}

export function TransitionList({ children, className }: IProps) {
  return (
    <TransitionGroup className={className}>
      {children.map((element) => {
        return (
          <CSSTransition
            key={element.key}
            classNames="item"
            appear
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
          >
            {element}
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}
