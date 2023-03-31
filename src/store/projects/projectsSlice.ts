import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getProjectsApi } from '../../api/projects';
import { getPermisiionsByProjectId } from '../../api/permissions';
import { getApiKeyByProjectId } from '../../api/api-key';
import { createProjectApi } from '../../api/projects';
import { updateProjectApi } from '../../api/projects';
import { deleteProjectApi } from '../../api/projects';

import type { PreparedProject } from '../../types/projects/PreparedProject';
import { ApiCreateProject } from '../../types/projects/ApiCreateProject';
import { ApiUpdateProject } from '../../types/projects/ApiUpdateProject';
import { ApiPermission } from '../../types/permissions/ApiPermission';
import { ApiKey } from '../../types/ApiKey';
import { RootState } from '..';

export interface ProjectsState {
  projects: PreparedProject[];
  loadingGetProjects: boolean;
  loadingCreateProject: boolean;
  loadingEditProject: boolean;
  loadingDeleteProject: boolean;
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
  loadingCreateProject: false,
  loadingEditProject: false,
  loadingDeleteProject: false,
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

export const createProject = createAsyncThunk('projects/createProject', async (payload: ApiCreateProject) => {
  const project = await createProjectApi(payload);
  const permissions = await getPermisiionsByProjectId(project.id);
  return {
    ...project,
    permissions,
  };
});

export const editProject = createAsyncThunk('projects/editProject', async (payload: ApiUpdateProject) => {
  const data = await updateProjectApi(payload.projectId, payload);
  return data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: number) => {
  const data = await deleteProjectApi(projectId);
  return data;
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
      })
      .addCase(createProject.pending, (state) => {
        state.loadingCreateProject = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.loadingCreateProject = false;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loadingDeleteProject = true;
      })
      .addCase(editProject.pending, (state) => {
        state.loadingEditProject = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        state.projects.splice(index, 1);
        state.loadingDeleteProject = false;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        Object.assign(state.projects[index], action.payload);
        state.loadingEditProject = false;
      });
  },
});

export const selectAllProjects = (state: RootState) => state.projects.projects;
export const selectProjectById = (state: RootState, id: number) =>
  state.projects.projects.find((project) => project.id === id);
export const selectLoadingGetProjects = (state: RootState) => state.projects.loadingGetProjects;
export const selectLoadingCreateProject = (state: RootState) => state.projects.loadingCreateProject;
export const selectLoadingDeleteProject = (state: RootState) => state.projects.loadingDeleteProject;
export const selectLoadingEditProject = (state: RootState) => state.projects.loadingEditProject;

export default projectsSlice.reducer;
