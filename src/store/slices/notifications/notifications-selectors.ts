import type { RootState } from '@/store';
import type { Notification } from '@/store/slices/notifications/notifications-slice';

export const getNotifications = (state: RootState): Notification[] => state.notifications.items;
