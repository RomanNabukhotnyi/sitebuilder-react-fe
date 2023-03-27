import './Input.scss';

interface IProps {
    value?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    className?: string;
}

export function Input({type, placeholder, value, className}: IProps) {
  return <input value={value} type={type} placeholder={placeholder} className={`c-input ${className}`} />;
}
