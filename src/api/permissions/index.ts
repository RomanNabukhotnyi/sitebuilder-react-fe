import type { ApiPermission } from '../../types/permissions/ApiPermission';
import type { ApiCreatePermission } from '../../types/permissions/ApiCreatePermission';

import { api } from '../../services/api-service';

export const createPermission = (
  projectId: number | string,
  payload: ApiCreatePermission
): Promise<ApiPermission> => api.post(`/projects/${projectId}/permissions`, payload);

export const getPermisiionsByProjectId = (
  projectId: number | string
): Promise<ApiPermission[]> => api.get(`/projects/${projectId}/permissions`);

export const deletePermission = (
  projectId: number | string,
  userId: number | string
): Promise<{ id: number }> => api.delete(`/projects/${projectId}/permissions/${userId}`);
