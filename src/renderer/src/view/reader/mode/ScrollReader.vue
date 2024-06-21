<script setup lang="ts">
import { wait } from '@renderer/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { get, onKeyStroke, useThrottleFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { getBookHref, isExternal, openExternal } from '../render';
import { Position } from '../type';
import { getSectionContainer, getSourceTarget, toNextView, toPrewView } from '../util';
import SectionView from './Section.vue';

interface Props {
  section: any[]
}

const props = withDefaults(defineProps<Props>(), {
  section: () => []
})


defineExpose({ jump })

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: props.section.length,
    overscan: 5,
    getScrollElement: () => containerRef.value,
    estimateSize: (i: number) => props.section[i].height,
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

const calculateElementDistance = (target: HTMLElement, sectionContainer: HTMLElement) => {
  const targetRect = target.getBoundingClientRect()
  const sectionContainerRect = sectionContainer.getBoundingClientRect()
  return targetRect.top - sectionContainerRect.top
}

/**
 * 目录跳转
 * @param index page index
 * @param id  高亮内容id
 * @param position 上次阅读位置
 */
async function jump(index: number, id?: string, position?: Position) {
  rowVirtualizer.value.scrollToIndex(index, { align: 'start', behavior: 'smooth' })

  const scrollTop = get(containerRef)?.scrollTop || 0

  console.log(scrollTop)

  // 跳转到高亮内容
  if (id) {
    await wait()

    const target = getSourceTarget(index, id)
    if (!target) return

    const rect = target.getBoundingClientRect()

    if (scrollTop) {
      rowVirtualizer.value.scrollToOffset(scrollTop + rect.top, { align: 'center', behavior: 'smooth' })
    }
  }

  // 跳转到之前的阅读位置
  if (position) {
    await wait()
    const sectionContainer = getSectionContainer(index)
    console.log(sectionContainer)
    const tagNameNodes = sectionContainer?.querySelectorAll(position.tagName) || []
    const target = tagNameNodes[position.index] as HTMLElement
    if (!target) return
    console.log(target)
    const distanceToParentTop = calculateElementDistance(target, sectionContainer)
    rowVirtualizer.value.scrollToOffset(scrollTop + distanceToParentTop, { align: 'start', behavior: 'smooth' })
    console.log(target)
    if (target) {
      const { top } = target.getBoundingClientRect()
      rowVirtualizer.value.scrollToOffset(scrollTop + top, { align: 'start', behavior: 'smooth' })
    }
  }
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
  console.log('dom.scrollTop', dom.scrollTop)
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