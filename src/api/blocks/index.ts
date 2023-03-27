import type { ApiBlock } from '../../types/blocks/ApiBlock';
import type { ApiCreateBlock } from '../../types/blocks/ApiCreateBlock';
import type { ApiUpdateBlock } from '../../types/blocks/ApiUpdateBlock';
import type { Order } from '../../types/Order';

import { api } from '../../services/api-service';

export const createBlock = (
  projectId: number | string,
  payload: ApiCreateBlock
): Promise<ApiBlock> => api.post(`/projects/${projectId}/blocks`, payload);

export const getBlocksBySlotId = (
  projectId: number | string,
  slotId: number | string
): Promise<{ blocks: ApiBlock[] }> =>
  api.get(`/projects/${projectId}/blocks`, {
    params: {
      slotId,
    },
  });

export const updateBlock = (
  projectId: number | string,
  blockId: number | string,
  payload: ApiUpdateBlock
): Promise<ApiBlock> =>
  api.put(`/projects/${projectId}/blocks/${blockId}`, payload);

export const updateBlockOrder = (
  projectId: number | string,
  slotId: number | string,
  orders: Order[]
): Promise<ApiBlock[]> =>
  api.put(`/projects/${projectId}/blocks/order`, {
    slotId,
    orders,
  });

export const deleteBlock = (
  projectId: number | string,
  blockId: number | string
): Promise<{ id: number }> => api.delete(`/projects/${projectId}/blocks/${blockId}`);
