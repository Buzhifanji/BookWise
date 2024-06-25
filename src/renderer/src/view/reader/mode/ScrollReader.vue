<script setup lang="ts">
import { formatDecimal } from '@renderer/shared';
import { observeElementOffset, useVirtualizer } from '@tanstack/vue-virtual';
import { get, onKeyStroke, useDebounceFn, useThrottleFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { getBookHref, isExternal, openExternal } from '../render';
import { Position } from '../type';
import { findPositionDom, getNavbarRect, getSourceTarget, toNextView, toPrewView } from '../util';
import SectionView from './Section.vue';

const debouncedFn = useDebounceFn(() => {
  // do something
}, 1000)

window.addEventListener('resize', debouncedFn)
interface Props {
  section: any[]
}

const props = withDefaults(defineProps<Props>(), {
  section: () => []
})


defineExpose({ jump })
const emit = defineEmits(['progress'])

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化



let isJump = false
let highlightId: string | undefined = undefined // 高亮跳转id
let lastReadPosition: Position | undefined = undefined // 上次阅读位置
let jumpPage: number = -1 // 跳转的页面

/**
 * 目录跳转
 * @param index page index
 * @param id  高亮内容id
 * @param position 上次阅读位置
 */
async function jump(index: number, id?: string, position?: Position) {
  rowVirtualizer.value.scrollToIndex(index, { align: 'start', behavior: 'smooth' })

  jumpPage = index
  highlightId = id
  lastReadPosition = position
  isJump = true
}

function jumpToHighlight() {
  if (highlightId && jumpPage !== -1) {
    const target = getSourceTarget(jumpPage, highlightId)
    if (!target) return

    const rect = target.getBoundingClientRect()
    const scrollTop = get(containerRef)?.scrollTop || 0

    if (scrollTop) {
      rowVirtualizer.value.scrollToOffset(scrollTop + rect.top, { align: 'center', behavior: 'smooth' })
    }
  }
}

function jumpToPosition() {
  if (lastReadPosition && jumpPage !== -1) {
    const scrollTop = get(containerRef)?.scrollTop || 0
    const target = findPositionDom(jumpPage, lastReadPosition)
    if (!target) return
    const navBarRect = getNavbarRect()?.height || 0
    const { top } = target.getBoundingClientRect()
    rowVirtualizer.value.scrollToOffset(scrollTop + top - navBarRect, { align: 'start', behavior: 'smooth' })
  }
}

function resetJump() {
  highlightId = undefined
  jumpPage = -1
  lastReadPosition = undefined
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

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: props.section.length,
    overscan: 5,
    getScrollElement: () => containerRef.value,
    estimateSize: (i: number) => props.section[i].height,
    observeElementOffset: (instance: any, cb: any) => observeElementOffset(instance, (offset, isScrolling) => {
      cb(offset, isScrolling)
      calculateProgress(offset)
      // 滚动停止
      if (!isScrolling && isJump) {
        jumpToHighlight()
        jumpToPosition()
        resetJump()
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
  if (isExternal(href)) {
    openExternal(href)
  } else {
    const value = getBookHref(href)
    if (value) {
      jump(value.index)
    }
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
  if (!get(containerRef)) return
  const { height, dom, scrollTop } = getHeight(h)

  toPrewView(dom, scrollTop, height)
}

// 上一页
const prewView = useThrottleFn(() => prewViewAction(), 300)
onKeyStroke(['ArrowLeft'], prewView)

// 向上翻一点点
const littlePrewView = useThrottleFn(() => prewViewAction(10), 100)
onKeyStroke(['ArrowUp'], littlePrewView)

const nextViewAction = (h?: number) => {
  if (!get(containerRef)) return
  const { height, dom, scrollTop } = getHeight(h)

  toNextView(dom, scrollTop, height, get(totalSize))
}

// 下一页
const nextView = useThrottleFn(() => nextViewAction(), 300)
onKeyStroke(['ArrowRight'], nextView)

// 向下翻一点点
const littleNextView = useThrottleFn(() => nextViewAction(10), 100)
onKeyStroke(['ArrowDown'], littleNextView)



</script>

<template>
  <!-- 书籍内容 -->
  <div class=" bg-base-100 h-full cursor-pointer  overflow-auto  scrollbar-thin " ref="containerRef">
    <div class="relative w-full" :style="{ height: `${totalSize}px` }">
      <div class="absolute top-0 left-0 w-full " :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }">
        <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :data-index="virtualRow.index"
          :data-page-number="virtualRow.index" :ref="measureElement" class="prose mx-auto my-0 mb-12 prose-width">
          <SectionView :data="section[virtualRow.index].html" :index="virtualRow.index" @link-click="linkClick">
          </SectionView>
        </div>
      </div>
    </div>
  </div>
</template>