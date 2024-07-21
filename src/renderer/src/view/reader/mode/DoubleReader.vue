<script setup lang="ts">
import { RingLoadingView } from '@renderer/components';
import { t } from '@renderer/data';
import { BookRender } from '@renderer/hooks';
import { $, formatDecimal, toastWarning, wait } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { get, onKeyStroke, set, useResizeObserver, useScroll, useThrottleFn, useToggle } from '@vueuse/core';
import { nextTick, onMounted, ref, watchEffect } from 'vue';
import { Position } from '../type';
import { findPositionDom, getSectionSize, getSourceTarget } from '../util';
import SectionView from './Section.vue';

interface Props {
  isScrollLocked: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  isScrollLocked: false,
})
const emit = defineEmits(['progress'])

defineExpose({ catalogJump, noteJump, positionJump })

let currentIndex = 0;
let position: Position | undefined = undefined;
let highlightId: string | undefined = undefined;
let href: string | undefined = undefined

const [isLoading, setLoading] = useToggle(false)
const bookPageStore = useBookPageStore()
const containerRef = ref<HTMLElement | null>(null) // 监听dom变化
const remendyRef = ref<HTMLElement | null>(null) // 监听dom变化

const resize = useThrottleFn(async () => {
  setHeight()
  await nextTick()
  resetScrollLeft()
}, 400)

useResizeObserver(containerRef, resize)

const currentPage = ref<number>(0)

// 进度
const { x, isScrolling } = useScroll(containerRef)
watchEffect(() => {
  if (!isScrolling.value) {
    // 滚动结束
    getActiveCatalog()
    onProgress()
  }
})

function onProgress() {
  const dom = get(containerRef)
  if (!dom) return

  const size = getSectionSize(get(currentPage))
  if (!size) return
  const top = get(x)
  // 是否有滚动条
  const { offsetHeight, scrollHeight, firstElementChild } = dom
  if (firstElementChild!.clientHeight > offsetHeight) {
    const progress = formatDecimal((top + offsetHeight) / scrollHeight, 4)
    const res = formatDecimal(size.progress - size.current + progress * size.current, 4)
    emit('progress', res)
  } else {
    emit('progress', size.progress)
  }
}

const getPageWidth = () => {
  const containerParent = $('#scrollConatinerWise') as HTMLElement
  console.log(containerParent)
  console.log(containerParent.getBoundingClientRect().width)
  return containerParent.getBoundingClientRect().width
}

function clearScroll() {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0
  }
  currentIndex = 0
}

// 更新章节内容
async function updateSection() {
  setLoading(true)
  currentIndex = 0
  await nextTick()
  setLoading(false)
}

const style = ref({ height: '0px' })

function setHeight() {
  const dom = containerRef.value
  if (dom) {
    let result = 0;
    const width = getPageWidth()
    const scrollWidth = dom.scrollWidth
    if (scrollWidth > width) {
      const remainder = scrollWidth % width
      if (remainder > 0) {
        result = width - remainder
      }
    }
    set(style, { height: `${result}px` })
  }
}

onMounted(() => {
  setHeight()
})

function highlightToView() {
  if (highlightId) {
    const target = getSourceTarget(get(currentPage), highlightId)
    console.log(target)
    if (target) {
      currentIndex = 0
      domToView(target)
      highlightId = undefined
    }
  }
}

function anchorJump() {
  if (!href) return
  const container = $('#scrollConatinerWise') as HTMLElement
  if (!container) return

  bookPageStore.setPage(href)
  const value = BookRender.getBookHref(href)
  const anchor = value?.anchor
  if (anchor) {
    const target = anchor(container)
    if (target) {
      domToView(target)
      href = undefined
    } else {
      clearScroll()
    }
  }
}

async function sectionLoaded(i: number) {
  if (currentPage.value !== i) return

  // 恢复阅读位置
  if (position) {
    const target = findPositionDom(i, position)
    if (target) {
      domToView(target)
    }
    position = undefined
  }

  anchorJump()
  getActiveCatalog()
  onProgress()
  setHeight()
}

function noteLoaded(i: number) {
  if (currentPage.value !== i) return

  // 高亮跳转
  highlightToView()
}

/**
 * 当窗口变化的时候，需要重置滚动条的位置
 */
function resetScrollLeft() {
  if (currentIndex > 0) {
    const dom = containerRef.value
    if (!dom) return
    const width = getPageWidth()

    const { scrollWidth, scrollLeft } = dom
    if (scrollLeft === 0) return

    if (scrollWidth <= width) {
      dom.scrollLeft = 0
    } else {
      dom.scrollLeft = currentIndex * width
    }
  }
}

function domToView(target: HTMLElement) {
  const dom = containerRef.value!
  const width = getPageWidth()
  const { offsetWidth, scrollLeft } = dom
  const remainder = +(target.offsetLeft / width).toFixed(0)
  const res = remainder * offsetWidth
  if (scrollLeft !== res) {
    containerRef.value!.scrollLeft = res
  }
}

// 点击目录跳转
async function catalogJump(page: number, _href: string) {
  if (page !== get(currentPage)) {
    clearScroll()
    set(currentPage, page)
  }

  href = _href
  anchorJump()
}
async function noteJump(page: number, id: string) {
  set(currentPage, page)
  highlightId = id
  await nextTick()
  highlightToView()
}
async function positionJump(_position: Position) {
  if (!position) return
  clearScroll()
  set(currentPage, +_position.page)
  position = _position
}

function getActiveCatalog() {
  // const page = get(currentPage)
  // if (BookRender.isInOneCatalog) {
  //   const catalog = BookRender.bookToc.find((item) => item.page === page)
  //   const rangeCatalog = tocTreeToArray([catalog])
  //   bookPageStore.setPage(findIntersectPage(rangeCatalog) || '')
  // } else {
  //   const href = BookRender.bookArrayToc.find(item => item.page === page)?.href || ''
  //   bookPageStore.setPage(href)
  // }
}

async function prev() {
  if (currentPage.value > 0) {
    currentPage.value -= 1
    await updateSection()
    // 需要等待 弥补的空div渲染完成
    await wait(20)
    const dom = containerRef.value!

    dom.scrollTo({ left: dom.scrollWidth })
  } else {
    toastWarning(t('common.getFirstView'))
  }
}

async function next() {
  if (currentPage.value < get(BookRender.sectionNum) - 1) {
    currentPage.value += 1
    await updateSection()
    // 需要等待 弥补的空div渲染完成
    await wait(20)
    clearScroll()
  } else {
    toastWarning(t('common.getLastView'))
  }
}

const prewView = useThrottleFn(() => {
  if (props.isScrollLocked) return

  const dom = containerRef.value
  if (dom) {
    const width = getPageWidth()
    const { scrollWidth, scrollLeft } = dom

    if (scrollWidth <= width) {
      // 只有一页的情况
      prev()
    } else if (scrollLeft + width >= scrollWidth) {
      // 已经滚动到最右端了
      currentIndex -= 1
      dom.scrollLeft -= width
    } else if (scrollLeft === 0) {
      // 已经滚动到最左端
      prev()
    } else {
      currentIndex -= 1
      dom.scrollLeft -= width
    }
  } else {
    console.warn('dom is null')
    prev()
  }
}, 300)


const nextView = useThrottleFn(() => {
  if (props.isScrollLocked) return

  const dom = containerRef.value
  if (dom) {
    const width = getPageWidth()
    const { scrollWidth, scrollLeft } = dom
    if (scrollWidth <= width) {
      // 只有一页的情况
      next()
    } else if (scrollLeft + width >= scrollWidth) {
      // 已经滚动到最右端了
      next()
    } else {
      currentIndex += 1
      dom.scrollLeft += width
    }
  } else {
    console.warn('dom is null')
    next()
  }
}, 300)

onKeyStroke(['ArrowDown', 'ArrowRight'], nextView)
onKeyStroke(['ArrowUp', 'ArrowLeft'], prewView)


// 点击书本链接
function linkClick(href: string) {
  if (BookRender.isExternal(href)) {
    BookRender.openExternal(href)
  } else {
    const value = BookRender.getBookHref(href)
    if (value) {
      catalogJump(value.index, '')
    }
  }
}

</script>

<template>
  <!-- 书籍内容 -->
  <div class="bg-base-300 h-full cursor-pointer p-10 overflow-hidden">
    <div class="prose prose-width  mx-auto my-0 bg-base-100 rounded-3xl h-full relative" id="scrollConatinerWise">
      <div class="absolute inset-0">
        <RingLoadingView v-if="isLoading" class="rounded-3xl" />
        <template v-else>
          <div ref="containerRef" :data-page-number="currentPage"
            class="columns-1 scroll-smooth transition ease-in-out lg:columns-2 gap-x-16 h-full overflow-auto p-8 pb-12 double-container relative">
            <SectionView :key="currentPage" :loaded="sectionLoaded" :noteLoaded="noteLoaded" :index="currentPage"
              @link-click="linkClick">
            </SectionView>
            <div ref="remendyRef" :style="style"></div>
          </div>
          <button class="btn btn-outline absolute bottom-3 left-10 btn-sm select-none" @click="prewView">{{
            $t('common.prewView')
          }}</button>
          <button class="btn btn-outline absolute bottom-3 right-10 btn-sm select-none" @click="nextView">{{
            $t('common.nextView')
          }}</button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.double-container {
  column-fill: auto;
}
</style>