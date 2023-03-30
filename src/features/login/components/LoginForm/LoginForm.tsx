import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';

import { login } from '../../../../store/auth/authSlice';
import { useAppDispatch } from '../../../../app/hooks';

import { EMAIL_PATTERN } from '../../../../constants/patterns';
import { ApiLogin } from '../../../../types/auth/ApiLogin';
import { Field } from '../../../../types/fields/Field';

import './LoginForm.scss';

export function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ApiLogin>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fields: Record<string, Field> = {
    email: {
      placeholder: 'Email',
      required: true,
      pattern: EMAIL_PATTERN,
    },
    password: {
      placeholder: 'Password',
      type: 'password',
      required: true,
    },
  };

  const onSubmit: SubmitHandler<ApiLogin> = (data) => {
    dispatch(login(data));
    // toast.success('Sign up is successful!');
    navigate('/projects');
  };

  return (
    <form className="u-login-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldList fields={fields} errors={errors} register={register} />
      <Button label="Login" className="button" type="submit" />
    </form>
  );
}
