import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';

import { useAppSelector } from '../../../../app/hooks';
import { selectProjectById } from '../../../../store/projects/projectsSlice';

import { ApiUpdateProject } from '../../../../types/projects/ApiUpdateProject';
import { Field } from '../../../../types/fields/Field';

import './ProjectEditForm.scss';

interface IProps {
  isLoading: boolean;
  projectId: number;
  onSubmit: SubmitHandler<ApiUpdateProject>;
}

export function ProjectEditForm({ isLoading, onSubmit, projectId }: IProps) {
  const project = useAppSelector((state) => selectProjectById(state, projectId))!;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ApiUpdateProject>({
    defaultValues: {
      projectId: project.id,
      name: project.name,
    },
  });

  const fields: Record<string, Field> = {
    name: {
      placeholder: 'Name',
      required: true,
    },
  };

  return (
    <form className="u-project-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Edit project</h4>
      <FieldList fields={fields} errors={errors} register={register} />
      <Button isLoading={isLoading} label="Edit" className="button" type="submit" />
    </form>
  );
}
