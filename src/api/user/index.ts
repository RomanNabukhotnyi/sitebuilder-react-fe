import type { ApiUser } from '../../types/users/ApiUser';

import { api } from '../../services/api-service';

export const getUser = async (): Promise<ApiUser> => api.get('/users');
