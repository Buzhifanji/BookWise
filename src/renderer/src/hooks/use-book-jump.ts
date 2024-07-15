import { Book } from '@renderer/batabase'
import { router, RouterName } from '@renderer/route'
import { settingStore } from '@renderer/store'
import { beforeOpenBook } from './use-render-book'

function jump(params: any, name: string) {
  const isBlank = settingStore.value.isOpenNew
  const res = { name, params: params }
  if (isBlank) {
    const { href } = router.resolve(res)
    window.open(href, '_blank')
  } else {
    router.push(res)
  }
}

/**
 * 图书跳转
 * @param id
 */
export function bookJump(id: string, val?: Book) {
  if (val) beforeOpenBook(val)
  jump({ id }, RouterName.Reader)
}

/**
 * 听书跳转
 * @param id
 */
export function listenBookJump(id: string, val?: Book) {
  if (val) beforeOpenBook(val)
  jump({ id }, RouterName.ListenBook)
}
