import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSlotsByPageId, createSlotApi, updateSlotOrderApi, deleteSlotAPi } from '../../api/slots';
import {
  getBlocksBySlotId,
  createBlockApi,
  updateBlockApi,
  updateBlockOrderApi,
  deleteBlockApi,
} from '../../api/blocks';

import { PreparedSlot } from '../../types/slots/PreparedSlot';
import { RootState } from '..';
import { ApiCreateSlot } from '../../types/slots/ApiCreateSlot';
import { Order } from '../../types/Order';
import { ApiCreateBlock } from '../../types/blocks/ApiCreateBlock';
import { ApiUpdateBlock } from '../../types/blocks/ApiUpdateBlock';
import { ApiBlock } from '../../types/blocks/ApiBlock';

export interface SlotsState {
  slots: PreparedSlot[];
  loadingGetSlots: boolean;
  loadingCreateSlot: boolean;
  loadingDeleteSlot: boolean;
  loadingCreateBlock: boolean;
  loadingEditBlock: boolean;
  loadingDeleteBlock: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: SlotsState = {
  slots: [],
  loadingGetSlots: false,
  loadingCreateSlot: false,
  loadingDeleteSlot: false,
  loadingCreateBlock: false,
  loadingEditBlock: false,
  loadingDeleteBlock: false,
  status: 'idle',
  error: null,
};

interface getSlotsPayload {
  projectId: number;
  pageId: number;
}

export const getSlots = createAsyncThunk('slots/getSlots', async ({ projectId, pageId }: getSlotsPayload) => {
  const data = await getSlotsByPageId(projectId, pageId);
  const sortedSlots = data.sort((a, b) => {
    if (a.order === 0) {
      return 1;
    }
    return a.order > b.order ? 1 : -1;
  });
  const slots = await Promise.all(
    sortedSlots.map(async (slot) => {
      const response = await getBlocksBySlotId(projectId, slot.id);
      const blocks = response.blocks.sort((a, b) => {
        if (a.order === 0) {
          return 1;
        }
        return a.order > b.order ? 1 : -1;
      });
      return {
        ...slot,
        blocks,
      };
    }),
  );
  return slots;
});

interface createSlotPayload {
  projectId: number;
  payload: ApiCreateSlot;
}

export const createSlot = createAsyncThunk('slots/createSlot', async ({ projectId, payload }: createSlotPayload) => {
  const slot = await createSlotApi(projectId, payload);
  return { ...slot, blocks: [] };
});

interface updateSlotOrderPayload {
  projectId: number;
  pageId: number;
  slots: PreparedSlot[];
}

export const updateSlotOrder = createAsyncThunk(
  'slots/updateSlotOrder',
  async ({ projectId, pageId, slots }: updateSlotOrderPayload) => {
    const order = slots.map((slot, index) => ({
      id: slot.id,
      order: index + 1,
    }));
    await updateSlotOrderApi(projectId, pageId, order);
    return slots;
  },
);

export const deleteSlot = createAsyncThunk(
  'slots/deleteSlot',
  async ({ projectId, slotId }: { projectId: number; slotId: number }) => {
    const data = await deleteSlotAPi(projectId, slotId);
    return data;
  },
);

interface createBlockPayload {
  projectId: number;
  payload: ApiCreateBlock;
}

export const createBlock = createAsyncThunk('slots/createBlock', async ({ projectId, payload }: createBlockPayload) => {
  const data = await createBlockApi(projectId, payload);
  return {
    slotId: payload.slotId,
    data,
  };
});

interface editBlockPayload {
  projectId: number;
  slotId: number;
  blockId: number;
  payload: ApiUpdateBlock;
}

export const editBlock = createAsyncThunk(
  'slots/editBlock',
  async ({ projectId, blockId, payload, slotId }: editBlockPayload) => {
    const data = await updateBlockApi(projectId, blockId, payload);
    return {
      slotId,
      data,
    };
  },
);

interface updateBlockOrderPayload {
  projectId: number;
  slotId: number;
  blocks: ApiBlock[];
}

export const updateBlockOrder = createAsyncThunk(
  'slots/updateBlockOrder',
  async ({ projectId, slotId, blocks }: updateBlockOrderPayload) => {
    const order = blocks.map((block, index) => ({
      id: block.id,
      order: index + 1,
    }));
    await updateBlockOrderApi(projectId, slotId, order);
    return {
      slotId,
      blocks,
    };
  },
);

export const deleteBlock = createAsyncThunk(
  'slots/deleteBlock',
  async ({ projectId, blockId, slotId }: { projectId: number; blockId: number; slotId: number }) => {
    const data = await deleteBlockApi(projectId, blockId);
    return {
      slotId,
      data,
    };
  },
);

export const slotsSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSlots.pending, (state) => {
        state.loadingGetSlots = true;
      })
      .addCase(getSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.loadingGetSlots = false;
      })
      .addCase(createSlot.pending, (state) => {
        state.loadingCreateSlot = true;
      })
      .addCase(createSlot.fulfilled, (state, action) => {
        state.slots.push(action.payload);
        state.loadingCreateSlot = false;
      })
      .addCase(updateSlotOrder.fulfilled, (state, action) => {
        state.slots = action.payload;
      })
      .addCase(deleteSlot.pending, (state) => {
        state.loadingDeleteSlot = true;
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        const index = state.slots.findIndex((slot) => slot.id === action.payload.id);
        state.slots.splice(index, 1);
        state.loadingDeleteSlot = false;
      })
      .addCase(createBlock.pending, (state) => {
        state.loadingCreateBlock = true;
      })
      .addCase(createBlock.fulfilled, (state, action) => {
        const index = state.slots.findIndex((slot) => slot.id === action.payload.slotId);
        state.slots[index].blocks.push(action.payload.data);
        state.loadingCreateBlock = false;
      })
      .addCase(updateBlockOrder.fulfilled, (state, action) => {
        const slotIndex = state.slots.findIndex((slot) => slot.id === action.payload.slotId);
        state.slots[slotIndex].blocks = action.payload.blocks;
      })
      .addCase(editBlock.pending, (state) => {
        state.loadingEditBlock = true;
      })
      .addCase(editBlock.fulfilled, (state, action) => {
        const slotIndex = state.slots.findIndex((slot) => slot.id === action.payload.slotId);
        const blockIndex = state.slots[slotIndex].blocks.findIndex((block) => block.id === action.payload.data.id);
        Object.assign(state.slots[slotIndex].blocks[blockIndex], action.payload.data);
        state.loadingEditBlock = false;
      })
      .addCase(deleteBlock.pending, (state) => {
        state.loadingDeleteBlock = true;
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        const slotIndex = state.slots.findIndex((slot) => slot.id === action.payload.slotId);
        const blockIndex = state.slots[slotIndex].blocks.findIndex((block) => block.id === action.payload.data.id);
        state.slots[slotIndex].blocks.splice(blockIndex, 1);
        state.loadingDeleteBlock = false;
      });
  },
});

export const selectAllSlots = (state: RootState) => state.slots.slots;
export const selectSlotById = (state: RootState, id: number) => state.slots.slots.find((slot) => slot.id === id);
export const selectLoadingGetSlots = (state: RootState) => state.slots.loadingGetSlots;
export const selectLoadingCreateSlot = (state: RootState) => state.slots.loadingCreateSlot;
export const selectLoadingCreateBlock = (state: RootState) => state.slots.loadingCreateBlock;
export const selectLoadingDeleteBlock = (state: RootState) => state.slots.loadingDeleteBlock;
export const selectLoadingDeleteSlot = (state: RootState) => state.slots.loadingDeleteSlot;
export const selectLoadingEditBlock = (state: RootState) => state.slots.loadingEditBlock;

export default slotsSlice.reducer;
