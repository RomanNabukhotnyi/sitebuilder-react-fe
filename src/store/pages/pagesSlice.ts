import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getPagesByProjectId, createPageApi, updatePageApi, deletePageApi } from '../../api/pages';

import { ApiPage } from '../../types/pages/ApiPage';
import { ApiCreatePage } from '../../types/pages/ApiCreatePage';
import { ApiUpdatePage } from '../../types/pages/ApiUpdatePage';
import { RootState } from '..';

export interface PagesState {
  pages: ApiPage[];
  loadingGetPages: boolean;
  loadingCreatePage: boolean;
  loadingEditPage: boolean;
  loadingDeletePage: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: PagesState = {
  pages: [],
  loadingGetPages: false,
  loadingCreatePage: false,
  loadingEditPage: false,
  loadingDeletePage: false,
  status: 'idle',
  error: null,
};

export const getPages = createAsyncThunk('pages/getPages', async (projectId: number) => {
  const data = await getPagesByProjectId(projectId);
  return data;
});

export const createPage = createAsyncThunk('pages/createPage', async (payload: ApiCreatePage) => {
  const page = await createPageApi(payload.projectId, payload);
  return page;
});

export const editPage = createAsyncThunk('pages/editPage', async (payload: ApiUpdatePage) => {
  const data = await updatePageApi(payload.projectId, payload.pageId, payload);
  return data;
});

export const deletePage = createAsyncThunk(
  'pages/deletePage',
  async ({ projectId, pageId }: { projectId: number; pageId: number }) => {
    const data = await deletePageApi(projectId, pageId);
    return data;
  },
);

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
      })
      .addCase(createPage.pending, (state) => {
        state.loadingCreatePage = true;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.pages.push(action.payload);
        state.loadingCreatePage = false;
      })
      .addCase(editPage.pending, (state) => {
        state.loadingEditPage = true;
      })
      .addCase(editPage.fulfilled, (state, action) => {
        const index = state.pages.findIndex((page) => page.id === action.payload.id);
        Object.assign(state.pages[index], action.payload);
        state.loadingEditPage = false;
      })
      .addCase(deletePage.pending, (state) => {
        state.loadingDeletePage = true;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        const index = state.pages.findIndex((page) => page.id === action.payload.id);
        state.pages.splice(index, 1);
        state.loadingDeletePage = false;
      });
  },
});

export const selectAllPages = (state: RootState) => state.pages.pages;
export const selectPageById = (state: RootState, id: number) =>
  state.pages.pages.find((page) => page.id === id);
export const selectLoadingGetPages = (state: RootState) => state.pages.loadingGetPages;
export const selectLoadingCreatePage = (state: RootState) => state.pages.loadingCreatePage;
export const selectLoadingEditPage = (state: RootState) => state.pages.loadingEditPage;
export const selectLoadingDeletePage = (state: RootState) => state.pages.loadingDeletePage;

export default pagesSlice.reducer;
