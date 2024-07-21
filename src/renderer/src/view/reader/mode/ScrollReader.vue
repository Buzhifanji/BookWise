<script setup lang="ts">
import { bookLoadedSetionBus, BookRender } from '@renderer/hooks';
import { formatDecimal } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { observeElementOffset, useVirtualizer } from '@tanstack/vue-virtual';
import { get, onKeyStroke, set, useDebounceFn, useThrottleFn } from '@vueuse/core';
import { computed, nextTick, ref } from 'vue';
import { Position } from '../type';
import { findActiveCatalog, findPositionDom, getNavbarRect, getSectionContainer, getSourceTarget, toNextView, toPrewView } from '../util';
import SectionView from './Section.vue';
import { jumpAction, setFinishedRender } from './action';

interface Props {
  isScrollLocked: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  isScrollLocked: false,
})


defineExpose({ catalogJump, noteJump, positionJump })
const emit = defineEmits(['progress'])

const bookPageStore = useBookPageStore()

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化
const total = computed(() => get(BookRender.sectionNum))

const jumpPage = ref(-1)
const hightlightJump = new jumpAction<string>() // 高亮跳转
const readPositionJump = new jumpAction<Position>() // 上次阅读位置
const anchorJump = new jumpAction<((doc: HTMLElement) => HTMLElement)>()

let isJump = false

const toPage = () => {
  if (get(jumpPage) !== -1) {
    rowVirtualizer.value.scrollToIndex(get(jumpPage), { align: 'start', behavior: 'smooth' })
  }
}


function catalogJump(href: string) {
  const resolved = BookRender.getBookHref(href)
  if (resolved) {
    const { index, anchor } = resolved
    anchorJump.set(anchor)
    set(jumpPage, index)
    isJump = true
    toPage()
  }
}

function noteJump(page: number, id: string) {
  set(jumpPage, page)
  hightlightJump.set(id)
  isJump = true
  toPage()
  highlightToView()
}

async function positionJump(position: Position) {
  if (!position) return
  set(jumpPage, +position.page)
  readPositionJump.set(position)
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
  setFinishedRender(true)
  hightlightJump.runCache()
  readPositionJump.runCache()
  anchorJump.runCache()
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
        const page = get(jumpPage)
        if (page !== -1) {
          if (hightlightJump.has()) {
            highlightToView()
          } else if (readPositionJump.has()) {
            positionToView()
          } else if (anchorJump.has()) {
            const container = getSectionContainer(page)
            if (container) {
              const dom = anchorJump.get()!((container))
              console.log('dom', dom)
              console.log('jumpPage', jumpPage.value)
              if (dom) {
                anchorJump.domToView(dom)
              } else {
                const container = getSectionContainer(page)
                if (container) {
                  anchorJump.domToView(container)
                }
              }
            }
            anchorJump.set(undefined)
          } else {
            const container = getSectionContainer(page)
            if (container) {
              anchorJump.domToView(container)
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
      set(jumpPage, value.index)
      anchorJump.set(value.anchor)
      isJump = true
      toPage()
      set(jumpPage, -1)
    }
  }
}

function positionToView() {
  const position = readPositionJump.get()!
  const target = findPositionDom(get(jumpPage), position)
  readPositionJump.toView(jumpPage, target)
}

// 高亮内容跳转
function highlightToView() {
  const highlightId = hightlightJump.get()!
  const target = getSourceTarget(get(jumpPage), highlightId)
  hightlightJump.toView(jumpPage, target, 'center')
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