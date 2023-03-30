import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getPagesByProjectId } from '../../api/pages';

import { ApiPage } from '../../types/pages/ApiPage';
import { RootState } from '..';

export interface PagesState {
  pages: ApiPage[];
  loadingGetPages: boolean;
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

const initialState: PagesState = {
  pages: [],
  loadingGetPages: false,
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

export const getPages = createAsyncThunk('pages/getPages', async (projectId: number) => {
  const data = await getPagesByProjectId(projectId);
  return data;
});

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPages.pending, (state) => {
      state.loadingGetPages = true;
    })
    .addCase(getPages.fulfilled, (state, action) => {
      state.pages = action.payload;
      state.loadingGetPages = false;
    });
  },
});

export const selectAllPages = (state: RootState) => state.pages.pages;
export const selectLoadingGetPages = (state: RootState) => state.pages.loadingGetPages;

export default pagesSlice.reducer;
