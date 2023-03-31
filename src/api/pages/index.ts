import type { ApiCreatePage } from '../../types/pages/ApiCreatePage';
import type { ApiUpdatePage } from '../../types/pages/ApiUpdatePage';
import type { Order } from '../../types/Order';
import type { ApiPage } from '../../types/pages/ApiPage';

import { api } from '../../services/api-service';

export const createPageApi = (
  projectId: number | string,
  payload: ApiCreatePage
): Promise<ApiPage> => api.post(`/projects/${projectId}/pages`, payload);

export const getPagesByProjectId = (
  projectId: number | string
): Promise<ApiPage[]> => api.get(`/projects/${projectId}/pages`);

export const updatePageApi = (
  projectId: number | string,
  pageId: number | string,
  payload: ApiUpdatePage
): Promise<ApiPage> => api.put(`/projects/${projectId}/pages/${pageId}`, payload);

export const updatePageOrderApi = (projectId: number | string, orders: Order[]): Promise<ApiPage[]> =>
  api.put(`/projects/${projectId}/pages/order`, {
    orders,
  });

export const deletePageApi = (
  projectId: number | string,
  pageId: number | string
): Promise<{ id: number }> =>
  api.delete(`/projects/${projectId}/pages/${pageId}`);
