<script setup lang="ts">
import { wait } from '@renderer/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { get, onKeyStroke, useThrottleFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { getBookHref, isExternal, openExternal } from '../render';
import { toNextView, toPrewView } from '../scroll';
import { getSourceTarget } from '../source';
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
    estimateSize: () => 1024,
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

// 目录跳转
async function jump(index: number, id?: string) {
  rowVirtualizer.value.scrollToIndex(index, { align: 'start', behavior: 'smooth' })
  if (!id) return

  await wait()
  const target = getSourceTarget(index, id)
  if (!target) return

  const rect = target.getBoundingClientRect()

  const scrollTop = get(containerRef)?.scrollTop || 0
  if (scrollTop) {
    rowVirtualizer.value.scrollToOffset(scrollTop + rect.top, { align: 'center', behavior: 'smooth' })
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
  <div class=" bg-base-100 h-full cursor-pointer  overflow-auto scrollbar-thin " ref="containerRef">
    <div class="relative w-full" :style="{ height: `${totalSize}px` }">
      <div class="absolute top-0 left-0 w-full " :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }">
        <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :data-index="virtualRow.index"
          :data-page-number="virtualRow.index" :ref="measureElement" class="prose mx-auto my-0 mb-12 prose-width">
          <SectionView :data="section[virtualRow.index]" :index="virtualRow.index" @link-click="linkClick">
          </SectionView>
        </div>
      </div>
    </div>
  </div>
</template>