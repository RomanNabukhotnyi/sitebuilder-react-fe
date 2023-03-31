import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../app/hooks';

import { selectPageById } from '../../../../store/pages/pagesSlice';

import { FieldList } from '../../../common/FieldList/FieldList';
import { Button } from '../../../common/Button/Button';

import { ApiUpdatePage } from '../../../../types/pages/ApiUpdatePage';
import { Field } from '../../../../types/fields/Field';

import './PageEditForm.scss';

interface IProps {
  isLoading: boolean;
  pageId: number;
  onSubmit: SubmitHandler<ApiUpdatePage>;
}

export function PageEditForm({ isLoading, onSubmit, pageId }: IProps) {
  const page = useAppSelector((state) => selectPageById(state, pageId))!;
  const { projectId } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ApiUpdatePage>({
    defaultValues: {
      projectId: +projectId!,
      pageId: page.id,
      name: page.name,
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
    <form className="u-page-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Edit page</h4>
      <FieldList fields={fields} errors={errors} register={register} />
      <Button isLoading={isLoading} isDisabled={isLoading} label="Edit" className="button" type="submit" />
    </form>
  );
}
