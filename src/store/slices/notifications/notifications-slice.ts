import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'error' | 'info' | 'success';

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
};

export type NotificationPayload = {
  type: NotificationType;
  message: string;
};

export type NotificationsState = {
  items: Notification[];
};

const initialState: NotificationsState = {
  items: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<Notification>) {
        state.items.push(action.payload);
      },
      prepare(payload: NotificationPayload) {
        return { payload: { id: nanoid(), ...payload } };
      },
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
