<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { NoteMode } from '@renderer/enum';
import { RouterName } from '@renderer/route';
import { haveIntersection, sort } from '@renderer/shared';
import { noteSortStore, settingStore, useFilterNoteStore } from '@renderer/store';
import { t } from '@renderer/view/setting';
import { get } from '@vueuse/core';
import { Flag } from 'lucide-vue-next';
import { computed, defineProps, toRaw, withDefaults } from 'vue';
import { TagAction } from '../tag/action';
import CardMode from './mode/Card.vue';
import ListMode from './mode/List.vue';

interface Props {
  data: Note[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const filterStore = useFilterNoteStore()

// 笔记内容
const list = computed(() => {
  let originalData = [...toRaw(props.data)]
  // 书名过滤
  const bookId = filterStore.eBookId
  if (bookId) {
    originalData = originalData.filter((item) => item.eBookId === bookId)
  }

  // 标签过滤
  const tagIds = filterStore.tags
  if (tagIds.length) {
    originalData = originalData.filter((item) => {
      const tag = TagAction.toTag(item.tag).map(item => item.id)
      return haveIntersection(tag, tagIds)
    })
  }

  // 排序
  const isUp = get(noteSortStore).isUp
  const sortBy = get(noteSortStore).sortBy

  let data: Note[] = []

  if (sortBy === 'bookName') {
    // 按照书名进行排序
    data = sort(originalData, isUp, 'eBookName')
  } else if (sortBy === 'addTime') {
    // 按照添加时间排序
    data = sort(originalData, isUp, 'createTime')
  }

  return data
})

</script>

<template>
  <template v-if="data.length">
    <CardMode v-if="settingStore.noteMode === NoteMode.card" :data="list" />
    <ListMode :data="list" v-else />
  </template>
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