import { redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';

import { signUp, selectLoading } from '../../../../store/auth/authSlice';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { EMAIL_PATTERN } from '../../../../constants/patterns';

import { ApiSignUp } from '../../../../types/auth/ApiSignUp';
import { Field } from '../../../../types/fields/Field';

import './SignUpForm.scss';

export function SignUpForm() {
  const { register, formState: { errors }, handleSubmit } = useForm<ApiSignUp>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  const onSubmit: SubmitHandler<ApiSignUp> = async (data) => {
    console.log(data);
    // dispatch(signUp(data));
    // // await authStore.signUp(form.getData());
    // // toast.success('Sign up is successful!');
    // redirect('/login');
  };

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
    }
  };

  return (
    <form className="u-sign-up-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldList fields={fields} errors={errors} register={register} />
      <Button isLoading={loading} isDisabled={loading} label="Sign Up" className="button" type="submit" />
    </form>
  );
}
