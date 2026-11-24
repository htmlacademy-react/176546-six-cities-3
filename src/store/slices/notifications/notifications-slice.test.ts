import { notificationsSlice, addNotification, removeNotification } from './notifications-slice';
import type { NotificationsState } from './notifications-slice';

const { reducer } = notificationsSlice;

describe('notificationsSlice', () => {
  it('возвращает начальное состояние при пустом экшене', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ items: [] });
  });

  it('добавляет уведомление с уникальным идентификатором', () => {
    const state = reducer(undefined, addNotification({ type: 'success', message: 'Готово' }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ type: 'success', message: 'Готово' });
    expect(state.items[0].id).toEqual(expect.any(String));
    expect(state.items[0].id.length).toBeGreaterThan(0);
  });

  it('присваивает разным уведомлениям разные идентификаторы', () => {
    const firstState = reducer(undefined, addNotification({ type: 'info', message: 'Раз' }));
    const state = reducer(firstState, addNotification({ type: 'error', message: 'Два' }));

    expect(state.items).toHaveLength(2);
    expect(state.items[0].id).not.toBe(state.items[1].id);
  });

  it('удаляет уведомление по идентификатору', () => {
    const firstState = reducer(undefined, addNotification({ type: 'info', message: 'Раз' }));
    const state = reducer(firstState, addNotification({ type: 'error', message: 'Два' }));
    const removedId = state.items[0].id;
    const nextState = reducer(state, removeNotification(removedId));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].message).toBe('Два');
  });

  it('не меняет список при удалении несуществующего уведомления', () => {
    const filledState = reducer(undefined, addNotification({ type: 'info', message: 'Раз' }));
    const state = reducer(filledState, removeNotification('unknown-id'));

    expect(state.items).toEqual(filledState.items);
  });

  it('не меняет состояние при неизвестном экшене', () => {
    const initialState: NotificationsState = reducer(undefined, { type: '' });

    expect(reducer(initialState, { type: 'unknown/action' })).toEqual(initialState);
  });
});
