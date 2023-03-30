import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSlotsByPageId } from '../../api/slots';
import { getBlocksBySlotId } from '../../api/blocks';

import { PreparedSlot } from '../../types/slots/PreparedSlot';
import { RootState } from '..';

export interface SlotsState {
  slots: PreparedSlot[];
  loadingGetSlots: boolean;
  // loadingCreateProject: boolean;
  // loadingEditProject: boolean;
  // loadingDeleteProject: boolean;
  // loadingAddPermission: boolean;
  // loadingDeletePermission: boolean;
  // loadingCreateApiKey: boolean;
  // loadingRefreshApiKey: boolean;
  // loadingDeleteApiKey: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: SlotsState = {
  slots: [],
  loadingGetSlots: false,
  // loadingCreateProject: false,
  // loadingEditProject: false,
  // loadingDeleteProject: false,
  // loadingAddPermission: false,
  // loadingDeletePermission: false,
  // loadingCreateApiKey: false,
  // loadingRefreshApiKey: false,
  // loadingDeleteApiKey: false,
  status: 'idle',
  error: null,
};

interface Payload {
    projectId: number;
    pageId: number;
}

export const getSlots = createAsyncThunk('slots/getSlots', async ({projectId, pageId}: Payload) => {
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
    })
  );
  return slots;
});

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
    });
  },
});

export const selectAllSlots = (state: RootState) => state.slots.slots;
export const selectLoadingGetSlots = (state: RootState) => state.slots.loadingGetSlots;

export default slotsSlice.reducer;
