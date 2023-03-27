import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signUpApi, loginApi, refreshApi } from '../../api/auth';

import { ApiSignUp } from '../../types/auth/ApiSignUp';
import { ApiLogin } from '../../types/auth/ApiLogin';
import { ApiUser } from '../../types/users/ApiUser';
import { RootState } from '..';

export interface AuthState {
  user: ApiUser | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  status: 'idle',
  error: null,
};

export const signUp = createAsyncThunk('auth/signUp', async (payload: ApiSignUp) => {
    await signUpApi(payload);
});

export const login = createAsyncThunk('auth/login', async (payload: ApiLogin) => {
    await loginApi(payload);
});

export const refresh = createAsyncThunk('auth/refresh', async () => {
    await refreshApi();
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
      }); 
  },
});

export const selectLoading = (state: RootState)=>state.auth.loading;

export default authSlice.reducer;
