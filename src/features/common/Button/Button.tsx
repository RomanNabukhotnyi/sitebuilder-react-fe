import { Loader } from '../Loader/Loader';

import './Button.scss';

interface IProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button({ type, isDisabled, isLoading, label, className }: IProps) {
  return (
    <button type={type} disabled={isDisabled} className={`c-button ${className}`}>
      {!isLoading ? label : <Loader />}
    </button>
  );
}
