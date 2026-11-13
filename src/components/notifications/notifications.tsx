import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getNotifications, removeNotification } from '@/store/slices/notifications';

const TOAST_OPTIONS = { autoClose: 5000 };

function Notifications(): null {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getNotifications);
  const shown = useRef(new Set<string>());

  useEffect(() => {
    items.forEach(({ id, type, message }) => {
      if (shown.current.has(id)) {
        return;
      }

      shown.current.add(id);

      void toast[type](message, {
        ...TOAST_OPTIONS,
        onClose: () => {
          shown.current.delete(id);
          dispatch(removeNotification(id));
        },
      });
    });
  }, [items, dispatch]);

  return null;
}

export default Notifications;
