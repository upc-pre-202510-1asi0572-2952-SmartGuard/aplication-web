type NormalizeKeys<T> = {
  [K in keyof T as K extends string
    ? `${Lowercase<FirstChar<K>>}${RestChars<K>}`
    : K]: T[K];
};

type FirstChar<S extends string> = S extends `${infer F}${string}` ? F : S;
type RestChars<S extends string> = S extends `${string}${infer R}` ? R : never;

export default function normalizeKeys<T extends Record<string, any>>(obj: T): NormalizeKeys<T> {
  const result: any = {};
  for (const key in obj) {
    const newKey =
      key[0].toUpperCase() === key[0]
        ? key[0].toLowerCase() + key.slice(1)
        : key;
    result[newKey] = obj[key];
  }
  return result;
}