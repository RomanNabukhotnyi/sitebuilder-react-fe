import type { MOVE_SLOT_DIRECTIONS } from '../../constants/move-directions';

export interface MoveSlotData {
  slotId: number;
  direction: keyof typeof MOVE_SLOT_DIRECTIONS;
}
