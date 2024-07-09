<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { chuankArray, remToPx } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
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

// 笔记内容
const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)

const list = computed(() => {
  const count = parseInt(((store.width) / remToPx(24 + 1)).toString())
  const res = chuankArray(props.data, count)
  const last = res[res.length - 1]
  if (last && last.length < count) {
    const len = count - last.length
    for (let i = 0; i < len; i++) {
      last.push({} as any)
    }
  }
  return res
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
  <div ref="parentRef" class="p-6  h-full overflow-auto scrollbar-thin">
    <div class="relative w-full" :style="{ height: `${totalSize}px`, }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="flex gap-4 absolute top-0 left-0  w-full pb-5"
          :style="{ transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)` }">
          <template v-for="item in list[virtualRow.index]">
            <Card :data="item" @delete="removeBefore" @detail="onDetail" @jump="jump" v-if="item.id" />
            <div class=" w-full" v-else></div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>