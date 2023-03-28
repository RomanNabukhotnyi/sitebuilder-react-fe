import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { Input } from '../Input/Input';

import { Field as IField } from '../../../types/fields/Field';

import './FieldList.scss';

interface IProps {
  fields: Record<string, IField>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function FieldList({ fields, errors, register }: IProps) {
  const fieldList = Object.entries(fields).map(
    ([name, { fieldClassName, inputClassName, placeholder, type, required, pattern }]) => (
      <div className={`c-field ${fieldClassName ?? 'field'}`} key={name}>
        <Input
          name={name}
          className={inputClassName}
          placeholder={placeholder}
          type={type}
          register={register}
          required={required}
          pattern={pattern}
        />
        <p className="field__error">{errors[name]?.message as string}</p>
      </div>
    ),
  );
  return <div className="c-field-list">{fieldList}</div>;
}
