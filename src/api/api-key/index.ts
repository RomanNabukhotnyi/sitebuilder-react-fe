import type { ApiKey } from '../../types/ApiKey';

import { api } from '../../services/api-service';

export const createApiKey = (projectId: number | string): Promise<ApiKey> =>
  api.post(`/projects/${projectId}/api-keys`);

export const getApiKeyByProjectId = (
  projectId: number | string
): Promise<ApiKey> => api.get(`/projects/${projectId}/api-keys`);

export const refreshApiKey = (
  projectId: number | string,
  apiKeyId: number | string
): Promise<ApiKey> => api.get(`/projects/${projectId}/api-keys/${apiKeyId}`);

export const deleteApiKey = (
  projectId: number | string,
  apiKeyId: number | string
) => api.delete(`/projects/${projectId}/api-keys/${apiKeyId}`);
