import { useState, useCallback } from 'react';

import { Input } from '../features/common/Input/Input';

import type { ValidatorResult } from '../types/validators/ValidatorResult';
import type { ValidatorError } from '../types/validators/ValidatorError';

export const useField = (init: {
  name: string;
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  fieldClass?: string;
  componentClass?: string;
  component?: (props: {}) => JSX.Element;
  placeholder?: string;
  validators?: { [key: string]: (value: string) => ValidatorResult };
}) => {
  const {
    value: initValue,
    placeholder: initPlaceholder,
    validators,
    name,
    type: initType,
    fieldClass: initFieldClass,
    componentClass: initComponentClass,
    component: initComponent,
  } = init;
  const key = `${Date.now()}-${name}`;
  const [isValid, setIsValid] = useState(true);
  const type = initType ?? 'text';
  const placeholder = initPlaceholder ?? '';
  const component = initComponent ?? Input;
  const [value, setValue] = useState(initValue ?? '');
  const fieldClass = initFieldClass;
  const componentClass = initComponentClass;
  const [errors, setErrors] = useState<ValidatorError[]>([]);

  const reassign = useCallback((value: string): void => {
    setIsValid(true);
    setErrors([]);

    Object.keys(validators || {}).forEach((validatorName) => {
      if (validators) {
        const { name, isValid: isValidatorValid, message } = validators[validatorName](value);
        if (!isValidatorValid && (value || name === 'required')) {
          setErrors((errors) => [
            ...errors,
            {
              name,
              message,
            },
          ]);
          setIsValid(false);
        }
      }
    });
  }, [validators]);

  // useEffect(() => {
  //   reassign(value);
  // }, [reassign, value]);

  return {
    key,
    value,
    isValid,
    type,
    errors,
    fieldClass,
    componentClass,
    component,
    placeholder,
  };
};
