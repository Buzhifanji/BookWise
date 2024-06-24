<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { vOnClickOutside } from '@vueuse/components';
import dayjs from 'dayjs';
import { nextTick } from 'vue';

defineProps<{ book: Book }>()

const { dialogRef, openDialog, closeDialog } = useDialog();

const initEdite = async () => {
  openDialog()
  await nextTick()
  openDialog()
}

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-5xl " v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg ">书籍详情</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <div class="columns-1 lg:columns-2 gap-x-8 gap-y-6 ">
        <div class="flex gap-4 mb-3">
          <div>书名</div>
          <div class="stat-title whitespace-normal flex-1">{{ book.name }}</div>
        </div>
        <div class="flex gap-4 mb-3">
          <div>作者</div>
          <div class="stat-title whitespace-normal flex-1">{{ book.author }}</div>
        </div>
        <div class="flex gap-4 mb-3">
          <div>大小</div>
          <div class="stat-title">{{ book.size }}</div>
        </div>
        <div class="flex gap-4 mb-3">
          <div>页数</div>
          <div class="stat-title">{{ book.pages }}</div>
        </div>
        <div class="flex gap-4 mb-3">
          <div>出版商</div>
          <div class="stat-title whitespace-normal flex-1">{{ book.publisher }}</div>
        </div>
        <div class="flex gap-4 mb-3">
          <div>出版时间</div>
          <div class="stat-title">{{ book.publishTime }}</div>
        </div>
        <div class="flex gap-4 mb-3" v-if="book.createTime">
          <div>创建时间</div>
          <div class="stat-title">{{ dayjs(book.createTime).format('L LT') }}</div>
        </div>
        <div class="flex gap-4 mb-3" v-if="book.updateTime">
          <div>更新时间</div>
          <div class="stat-title"> {{ dayjs(book.updateTime).format('L LT') }}</div>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn btn-outline " @click="closeDialog">关闭</button>
      </div>
    </div>
  </dialog>
</template>