import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import projectsReducer from './projects/projectsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
