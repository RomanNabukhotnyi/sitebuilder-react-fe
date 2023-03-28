export interface Field {
  type?: 'text' | 'password' | 'email' | 'number';
  inputClassName?: string;
  element?: 'input' | 'textarea';
  fieldClassName?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: RegExp;
}
