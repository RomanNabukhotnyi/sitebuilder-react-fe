import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';

import { useAppDispatch } from '../../../../app/hooks';

import { ApiSignUp } from '../../../../types/auth/ApiSignUp';
import { Field } from '../../../../types/fields/Field';

import './ProjectEditForm.scss';

export function ProjectEditForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ApiSignUp>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fields: Record<string, Field> = {
    name: {
      placeholder: 'Name',
      required: true,
    },
  };

  const onSubmit: SubmitHandler<ApiSignUp> = async (data) => {
    // dispatch(signUp(data));
  };


  return (
    <form className="u-project-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Edit project</h4>
      <FieldList fields={fields} errors={errors} register={register} />
      <Button label="Edit" className="button" type="submit" />
    </form>
  );
}
