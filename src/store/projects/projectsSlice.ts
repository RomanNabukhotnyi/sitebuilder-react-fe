import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getProjectsApi } from '../../api/projects';
import { getPermisiionsByProjectId } from '../../api/permissions';
import { getApiKeyByProjectId } from '../../api/api-key';

import type { PreparedProject } from '../../types/projects/PreparedProject';
import { ApiPermission } from '../../types/permissions/ApiPermission';
import { ApiKey } from '../../types/ApiKey';
import { RootState } from '..';

export interface ProjectsState {
  projects: PreparedProject[];
  loadingGetProjects: boolean;
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

const initialState: ProjectsState = {
  projects: [],
  loadingGetProjects: false,
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

async function getProjectPermissions(projectId: string | number) {
  let permissions: ApiPermission[] = [];
  try {
    permissions = await getPermisiionsByProjectId(projectId);
  } catch (error) {
    permissions = [];
  }

  return permissions;
}

async function getProjectApiKey(projectId: string | number) {
  let apiKey: ApiKey | undefined;
  try {
    apiKey = await getApiKeyByProjectId(projectId);
  } catch (error) {
    apiKey = undefined;
  }

  return apiKey;
}

export const getProjects = createAsyncThunk('projects/getProjects', async () => {
  const data = await getProjectsApi();
  const projects = await Promise.all(
    data.map(async (project) => {
      const permissions: ApiPermission[] = await getProjectPermissions(project.id);
      const apiKey: ApiKey | undefined = await getProjectApiKey(project.id);
      return {
        ...project,
        permissions,
        apiKey,
      };
    }),
  );
  return projects;
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getProjects.pending, (state) => {
      state.loadingGetProjects = true;
    })
    .addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.loadingGetProjects = false;
    });
  },
});

export const selectAllProjects = (state: RootState) => state.projects.projects;
export const selectLoadingGetProjects = (state: RootState) => state.projects.loadingGetProjects;

export default projectsSlice.reducer;
