import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

import type { PreparedProject } from '../../types/projects/PreparedProject';

export interface ProjectsState {
  projects: PreparedProject[];
  loadingGetProjects: boolean;
  loadingCreateProject: boolean;
  loadingEditProject: boolean;
  loadingDeleteProject: boolean;
  loadingAddPermission: boolean;
  loadingDeletePermission: boolean;
  loadingCreateApiKey: boolean;
  loadingRefreshApiKey: boolean;
  loadingDeleteApiKey: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: ProjectsState = {
  projects: [],
  loadingGetProjects: false,
  loadingCreateProject: false,
  loadingEditProject: false,
  loadingDeleteProject: false,
  loadingAddPermission: false,
  loadingDeletePermission: false,
  loadingCreateApiKey: false,
  loadingRefreshApiKey: false,
  loadingDeleteApiKey: false,
  status: 'idle',
  error: null,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    increment: (state) => {
      // state.value += 1;
    },
    decrement: (state) => {
      // state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       // state.value += action.payload;
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
});

export const { increment, decrement, incrementByAmount } = projectsSlice.actions;

export const selectCount = (state: RootState) => 2;

export default projectsSlice.reducer;
