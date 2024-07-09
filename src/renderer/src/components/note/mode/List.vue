<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { computed, defineProps, ref, withDefaults } from 'vue';
import { NoteAction } from '../action';
import { detaiNotelDialog } from '../detail';
import { removeNoteDialog } from '../remove';
import Card from './NoteContent.vue';

interface Props {
  data: Note[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const parentRef = ref<HTMLElement | null>(null)

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: props.data.length,
    estimateSize: () => 350,
    overscan: 5,
    getScrollElement: () => parentRef.value,
  }
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const measureElement = (el: HTMLElement) => {
  if (!el) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(el)
  })
  return undefined
}

// 删除
const removeBefore = (value: Note) => removeNoteDialog(value)

// 详情
const onDetail = (value: Note) => detaiNotelDialog(value)

// 跳转
const jump = (value: Note) => NoteAction.jumpToBook(value)


</script>

<template>
  <div ref="parentRef" class="p-6 flex justify-center h-full overflow-auto scrollbar-thin">
    <div class="relative w-full md:w-[40rem]" :style="{ height: `${totalSize}px`, }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="flex gap-4 absolute top-0 left-0  w-full pb-5"
          :style="{ transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)` }">
          <Card :data="data[virtualRow.index]" @delete="removeBefore" @detail="onDetail" @jump="jump" />
        </div>
      </template>
    </div>
  </div>
</template>