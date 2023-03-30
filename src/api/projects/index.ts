import type { ApiProject } from '../../types/projects/ApiProject';
import type { ApiCreateProject } from '../../types/projects/ApiCreateProject';
import type { ApiUpdateProject } from '../../types/projects/ApiUpdateProject';

import { api } from "../../services/api-service";

export const createProjectApi = (payload: ApiCreateProject): Promise<ApiProject> => api.post('/projects', payload);

export const getProjectsApi = (): Promise<ApiProject[]> => api.get('/projects');

export const updateProjectApi = (projectId: number | string, payload: ApiUpdateProject): Promise<ApiProject> => api.put(`/projects/${projectId}`, payload);

export const deleteProjectApi = (projectId: number | string): Promise<{ id: number }> => api.delete(`/projects/${projectId}`);