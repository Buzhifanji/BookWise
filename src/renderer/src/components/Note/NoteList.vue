<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { computed, defineProps, ref, toRaw, withDefaults } from 'vue';
import Card from './Card.vue';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { useContentCantianerStore } from '@renderer/store';
import { chuankArray, remToPx } from '@renderer/shared';

interface Props {
  data: Note[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)

const list = computed(() => {
  const count = parseInt(((store.width) /  remToPx(24 + 1)).toString())
  return chuankArray(toRaw(props.data) || [], count)
})

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: list.value.length,
    estimateSize: () => 350,
    overscan: 5,
    getScrollElement: () => parentRef.value,
  }
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const measureElement = (el) => {
  if (!el) {
    return
  }

  rowVirtualizer.value.measureElement(el)

  return undefined
}

</script>

<template>
    <div ref="parentRef" class="p-6 flex h-full overflow-auto">
        <div class="relative w-full" :style="{height: `${totalSize}px`,}">
            <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
                <div :ref="measureElement" :data-index="virtualRow.index" class="flex gap-4 absolute top-0 left-0  w-full pb-5"
                :style="{transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`}">
                <template v-for="item in list[virtualRow.index]"> 
                <Card   :data="item"/>
                </template>
                </div>
            </template>
        </div>
    </div>
</template>