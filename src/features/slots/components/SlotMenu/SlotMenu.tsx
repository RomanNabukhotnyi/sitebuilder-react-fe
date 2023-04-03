import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../app/hooks';

import { deleteSlot, updateSlotOrder } from '../../../../store/slots/slotsSlice';

import { ActionMenu } from '../../../common/ActionMenu/ActionMenu';
import { swap } from '../../../../services/array-manipulations-service';
import { ActionListItem } from '../../../../types/ActionMenu';
import { PreparedSlot } from '../../../../types/slots/PreparedSlot';
import { SWAP_DIRECTIONS } from '../../../../constants/move-directions';

import './SlotMenu.scss';

interface IProps {
  slotType: string;
  slotId: number;
  slotIndex: number;
  slots: PreparedSlot[];
  className?: string;
  openBlockCreateForm: (slotId: number) => void;
}

interface IActionMap {
  [key: string]: () => void;
}

export function SlotMenu({ slotIndex, slotType, slots, className, slotId, openBlockCreateForm }: IProps) {
  const dispatch = useAppDispatch();
  const { projectId, pageId } = useParams();

  enum E_ACTION {
    moveUpSlot = 'moveUpSlot',
    moveDownSlot = 'moveDownSlot',
    openBlockCreateForm = 'openBlockCreateForm',
    deleteSlot = 'handleDeleteSlot',
  }

  const handleMoveSlot = async (direction: keyof typeof SWAP_DIRECTIONS) => {
    const swappedSlots = swap([...slots], slotIndex, direction);

    await dispatch(
      updateSlotOrder({
        projectId: +projectId!,
        pageId: +pageId!,
        slots: swappedSlots,
      }),
    );
  };

  const moveUpSlot = async () => {
    await handleMoveSlot('UP');
  };

  const moveDownSlot = async () => {
    await handleMoveSlot('DOWN');
  };

  const handleDeleteSlot = async () => {
    await dispatch(
      deleteSlot({
        projectId: +projectId!,
        slotId,
      }),
    );
  };

  const actionMap: IActionMap = {
    moveUpSlot,
    moveDownSlot,
    handleDeleteSlot,
    openBlockCreateForm: () => {
      openBlockCreateForm(slotId);
    },
  };

  const actionList: ActionListItem[] = [
    {
      iconName: 'arrow_upward',
      isDisabled: slotIndex === 0,
      actionName: E_ACTION.moveUpSlot,
    },
    {
      iconName: 'arrow_downward',
      isDisabled: slotIndex === slots.length - 1,
      actionName: E_ACTION.moveDownSlot,
    },
    {
      iconName: 'add',
      isDisabled: slotType === 'STATIC',
      actionName: E_ACTION.openBlockCreateForm,
    },
    {
      iconName: 'delete',
      isDisabled: false,
      actionName: E_ACTION.deleteSlot,
    },
  ];

  const handleAction = (actionName: string) => {
    actionMap[actionName]?.();
  };

  return (
    <div className={`u-slot-menu ${className}`}>
      <ActionMenu isColumn={true} actions={actionList} handler={handleAction} />
    </div>
  );
}
