import { $ } from '@renderer/shared'

export function getSectionContainer(page: string | number) {
  return $(`div[data-page-number='${page}']`) as HTMLElement
}

export function getSourceTarget(page: string | number, id: string) {
  const dom = getSectionContainer(page)
  if (!dom) return null
  return dom.querySelector(`span[data-web-highlight_id='${id}']`) as HTMLElement
}
