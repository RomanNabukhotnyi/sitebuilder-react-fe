import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

import { Button } from '../../../common/Button/Button';
import { FieldList } from '../../../common/FieldList/FieldList';

import { useAppSelector } from '../../../../app/hooks';

import { selectLoadingEditBlock, selectSlotById } from '../../../../store/slots/slotsSlice';

import { Field } from '../../../../types/fields/Field';
import { TextContent } from '../../../../types/blocks/TextContent';
import { ImageContent } from '../../../../types/blocks/ImageContent';
import { TextStyles } from '../../../../types/blocks/TextStyles';
import { ImageStyles } from '../../../../types/blocks/ImageStyles';
import { ImageAttributes } from '../../../../types/blocks/ImageAttributes';
import { BLOCK_TYPES } from '../../../../constants/block-types';

import './BlockEditForm.scss';

interface IProps {
  blockId: number;
  slotId: number;
  onSubmit: SubmitHandler<any>;
}

export function BlockEditForm({ slotId, blockId, onSubmit }: IProps) {
  const loadingEditBlock = useAppSelector(selectLoadingEditBlock);
  const slot = useAppSelector((state) => selectSlotById(state, slotId));
  const block = slot!.blocks.find((block) => block.id === blockId)!;

  const textForm = useForm<any>({
    defaultValues: {
      blockId: block.id,
      slotId,
      type: 'TEXT',
      text: (block.content as TextContent).text,
      subtext: block.content.subtext,
      title: block.attributes?.title,
      fontWeight: (block.styles as TextStyles)?.fontWeight,
      fontSize: (block.styles as TextStyles)?.fontSize,
      color: (block.styles as TextStyles)?.color,
    },
  });
  const imageForm = useForm<any>({
    defaultValues: {
      blockId: block.id,
      slotId,
      type: 'IMAGE',
      url: (block.content as ImageContent).url,
      subtext: block.content.subtext,
      title: block.attributes?.title,
      alt: (block.styles as ImageAttributes)?.alt,
      width: (block.styles as ImageStyles)?.width,
      height: (block.styles as ImageStyles)?.height,
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
      className="u-block-edit-form"
      onSubmit={block.type === BLOCK_TYPES.TEXT ? textForm.handleSubmit(onSubmit) : imageForm.handleSubmit(onSubmit)}
    >
      <h4>Edit block</h4>
      {block.type === BLOCK_TYPES.TEXT && (
        <div>
          <FieldList fields={textFields} errors={textForm.formState.errors} register={textForm.register} />
        </div>
      )}
      {block.type === BLOCK_TYPES.IMAGE && (
        <div>
          <FieldList fields={imageFields} errors={imageForm.formState.errors} register={imageForm.register} />
        </div>
      )}
      <Button
        isLoading={loadingEditBlock}
        isDisabled={loadingEditBlock}
        type="submit"
        label="Edit"
        className="button"
      />
    </form>
  );
}
