import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import type { MutableRefObject } from 'react';
import { useOnClickOutside } from './use-on-click-outside';

const setup = () => {
  const element = document.createElement('div');
  element.innerHTML = '<span data-testid="child">внутри</span>';
  document.body.append(element);

  const ref = { current: element } as MutableRefObject<HTMLDivElement | null>;

  return { element, ref };
};

describe('useOnClickOutside', () => {
  let element: HTMLDivElement;

  afterEach(() => {
    element?.remove();
  });

  it('вызывает обработчик при клике вне элемента', () => {
    const handler = vi.fn();
    const setupResult = setup();
    element = setupResult.element;

    renderHook(() => useOnClickOutside(setupResult.ref, handler));

    fireEvent.mouseDown(document.body);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('не вызывает обработчик при клике внутри элемента', () => {
    const handler = vi.fn();
    const setupResult = setup();
    element = setupResult.element;

    renderHook(() => useOnClickOutside(setupResult.ref, handler));

    fireEvent.mouseDown(setupResult.element.firstElementChild as Element);

    expect(handler).not.toHaveBeenCalled();
  });

  it('реагирует на касание вне элемента', () => {
    const handler = vi.fn();
    const setupResult = setup();
    element = setupResult.element;

    renderHook(() => useOnClickOutside(setupResult.ref, handler));

    fireEvent.touchStart(document.body);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('не вызывает обработчик, пока ссылка пуста', () => {
    const handler = vi.fn();
    const ref = { current: null } as MutableRefObject<HTMLDivElement | null>;

    renderHook(() => useOnClickOutside(ref, handler));

    fireEvent.mouseDown(document.body);

    expect(handler).not.toHaveBeenCalled();
  });

  it('вызывает актуальный обработчик после смены пропа', () => {
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const setupResult = setup();
    element = setupResult.element;

    const { rerender } = renderHook(({ handler }) => useOnClickOutside(setupResult.ref, handler), {
      initialProps: { handler: firstHandler },
    });

    rerender({ handler: secondHandler });
    fireEvent.mouseDown(document.body);

    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalledTimes(1);
  });

  it('снимает подписки при размонтировании', () => {
    const handler = vi.fn();
    const setupResult = setup();
    element = setupResult.element;

    const { unmount } = renderHook(() => useOnClickOutside(setupResult.ref, handler));

    unmount();
    fireEvent.mouseDown(document.body);

    expect(handler).not.toHaveBeenCalled();
  });
});
