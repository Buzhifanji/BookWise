<script setup lang="ts">
import { Book, Note } from '@renderer/batabase';
import { BookReadTimeAction, ScoreInputView, editDialog, scroreDialog } from '@renderer/components';
import { convertUint8ArrayToURL, formatDecimal, formatFileSize, getInterval, isUndefined, toastSuccess } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { useClipboard } from '@vueuse/core';
import dayjs from 'dayjs';
import { Copy } from 'lucide-vue-next';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ book: Book, notes: Note[], time: number }>(), {
  notes: () => [],
})

const { copy } = useClipboard()
const copyAction = (val: string) => {
  if (val) {
    copy(val)
    toastSuccess(t('common.copySuccess'))
  }
}

const openBookScore = () => scroreDialog(props.book)
const openBookEdite = () => editDialog(props.book)

const highlightLen = computed(() => props.notes.filter(item => item.notes === '').length)
const notesLen = computed(() => props.notes.filter(item => item.notes !== '').length)

const readTimeList = BookReadTimeAction.observableOne(props.book!.id)
const totalReadTime = computed(() => {
  const list = readTimeList.value || []
  const history = list.reduce((pre: any, cur: any) => pre + getInterval(cur.startTime, cur.endTime), 0)
  return (history + props.time).toFixed(0)
})
const getScore = (val: unknown) => isUndefined(val) || val === -1 ? t('common.unknown')
  : val
</script>

<template>
  <div class="flex flex-col select-none">
    <div class="flex flex-row gap-3">
      <div class="avatar">
        <div class="w-28 min-h-36 rounded" @click="openBookEdite()">
          <img :src="convertUint8ArrayToURL(book.cover)" />
        </div>
      </div>
      <div class="flex-1 flex flex-col gap-2 overflow-hidden">
        <div class="font-bold whitespace-normal ">
          <span @click="openBookEdite()">{{ book.name }}</span>
          <button class="btn btn-xs btn-ghost" @click="copyAction(book.name)">
            <Copy class="w-4 h-4" />
          </button>
        </div>
        <div class="stat-title whitespace-normal">
          <span @click="openBookEdite()">{{ book.author }}</span>
          <button class="btn btn-xs btn-ghost" @click="copyAction(book.author)">
            <Copy class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex gap-4 ml-3 mt-5 mb-2">
      <div>{{ t('book.publisher') }}</div>
      <div class="stat-title whitespace-normal flex-1" v-if="book.publisher">{{ book.publisher }}</div>
      <div class="stat-title whitespace-normal flex-1" v-else>{{ t('common.unknown') }}</div>
    </div>
    <div class="flex flex-nowrap gap-4 ml-3 mb-2  overflow-hidden">
      <div class="flex-none">{{ t('book.publishTime') }}</div>
      <div class="stat-title shrink ">{{ book.publishTime ? dayjs(book.publishTime).format('L LT') : '未知' }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.createTime') }}</div>
      <div class="stat-title ">{{ dayjs(book.createTime).format('L LT') }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.updateTime') }}</div>
      <div class="stat-title ">{{ dayjs(book.updateTime).format('L LT') }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.size') }}</div>
      <div class="stat-title">{{ formatFileSize(book.size) }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.page') }}</div>
      <div class="stat-title">{{ book.pages }}</div>
    </div>
    <div class="flex gap-1 ml-3 mb-2 cursor-pointer" @click="openBookScore()">
      <div>{{ t('book.score') }}</div>
      <div class="rating rating-md rating-half" @click="openBookScore()">
        <ScoreInputView :value="book.score" :readonly="true" />
      </div>
      <div class="link  text-orange-400">{{ getScore(book.score) }}
      </div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.openCount') }}</div>
      <div class="stat-title">{{ book.count }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.readProgress') }}</div>
      <div class="stat-title">{{ formatDecimal(book.progress * 100) }}%</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.thisReadTime') }}</div>
      <div class="stat-title">{{ time }}分</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.totalReadTime') }}</div>
      <div class="stat-title">{{ totalReadTime }}分</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.highlightLen') }}</div>
      <div class="stat-title">{{ highlightLen }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>{{ t('book.notesLen') }}</div>
      <div class="stat-title">{{ notesLen }}</div>
    </div>
    <div class="flex items-center gap-4 ml-3 mb-2" v-if="book.groupName">
      <div>{{ t('book.bookshelf') }}</div>
      <div class="badge badge-accent">{{ book.groupName }}</div>
    </div>
  </div>
</template>