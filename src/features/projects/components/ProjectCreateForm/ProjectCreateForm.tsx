import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';

import { Field } from '../../../../types/fields/Field';
import { ApiCreateProject } from '../../../../types/projects/ApiCreateProject';

import './ProjectCreateForm.scss';

interface IProps {
  isLoading: boolean;
  onSubmit: SubmitHandler<ApiCreateProject>;
}

export function ProjectCreateForm({onSubmit, isLoading}: IProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ApiCreateProject>();

  const fields: Record<string, Field> = {
    name: {
      placeholder: 'Name',
      required: true,
    },
  };


  return (
    <form className="u-project-create-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Create project</h4>
      <FieldList fields={fields} errors={errors} register={register} />
      <Button label="Create" className="button" type="submit" isLoading={isLoading} isDisabled={isLoading} />
    </form>
  );
}
