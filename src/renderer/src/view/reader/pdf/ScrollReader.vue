<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual';
import { computed, ref } from 'vue';
import '../../../assets/css/pdf.css';
import { DPFUtil } from '../render';
import SectionView from './section.vue';

defineExpose({ jump })

const style = computed(() => {
  const { width, height } = DPFUtil.size
  return { width: `${width}px`, height: `${height}px` }
})

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: DPFUtil.total.value,
    overscan: 5,
    getScrollElement: () => containerRef.value,
    estimateSize: () => DPFUtil.size.height,
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

function jump() { }
</script>

<template>
  <!-- 书籍内容 -->
  <div class=" bg-base-100 h-full cursor-pointer  overflow-auto scrollbar-thin " ref="containerRef">
    <div class="relative w-full" :style="{ height: `${totalSize}px` }">
      <div class="absolute top-0 left-0 w-full " :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }">
        <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :data-index="virtualRow.index"
          :data-page-number="virtualRow.index" :ref="measureElement" class=" mx-auto my-0 mb-6 shadow" :style="style">
          <SectionView :index="virtualRow.index">
          </SectionView>
        </div>
      </div>
    </div>
  </div>
</template>