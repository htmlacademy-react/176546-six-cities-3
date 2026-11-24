import { getRatingWidth } from './utils';

describe('getRatingWidth', () => {
  it('округляет рейтинг перед расчётом ширины заливки', () => {
    expect(getRatingWidth(2.1)).toBe('40%');
    expect(getRatingWidth(2.6)).toBe('60%');
  });

  it('отдаёт 100% для максимального рейтинга', () => {
    expect(getRatingWidth(4.8)).toBe('100%');
  });
});
