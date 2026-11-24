import '@testing-library/jest-dom/vitest';

// jsdom подменяет AbortController своим, а Request берётся из undici (Node)
// и требует сигнал своего класса. Для тестов сигнал не нужен — срезаем его.
if (typeof globalThis.Request !== 'undefined') {
  const NativeRequest = globalThis.Request;

  globalThis.Request = class extends NativeRequest {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
      if (init && 'signal' in init) {
        const rest = { ...init };
        delete rest.signal;

        super(input, rest);
        return;
      }

      super(input, init);
    }
  } as typeof Request;
}
