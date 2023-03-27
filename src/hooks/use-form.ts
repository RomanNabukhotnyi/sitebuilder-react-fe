import type { Field } from '../types/fields/Field';
import type { ValidatorResult } from '../types/validators/ValidatorResult';

import { useField } from './use-field';


type InitValue = {
  [key: string]: {
    value?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    fieldClass?: string;
    componentClass?: string;
    component?: (props: {}) => JSX.Element;
    validators?: { [key: string]: (value: string) => ValidatorResult };
  }
}

export const useForm = (init: InitValue) => {
  const fields: Record<string, Field> = {};

  for (const [key, value] of Object.entries(init)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fields[key] = useField({ name: key, ...value});
  }

  const isValid = Object.keys(fields)
      .reduce((acc, k) => {
        return acc && fields[k].isValid;
      }, true);

  const reset = () => {
    Object.keys(fields).forEach((key) => fields[key].value = '');
  }

  return {
    fields,
    reset,
    isValid,
  };
};
