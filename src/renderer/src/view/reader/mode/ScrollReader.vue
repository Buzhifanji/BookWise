<script setup lang="ts">
import { bookLoadedSetionBus, BookRender } from '@renderer/hooks';
import { $, formatDecimal } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { observeElementOffset, useVirtualizer } from '@tanstack/vue-virtual';
import { get, onKeyStroke, set, useDebounceFn, useThrottleFn } from '@vueuse/core';
import scrollIntoView from 'scroll-into-view-if-needed';
import { computed, nextTick, ref } from 'vue';
import { CONTINAER_ID } from '../highlight';
import { Position } from '../type';
import { findActiveCatalog, findPositionDom, getNavbarRect, getSectionContainer, getSourceTarget, toNextView, toPrewView } from '../util';
import SectionView from './Section.vue';

interface Props {
  sections: number
  isScrollLocked: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  sections: 0,
  isScrollLocked: false,
})


defineExpose({ catalogJump, noteJump, positionJump })
const emit = defineEmits(['progress'])

const bookPageStore = useBookPageStore()

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化
const total = ref(props.sections)

let isJump = false
let highlightId: string | undefined = undefined // 高亮跳转id
let lastReadPosition: Position | undefined = undefined // 上次阅读位置
let jumpPage: number = -1 // 跳转的页面
let anchor: ((doc: HTMLElement) => HTMLElement) | undefined = undefined
let isFinishedRender = false // 是否完成渲染
let cacheDomToview: (() => void) | undefined = undefined // 缓存dom跳转到视图的函数

const toPage = () => {
  if (jumpPage !== -1) {
    rowVirtualizer.value.scrollToIndex(jumpPage, { align: 'start', behavior: 'smooth' })
  }
}


function catalogJump(href: string) {
  const resolved = BookRender.getBookHref(href)
  if (resolved) {
    const { index, anchor: _anchor } = resolved
    anchor = _anchor
    jumpPage = index
    isJump = true
    toPage()
  }
}

function noteJump(page: number, id: string) {
  jumpPage = page
  highlightId = id
  isJump = true
  toPage()
  highlightToView()
}

async function positionJump(position: Position) {
  if (!position) return
  jumpPage = +position.page
  lastReadPosition = position
  isJump = true
}

// 计算进度
const calculateProgress = useDebounceFn((offset: number) => {
  const total = get(totalSize)
  if (total) {
    const height = getNavbarRect()?.height || 0
    const current = Math.min(offset + window.innerHeight - height, total)
    emit('progress', formatDecimal(current / total, 4))
  }
}, 200)

// 处理的文本内容加载完成
bookLoadedSetionBus.on(async () => {
  set(total, get(total) + 1)
  await nextTick()
  set(total, get(total) - 1)
  await nextTick()
  toPage()
  isFinishedRender = true
  if (cacheDomToview) {
    await nextTick()
    cacheDomToview()
  }
})

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: get(total),
    overscan: 5,
    getScrollElement: () => containerRef.value,
    estimateSize: (i: number) => BookRender.section[i]?.height || 1000,
    observeElementOffset: (instance: any, cb: any) => observeElementOffset(instance, (offset, isScrolling) => {
      cb(offset, isScrolling)
      calculateProgress(offset)
      // 滚动停止
      if (!isScrolling && isJump) {
        if (jumpPage !== -1) {
          if (highlightId) {
            highlightToView()
          } else if (lastReadPosition) {
            positionToView()
          } else if (anchor) {
            const container = $('#' + CONTINAER_ID) as HTMLElement
            if (container) {
              const dom = anchor(container)
              if (dom) {
                domToView(dom)
              } else {
                const container = getSectionContainer(jumpPage)
                if (container) {
                  domToView(container)
                }
              }
            }
            anchor = undefined
          } else {
            const container = getSectionContainer(jumpPage)
            if (container) {
              domToView(container)
            }
          }
        }
        isJump = false
      }

      if (!isScrolling) {
        bookPageStore.page = findActiveCatalog()
      }
    })
  }
})
const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
const measureElement = (element: any) => {
  if (!element) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(element)
  })
  return undefined
}

// 点击书本链接
function linkClick(href: string) {
  if (BookRender.isExternal(href)) {
    BookRender.openExternal(href)
  } else {
    const value = BookRender.getBookHref(href)
    if (value) {
      jumpPage = value.index
      anchor = value.anchor
      isJump = true
      toPage()
      jumpPage = -1
    }
  }
}

function positionToView() {
  if (lastReadPosition && jumpPage !== -1) {
    const target = findPositionDom(jumpPage, lastReadPosition)
    if (target) {
      domToView(target)
      if (isFinishedRender) {
        lastReadPosition = undefined
        jumpPage = -1
      }
    }
  }
}

// 高亮内容跳转
function highlightToView() {
  if (highlightId && jumpPage !== -1) {
    const target = getSourceTarget(jumpPage, highlightId)
    if (target) {
      domToView(target, 'center')
      if (isFinishedRender) {
        highlightId = undefined
        jumpPage = -1
      }
    }
  }
}

// 指定dom滚动到顶部
async function domToView(dom: HTMLElement, block: ScrollLogicalPosition = 'start') {
  if (isFinishedRender) {
    scrollIntoView(dom, { behavior: 'smooth', scrollMode: 'always', block })
    cacheDomToview = undefined
  } else {
    cacheDomToview = () => domToView(dom, block)
  }
}

const getHeight = (h?: number) => {
  const dom = containerRef.value!
  let result = 0
  if (h) {
    result = h
  } else {
    const { height } = dom.getBoundingClientRect()
    result = height
  }
  return { height: result, dom, scrollTop: dom.scrollTop }
}

const prewViewAction = (h?: number) => {
  if (!props.isScrollLocked) {
    if (!get(containerRef)) return
    const { height, dom, scrollTop } = getHeight(h)

    toPrewView(dom, scrollTop, height)
  }
}

// 上一页
const prewView = useThrottleFn(() => prewViewAction(), 300)
onKeyStroke(['ArrowLeft'], prewView)

// 向上翻一点点
const littlePrewView = useThrottleFn(() => {
  if (!props.isScrollLocked) {
    prewViewAction(10)
  }
}, 100)
onKeyStroke(['ArrowUp'], littlePrewView)

const nextViewAction = (h?: number) => {
  if (!props.isScrollLocked) {
    if (!get(containerRef)) return
    const { height, dom, scrollTop } = getHeight(h)

    toNextView(dom, scrollTop, height, get(totalSize))
  }
}

// 下一页
const nextView = useThrottleFn(() => nextViewAction(), 300)
onKeyStroke(['ArrowRight'], nextView)

// 向下翻一点点
const littleNextView = useThrottleFn(() => {
  if (!props.isScrollLocked) {
    nextViewAction(10)
  }
}, 100)
onKeyStroke(['ArrowDown'], littleNextView)

</script>

<template>
  <!-- 书籍内容 -->
  <div class=" bg-base-100 h-full cursor-pointer  overflow-auto  scrollbar-thin" ref="containerRef">
    <div class="relative w-full" :style="{ height: `${totalSize}px` }">
      <div class="absolute top-0 left-0 w-full " :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }"
        id="scrollConatinerWise">
        <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :data-index="virtualRow.index"
          :data-page-number="virtualRow.index" :ref="measureElement" class="prose mx-auto my-0 mb-12 prose-width">
          <SectionView :index="virtualRow.index" @link-click="linkClick">
          </SectionView>
        </div>
      </div>
    </div>
  </div>
</template>