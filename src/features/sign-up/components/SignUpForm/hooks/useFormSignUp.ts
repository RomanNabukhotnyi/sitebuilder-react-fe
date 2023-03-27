import { useForm } from '../../../../../hooks/use-form';
import { useValidators } from '../../../../../hooks/use-validators';

export const useFormSignUp = () => {
    const { required, minLength, email } = useValidators();
    const form = useForm({
      email: {
        placeholder: 'Email',
        validators: {
          required,
          email,
        },
      },
      password: {
        placeholder: 'Password',
        type: 'password',
        validators: {
          required,
          minLength: minLength(8),
        },
      },
    });

    const getData = () => {
        const payload = {
            email: form.fields.email.value,
            password: form.fields.password.value
        }
    
        return payload;
      }
    
      return {
        ...form,
        getData,
      }
}