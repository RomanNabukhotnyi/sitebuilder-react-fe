import { useParams } from 'react-router-dom';

import { ApiBlock } from '../../../../types/blocks/ApiBlock';
import { ActionMenu } from '../../../common/ActionMenu/ActionMenu';

import { swap } from '../../../../services/array-manipulations-service';
import { useAppDispatch } from '../../../../app/hooks';
import { updateBlockOrder, deleteBlock } from '../../../../store/slots/slotsSlice';

import { SWAP_DIRECTIONS } from '../../../../constants/move-directions';

import './BlockMenu.scss';

interface IProps {
  blockIndex: number;
  slotId: number;
  blockId: number;
  blocks: ApiBlock[];
  className?: string;
  openBlockEditForm: (slotId: number, blockId: number) => void;
}

export function BlockMenu({ slotId, blockId, blockIndex, blocks, className, openBlockEditForm }: IProps) {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();

  enum E_ACTION {
    openBlockEditForm = 'openBlockEditForm',
    moveLeftBlock = 'moveLeftBlock',
    moveRightBlock = 'moveRightBlock',
    deleteBlock = 'handleDeleteSlot',
  }

  interface IActionMap {
    [key: string]: () => void;
  }

  const actionsList = [
    {
      iconName: 'arrow_back',
      isDisabled: blockIndex === 0,
      actionName: E_ACTION.moveLeftBlock,
    },
    {
      iconName: 'arrow_forward',
      isDisabled: blockIndex === blocks.length - 1,
      actionName: E_ACTION.moveRightBlock,
    },
    {
      iconName: 'edit',
      isDisabled: false,
      actionName: E_ACTION.openBlockEditForm,
    },
    {
      iconName: 'delete',
      isDisabled: false,
      actionName: E_ACTION.deleteBlock,
    },
  ];

  const handleMoveBlock = async (direction: keyof typeof SWAP_DIRECTIONS) => {
    const swappedBlocks = swap([...blocks], blockIndex, direction);

    await dispatch(
      updateBlockOrder({
        projectId: +projectId!,
        slotId,
        blocks: swappedBlocks,
      }),
    );
  };

  const moveLeftBlock = async () => {
    await handleMoveBlock('LEFT');
  };

  const moveRightBlock = async () => {
    await handleMoveBlock('RIGHT');
  };

  const handleDeleteSlot = async () => {
    await dispatch(
      deleteBlock({
        projectId: +projectId!,
        slotId,
        blockId,
      }),
    );
  };

  const actionMap: IActionMap = {
    openBlockEditForm: () => {
      openBlockEditForm(slotId, blockId);
    },
    moveLeftBlock,
    moveRightBlock,
    handleDeleteSlot,
  };

  const handleAction = (action: string) => {
    actionMap[action]?.();
  };

  return (
    <div className={`u-block-menu ${className}`}>
      <ActionMenu isColumn={false} actions={actionsList} handler={handleAction} />
    </div>
  );
}
