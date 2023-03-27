import { ReactNode } from 'react';
import { ValidatorError } from '../../../types/validators/ValidatorError';

import './Field.scss';

interface IProps {
  errors?: ValidatorError[] | null;
  isShowErrors?: boolean;
  children: ReactNode;
  className: string;
}

export function Field({ errors, isShowErrors, children, className }: IProps) {
  const isErrorsExist = !!errors?.length;

  return (
    <div className={`c-field ${className}`}>
      {children}
      {isErrorsExist && isShowErrors && (
        <div>
          <p className="field__error">{errors![0].message}</p>
        </div>
      )}
    </div>
  );
}
