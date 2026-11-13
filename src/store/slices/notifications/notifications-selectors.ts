import type { RootState } from '@/store';
import type { Notification } from './notifications-slice';

export const getNotifications = (state: RootState): Notification[] => state.notifications.items;
