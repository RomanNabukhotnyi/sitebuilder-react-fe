import { SyntheticEvent, useState } from 'react';
import { redirect } from 'react-router-dom';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';

import { signUp, selectLoading } from '../../../../store/auth/authSlice';

import { useFormSignUp } from './hooks/useFormSignUp';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

import './SignUpForm.scss';

export function SignUpForm() {
  const dispatch = useAppDispatch();
  const form = useFormSignUp();
  const loading = useAppSelector(selectLoading);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignUp = async (event: SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitted(true);
  
    if (!form.isValid) return;

    dispatch(signUp(form.getData()));
    // await authStore.signUp(form.getData());
    // toast.success('Sign up is successful!');
    redirect('/login');
  };

  return (
    <form className="u-sign-up-form" onSubmit={handleSignUp}>
      <FieldList fields={form.fields} isShowErrors={isSubmitted} />
      <Button isLoading={loading} isDisabled={loading} label="Sign Up" className="button" type="submit" />
    </form>
  );
}
