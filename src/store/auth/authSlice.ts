import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signUpApi, loginApi, refreshApi } from '../../api/auth';
import { getUserApi } from '../../api/user';

import { ApiSignUp } from '../../types/auth/ApiSignUp';
import { ApiLogin } from '../../types/auth/ApiLogin';
import { ApiUser } from '../../types/users/ApiUser';
import { RootState } from '..';

export interface AuthState {
  user: ApiUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const signUp = createAsyncThunk('auth/signUp', async (payload: ApiSignUp) => {
  await signUpApi(payload);
});

export const login = createAsyncThunk('auth/login', async (payload: ApiLogin, thunkApi) => {
  const data = await loginApi(payload);
  const { accessToken, refreshToken } = data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  thunkApi.dispatch(getUser());
});

export const refresh = createAsyncThunk('auth/refresh', async () => {
  await refreshApi();
});

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const data = await getUserApi();
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(signUp.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
