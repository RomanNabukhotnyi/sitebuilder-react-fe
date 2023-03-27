import { Field } from '../Field/Field';

import { Field as IField } from '../../../types/fields/Field';

interface IProps {
  fields: Record<string, IField>;
  isShowErrors?: boolean;
}

export function FieldList({ fields, isShowErrors }: IProps) {
  const fieldList = Object.values(fields).map((field) => (
    <Field key={field.key} errors={field.errors} isShowErrors={isShowErrors} className={field.fieldClass ?? 'field'}>
      {field.component({
        className: field.componentClass,
        type: field.type,
        placeholder: field.placeholder,
      })}
      {/* <field.component
        v-model="field.value"
        v-focus="index === 0"
        className="field.componentClass"
        type="field.type"
        placeholder="field.placeholder"
      /> */}
    </Field>
  ));
  return <div className="c-field-list">{fieldList}</div>;
}
