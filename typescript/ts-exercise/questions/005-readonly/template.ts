import { Equal } from '@type-challenges/utils';

type GetReadonlyKeys<T, R extends T = Readonly<T>> = {
  [K in keyof T]-?: Equal<Pick<R, K>, Pick<T, K>> extends true ? K : never;
}[keyof T];
// type GetReadonlyKeys<T> = {
//   readonly [K in keyof T]: T[K];
// };

type persons = {
  readonly name: string;
};
