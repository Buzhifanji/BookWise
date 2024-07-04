<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { RouterName } from '@renderer/route';
import { chuankArray, remToPx } from '@renderer/shared';
import { noteNavbarStore, useContentCantianerStore, useFilterNoteStore } from '@renderer/store';
import { t } from '@renderer/view/setting';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { get } from '@vueuse/core';
import { Flag } from 'lucide-vue-next';
import { computed, defineProps, ref, toRaw, withDefaults } from 'vue';
import { NoteAction } from './action';
import Card from './Card.vue';
import { detaiNotelDialog } from './detail';
import { removeNoteDialog } from './remove';

interface Props {
  data: Note[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const filterStore = useFilterNoteStore()

// 笔记内容
const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)

const sortByName = (list: Note[], isUp: boolean) => {
  return list.sort((a, b) => {
    const titleA = a.eBookName.toLowerCase();
    const titleB = b.eBookName.toLowerCase();
    return isUp ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
  });
}

const sortByTime = (list: Note[], isUp: boolean) => {
  return list.sort((a, b) => {
    return isUp ? a.createTime - b.createTime : b.createTime - a.createTime;
  });
}

const list = computed(() => {
  const count = parseInt(((store.width) / remToPx(24 + 1)).toString())

  let originalData = [...toRaw(props.data)]
  // 书名过滤
  const bookId = filterStore.eBookId
  if (bookId) {
    originalData = originalData.filter((item) => item.eBookId === bookId)
  }

  // 排序
  const isUp = get(noteNavbarStore).isUp
  const sortBy = get(noteNavbarStore).sortBy

  let data: Note[] = []

  if (sortBy === 'bookName') {
    // 按照书名进行排序
    data = sortByName(originalData, isUp)
  } else if (sortBy === 'addTime') {
    // 按照添加时间排序
    data = sortByTime(originalData, isUp)
  }

  return chuankArray(toRaw(data) || [], count)
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
  <div ref="parentRef" class="p-6  h-full overflow-auto" v-if="data.length">
    <div class="relative w-full" :style="{ height: `${totalSize}px`, }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="flex gap-4 absolute top-0 left-0  w-full pb-5"
          :style="{ transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)` }">
          <template v-for="item in list[virtualRow.index]">
            <Card :data="item" @delete="removeBefore" @detail="onDetail" @jump="jump" />
          </template>
        </div>
      </template>
    </div>
  </div>
  <div class="hero min-h-screen bg-base-200" v-else>
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{ t('note.empty') }}</h1>
        <p class="py-6">{{ t('note.emptyNoteListTip') }}</p>
        <RouterLink :to="RouterName.Book">
          <button class="btn btn-secondary">
            <Flag />{{ t('book.jumpToBookList') }}
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>