<script setup lang="ts">
import { Book, Note } from '@renderer/batabase';
import { BookReadTimeAction, ScoreInputView, scroreDialog } from '@renderer/components';
import { convertUint8ArrayToURL, formatDecimal, formatFileSize, getInterval, isUndefined, toastSuccess } from '@renderer/shared';
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
    toastSuccess('复制成功')
  }
}

const openBookScore = () => scroreDialog(props.book)

const highlightLen = computed(() => props.notes.filter(item => item.notes === '').length)
const notesLen = computed(() => props.notes.filter(item => item.notes !== '').length)

const readTimeList = BookReadTimeAction.observableOne(props.book!.id)
const totalReadTime = computed(() => {
  const list = readTimeList.value || []
  const history = list.reduce((pre: any, cur: any) => pre + getInterval(cur.startTime, cur.endTime), 0)
  return (history + props.time).toFixed(0)
})

</script>

<template>
  <div class="flex flex-col select-none">
    <div class="flex flex-row gap-3">
      <div class="avatar">
        <div class="w-28 min-h-36 rounded">
          <img :src="convertUint8ArrayToURL(book.cover)" />
        </div>
      </div>
      <div class="flex-1 flex flex-col gap-2 overflow-hidden">
        <div class="font-bold whitespace-normal ">
          <span>{{ book.name }}</span>
          <button class="btn btn-xs btn-ghost" @click="copyAction(book.name)">
            <Copy class="w-4 h-4" />
          </button>
        </div>
        <div class="stat-title whitespace-normal">
          <span>{{ book.author }}</span>
          <button class="btn btn-xs btn-ghost" @click="copyAction(book.author)">
            <Copy class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex gap-4 ml-3 mt-5 mb-2">
      <div>出版商</div>
      <div class="stat-title whitespace-normal flex-1">{{ book.publisher }}</div>
    </div>
    <div class="flex flex-nowrap gap-4 ml-3 mb-2  overflow-hidden">
      <div class="flex-none">出版时间</div>
      <div class="stat-title shrink ">{{ book.publishTime ? dayjs(book.publishTime).format('L LT') : '未知' }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>创建时间</div>
      <div class="stat-title ">{{ dayjs(book.createTime).format('L LT') }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>更新时间</div>
      <div class="stat-title ">{{ dayjs(book.updateTime).format('L LT') }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>大小</div>
      <div class="stat-title">{{ formatFileSize(book.size) }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>页数</div>
      <div class="stat-title">{{ book.pages }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2 cursor-pointer" @click="openBookScore()">
      <div>评分</div>
      <div class="rating rating-md rating-half" @click="openBookScore()">
        <ScoreInputView :value="book.score" :readonly="true" />
      </div>
      <div class="link  text-orange-400">{{ isUndefined(book.score) || book.score === -1 ? '未知' : book.score }}
      </div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>阅读次数</div>
      <div class="stat-title">{{ book.count }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>阅读进度</div>
      <div class="stat-title">{{ formatDecimal(book.progress * 100) }}%</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>本次阅读时长</div>
      <div class="stat-title">{{ time }}分</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>阅读总时长</div>
      <div class="stat-title">{{ totalReadTime }}分</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>高亮数量</div>
      <div class="stat-title">{{ highlightLen }}</div>
    </div>
    <div class="flex gap-4 ml-3 mb-2">
      <div>笔记数量</div>
      <div class="stat-title">{{ notesLen }}</div>
    </div>
  </div>
</template>