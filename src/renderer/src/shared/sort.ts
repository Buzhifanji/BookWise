import { isNumber, isString } from './is'

export const sort = <T>(list: T[], isUp: boolean, key: keyof T) => {
  if (list.length === 0) return list

  const data = list[0][key]
  if (isString(data)) {
    return list.sort((a, b) => {
      const titleA = (a[key] as string).toLowerCase()
      const titleB = (b[key] as string).toLowerCase()
      return isUp ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA)
    })
  } else if (isNumber(data)) {
    return list.sort((a, b) =>
      isUp ? (a[key] as number) - (b[key] as number) : (b[key] as number) - (a[key] as number)
    )
  } else {
    console.warn('sortByName: data type is not supported')
    return list
  }
}
