import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUtils = () => {
  const prepareData = <T extends object>(obj: T): T | undefined => {
    const preparedObject = Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== ''));
    return Object.keys(preparedObject).length ? (preparedObject as T) : undefined;
  };

  return {
    prepareData,
  };
};
