import type { MOVE_BLOCK_DIRECTIONS } from '../../constants/move-directions';

export interface MoveBlockData {
  slotId: number;
  blockId: number;
  direction: keyof typeof MOVE_BLOCK_DIRECTIONS;
}
