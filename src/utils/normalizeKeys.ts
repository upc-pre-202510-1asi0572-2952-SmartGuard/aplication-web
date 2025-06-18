type FirstChar<S extends string> = S extends `${infer F}${string}` ? F : S;
type RestChars<S extends string> = S extends `${string}${infer R}` ? R : never;

type NormalizeKeys<T> = {
  [K in keyof T as K extends string
      ? `${Lowercase<FirstChar<K>>}${RestChars<K>}`
      : K]: T[K];
};

export default function normalizeKeys<T extends Record<string, any>>(obj: T): NormalizeKeys<T> {
  const result = {} as NormalizeKeys<T>;
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const newKey = key[0].toLowerCase() + key.slice(1);

    (result as any)[newKey] = obj[key];
  }
  return result;
}
