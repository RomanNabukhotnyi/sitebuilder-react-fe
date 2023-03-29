import { Loader } from '../Loader/Loader';

import './Button.scss';

interface IProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button({ type, isDisabled, isLoading, label, className, onClick }: IProps) {
  return (
    <button type={type} disabled={isDisabled} className={`c-button ${className}`} onClick={onClick}>
      {!isLoading ? label : <Loader />}
    </button>
  );
}
