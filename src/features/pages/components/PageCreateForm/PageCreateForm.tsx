import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FieldList } from '../../../common/FieldList/FieldList';
import { Button } from '../../../common/Button/Button';

import { ApiCreatePage } from '../../../../types/pages/ApiCreatePage';
import { Field } from '../../../../types/fields/Field';

import './PageCreateForm.scss';

interface IProps {
  isLoading: boolean;
  onSubmit: SubmitHandler<ApiCreatePage>;
}

export function PageCreateForm({ isLoading, onSubmit }: IProps) {
  const { projectId } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ApiCreatePage>({
    defaultValues: {
      projectId: +projectId!,
      meta: {},
    },
  });

  const fields: Record<string, Field> = {
    name: {
      placeholder: 'Name',
      required: true,
    },
  };

  return (
    <form className="u-page-create-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Create page</h4>
      <FieldList fields={fields} errors={errors} register={register} />
      <Button isLoading={isLoading} isDisabled={isLoading} label="Create" className="button" type="submit" />
    </form>
  );
}
