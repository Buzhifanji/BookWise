export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined'
}

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number'
}
