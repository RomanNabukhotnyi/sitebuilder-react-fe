import type { ApiUser } from '../../types/users/ApiUser';

import { api } from '../../services/api-service';

export const getUserApi = async (): Promise<ApiUser> => api.get('/users');
