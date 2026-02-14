import { configureStore } from '@reduxjs/toolkit';
import {

  uiSlice,
  uiSliceActions
} from './slices';

import {
  type TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux
} from 'react-redux';

export const store = configureStore({
  reducer: {
    ui: uiSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useDispatchRedux;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;

export const reduxActions = {
  ...uiSliceActions,
};