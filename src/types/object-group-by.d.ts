// Object.groupBy is an ES2024 API. The project targets ES2022 (TypeScript 5.2),
// so the declaration is repeated here verbatim from lib.es2024.object.d.ts.
interface ObjectConstructor {
  groupBy<K extends PropertyKey, T>(
    items: Iterable<T>,
    keySelector: (item: T, index: number) => K,
  ): Partial<Record<K, T[]>>;
}
