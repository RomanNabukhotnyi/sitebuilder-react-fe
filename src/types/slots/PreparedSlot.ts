import type { ApiSlot } from './ApiSlot';
import type { ApiBlock } from '../blocks/ApiBlock';

export interface PreparedSlot extends ApiSlot {
  blocks: ApiBlock[];
}
