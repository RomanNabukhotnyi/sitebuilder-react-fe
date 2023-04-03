import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getApiKeyByProjectId } from '../../api/api-key';
import { createProjectApi, deleteProjectApi, updateProjectApi, getProjectsApi } from '../../api/projects';
import { createPermissionApi, deletePermissionApi, getPermisiionsByProjectIdApi } from '../../api/permissions';
import { createApiKey, refreshApiKey, deleteApiKey } from '../../api/api-key';

import type { PreparedProject } from '../../types/projects/PreparedProject';
import { ApiCreateProject } from '../../types/projects/ApiCreateProject';
import { ApiUpdateProject } from '../../types/projects/ApiUpdateProject';
import { ApiPermission } from '../../types/permissions/ApiPermission';
import { ApiCreatePermission } from '../../types/permissions/ApiCreatePermission';
import { ApiKey } from '../../types/ApiKey';
import { RootState } from '..';

export interface ProjectsState {
  projects: PreparedProject[];
  loadingGetProjects: boolean;
  loadingCreateProject: boolean;
  loadingEditProject: boolean;
  loadingDeleteProject: boolean;
  loadingCreatePermission: boolean;
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
  loadingCreatePermission: false,
  loadingDeletePermission: false,
  loadingCreateApiKey: false,
  loadingRefreshApiKey: false,
  loadingDeleteApiKey: false,
  status: 'idle',
  error: null,
};

async function getProjectPermissions(projectId: string | number) {
  let permissions: ApiPermission[] = [];
  try {
    permissions = await getPermisiionsByProjectIdApi(projectId);
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
  const permissions = await getPermisiionsByProjectIdApi(project.id);
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

export const createPermission = createAsyncThunk('project/createPermission', async (payload: ApiCreatePermission) => {
  const data = await createPermissionApi(payload.projectId, payload);
  return {
    projectId: payload.projectId,
    data,
  };
});

export const deletePermission = createAsyncThunk(
  'project/deletePermission',
  async ({ projectId, userId }: { projectId: number; userId: number }) => {
    const data = await deletePermissionApi(projectId, userId);
    return {
      projectId,
      data,
    };
  },
);

export const createProjectApikey = createAsyncThunk('project/createProjectApiKey', async (projectId: number) => {
  const data = await createApiKey(projectId);
  return {
    projectId,
    data,
  };
});

export const refreshProjectApikey = createAsyncThunk(
  'project/refreshProjectApiKey',
  async ({ projectId, apiKeyId }: { projectId: number; apiKeyId: number }) => {
    const data = await refreshApiKey(projectId, apiKeyId);
    return {
      projectId,
      data,
    };
  },
);

export const deleteProjectApikey = createAsyncThunk(
  'project/deleteProjectApiKey',
  async ({ projectId, apiKeyId }: { projectId: number; apiKeyId: number }) => {
    await deleteApiKey(projectId, apiKeyId);
    return {
      projectId,
    };
  },
);

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
      .addCase(editProject.pending, (state) => {
        state.loadingEditProject = true;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        Object.assign(state.projects[index], action.payload);
        state.loadingEditProject = false;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loadingDeleteProject = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        state.projects.splice(index, 1);
        state.loadingDeleteProject = false;
      })
      .addCase(createPermission.pending, (state) => {
        state.loadingCreatePermission = true;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.projectId);
        state.projects[index].permissions.push(action.payload.data);
        state.loadingCreatePermission = false;
      })
      .addCase(deletePermission.pending, (state) => {
        state.loadingDeletePermission = true;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        const projectIndex = state.projects.findIndex((project) => project.id === action.payload.projectId);
        const permissionIndex = state.projects[projectIndex].permissions.findIndex(
          (permission) => permission.userId === action.payload.data.id,
        );
        state.projects[projectIndex].permissions.splice(permissionIndex, 1);
        state.loadingDeletePermission = false;
      })
      .addCase(createProjectApikey.pending, (state) => {
        state.loadingCreateApiKey = true;
      })
      .addCase(createProjectApikey.fulfilled, (state, action) => {
        const projectIndex = state.projects.findIndex((project) => project.id === action.payload.projectId);
        state.projects[projectIndex].apiKey = action.payload.data;
        state.loadingCreateApiKey = false;
      })
      .addCase(refreshProjectApikey.pending, (state) => {
        state.loadingRefreshApiKey = true;
      })
      .addCase(refreshProjectApikey.fulfilled, (state, action) => {
        const projectIndex = state.projects.findIndex((project) => project.id === action.payload.projectId);
        state.projects[projectIndex].apiKey = action.payload.data;
        state.loadingRefreshApiKey = false;
      })
      .addCase(deleteProjectApikey.pending, (state) => {
        state.loadingDeleteApiKey = true;
      })
      .addCase(deleteProjectApikey.fulfilled, (state, action) => {
        const projectIndex = state.projects.findIndex((project) => project.id === action.payload.projectId);
        state.projects[projectIndex].apiKey = undefined;
        state.loadingDeleteApiKey = false;
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
export const selectLoadingCreatePermission = (state: RootState) => state.projects.loadingCreatePermission;
export const selectLoadingCreateApiKey = (state: RootState) => state.projects.loadingCreateApiKey;
export const selectLoadingRefreshApiKey = (state: RootState) => state.projects.loadingRefreshApiKey;
export const selectLoadingDeleteApiKey = (state: RootState) => state.projects.loadingDeleteApiKey;

export default projectsSlice.reducer;
