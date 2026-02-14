import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface IUiSlice {
  notification: {
    message: string;
    variant: 'error' | 'success' | 'warning';
  } | null;
  notificationModal: {
    title: string;
    content: string;
  } | null;
}
const initialState: IUiSlice = {
  notification: null,
  notificationModal: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<IUiSlice['notification']>) => {
      state.notification = action.payload;
    },
    setNotificationModal: (state, action: PayloadAction<IUiSlice['notificationModal']>) => {
      state.notificationModal = action.payload;
    },
  }
})

export const uiSliceActions = uiSlice.actions;

export default uiSlice.reducer;