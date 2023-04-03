import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

import { useAppSelector } from '../../../../app/hooks';
import { selectLoadingCreateBlock } from '../../../../store/slots/slotsSlice';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';
import { Select } from '../../../common/Select/Select';

import { Field } from '../../../../types/fields/Field';
import { ApiCreateBlock } from '../../../../types/blocks/ApiCreateBlock';
import { BLOCK_TYPES } from '../../../../constants/block-types';

import './BlockCreateForm.scss';

interface IProps {
  slotId: number;
  onSubmit: SubmitHandler<ApiCreateBlock>;
}

export function BlockCreateForm({ onSubmit, slotId }: IProps) {
  const [selectedType, setSelectedType] = useState(BLOCK_TYPES.TEXT);
  const loadingCreateBlock = useAppSelector(selectLoadingCreateBlock);
  const options = [
    { name: 'text', value: BLOCK_TYPES.TEXT },
    { name: 'image', value: BLOCK_TYPES.IMAGE },
  ];

  const textForm = useForm<ApiCreateBlock>({
    defaultValues: {
      slotId,
      type: 'TEXT',
    },
  });
  const imageForm = useForm<ApiCreateBlock>({
    defaultValues: {
      slotId,
      type: 'IMAGE',
    },
  });

  const textFields: Record<string, Field> = {
    text: {
      placeholder: 'Text',
      element: 'textarea',
      required: true,
    },
    subtext: {
      placeholder: 'Subtext',
    },
    title: {
      placeholder: 'Title',
    },
    fontWeight: {
      placeholder: 'Font weight',
    },
    fontSize: {
      placeholder: 'Font size',
    },
    color: {
      placeholder: 'Color',
    },
  };

  const imageFields: Record<string, Field> = {
    url: {
      placeholder: 'Url',
    },
    subtext: {
      placeholder: 'Subtext',
    },
    title: {
      placeholder: 'Title',
    },
    alt: {
      placeholder: 'Alt',
    },
    width: {
      placeholder: 'Width',
    },
    height: {
      placeholder: 'Height',
    },
  };

  return (
    <form
      className="u-block-create-form"
      onSubmit={selectedType === BLOCK_TYPES.TEXT ? textForm.handleSubmit(onSubmit) : imageForm.handleSubmit(onSubmit)}
    >
      <h4>Create block</h4>
      <Select selected={selectedType} setSelected={setSelectedType} className="select" options={options} />
      {selectedType === BLOCK_TYPES.TEXT && (
        <div>
          <FieldList fields={textFields} errors={textForm.formState.errors} register={textForm.register} />
        </div>
      )}
      {selectedType === BLOCK_TYPES.IMAGE && (
        <div>
          <FieldList fields={imageFields} errors={imageForm.formState.errors} register={imageForm.register} />
        </div>
      )}
      <Button
        isLoading={loadingCreateBlock}
        isDisabled={loadingCreateBlock}
        type="submit"
        label="Create"
        className="button"
      />
    </form>
  );
}
