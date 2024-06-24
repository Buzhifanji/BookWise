<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { scroreDialog } from '@renderer/components';
import { convertUint8ArrayToURL, formatFileSize, isUndefined, toastSuccess } from '@renderer/shared';
import { useClipboard } from '@vueuse/core';
import dayjs from 'dayjs';
import { Copy } from 'lucide-vue-next';

const props = defineProps<{ book: Book }>()

const { copy } = useClipboard()

const copyAction = (val: string) => {
  if (val) {
    copy(val)
    toastSuccess('复制成功')
  }
}

const openBookScore = () => scroreDialog(props.book)
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
      <div class="stat-title">{{ isUndefined(book.score) || book.score === -1 ? '未知' : book.score }}</div>
    </div>
  </div>
</template>