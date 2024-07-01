export const indexOf = <T>(arr: T[], val: T) => {
  return arr.indexOf(val)
}

export const isIndexOf = <T>(arr: T[], val: T) => {
  const index = indexOf<T>(arr, val)
  return index !== -1
}

export const isLen = <T>(value: T[] | string) => value.length > 0;

export const from = Array.from;

export const isArray = Array.isArray;

export const last = <T>(arr: T[]): T => arr[arr.length - 1];