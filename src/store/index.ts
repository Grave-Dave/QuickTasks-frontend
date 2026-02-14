import { configureStore } from '@reduxjs/toolkit';
import { tasksSlice, tasksSliceActions, uiSlice, uiSliceActions } from './slices';

import {
  type TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    tasks: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useDispatchRedux;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;

export const reduxActions = {
  ...uiSliceActions,
  ...tasksSliceActions,
};

export { uiSliceActions, tasksSliceActions } from "./slices";