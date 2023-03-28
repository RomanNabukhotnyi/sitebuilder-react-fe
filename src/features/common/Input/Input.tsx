import { UseFormRegister } from 'react-hook-form';

import { Field } from '../../../types/fields/Field';

import './Input.scss';

interface IProps extends Field {
  name: string;
  register: UseFormRegister<any>;
  className?: string;
}

export function Input({
  name,
  element = 'input',
  register,
  required: isRequired,
  pattern,
  className,
  type,
  placeholder,
}: IProps) {
  const required = isRequired ? `${placeholder} is required.` : false;
  const patternRule = pattern
    ? {
        value: pattern,
        message: `${placeholder} is not a valid.`,
      }
    : undefined;
  return element === 'input' ? (
    <input
      className={`c-input ${className}`}
      placeholder={placeholder}
      type={type}
      {...register(name, {
        required,
        pattern: patternRule,
      })}
    />
  ) : (
    <textarea className={`c-textarea ${className}`} placeholder={placeholder} {...register(name, { required })} />
  );
}
