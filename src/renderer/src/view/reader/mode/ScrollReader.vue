<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual';
import { computed, ref } from 'vue';
import { getBookHref, isExternal, openExternal } from '../render';
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
function jump(index: number) {
  console.log('index', index)
  rowVirtualizer.value.scrollToIndex(index, { align: 'start', behavior: 'smooth' })
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


</script>

<template>
  <!-- 书籍内容 -->
  <div class=" bg-base-100 h-full cursor-pointer  overflow-auto hover:scrollbar-thin scrollbar-none" ref="containerRef">
    <div class="relative w-full" :style="{ height: `${totalSize}px` }">
      <div class="absolute top-0 left-0 w-full " :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }">
        <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :data-index="virtualRow.index"
          :data-page-number="virtualRow.index" :ref="measureElement" class="prose mx-auto my-0 ">
          <SectionView :data="section[virtualRow.index]" @link-click="linkClick"></SectionView>
        </div>
      </div>
    </div>
  </div>
</template>