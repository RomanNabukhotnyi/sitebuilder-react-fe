import type { ApiSignUp } from '../../types/auth/ApiSignUp';
import type { ApiLogin } from '../../types/auth/ApiLogin';

import { api } from '../../services/api-service';

export const signUpApi = (payload: ApiSignUp) =>
  api.post('/auth/sign-up', payload);

export const loginApi = (
  payload: ApiLogin
): Promise<{ accessToken: string; refreshToken: string }> =>
  api.post('/auth/login', payload);

export const refreshApi = (): Promise<{ accessToken: string }> =>
  api.get('/auth/refresh');
