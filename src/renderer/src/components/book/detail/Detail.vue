<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookReadTimeAction, BookshelfAction, NoteAction, ScoreInputView, SkeletonView } from '@renderer/components';
import { useDialog } from '@renderer/hooks';
import { convertUint8ArrayToURL, formatDecimal, formatFileSize, getInterval, isUndefined, toastError } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { useToggle } from '@vueuse/core';
import dayjs from 'dayjs';
import { nextTick, ref } from 'vue';

const props = defineProps<{ book: Book }>()

const { dialogRef, openDialog, closeDialog } = useDialog();
const [loading, setLoading] = useToggle(false)
const totalReadTime = ref(0)
const highlightLen = ref(0)
const notesLen = ref(0)

const initEdite = async () => {
  try {
    setLoading(true)
    openDialog()
    await nextTick()
    openDialog()
    const id = props.book!.id;
    // 阅读时长
    const [readTimeList, notes] = await Promise.all([
      BookReadTimeAction.findByEbookId(id),
      NoteAction.findByEBookId(id),
    ])
    const totalTime = readTimeList.reduce((pre: any, cur: any) => pre + getInterval(cur.startTime, cur.endTime), 0)
    totalReadTime.value = +totalTime.toFixed(0)

    // 笔记
    highlightLen.value = notes.filter(item => item.notes === '').length
    notesLen.value = notes.filter(item => item.notes !== '').length
  } catch (err) {
    toastError(`${t('book.readDetailFail')}: ${err}`)
  } finally {
    setLoading(false)
  }
}
initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-6xl " v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg ">{{ t('book.detail') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <SkeletonView v-if="loading" />
      <div class="hero" v-else>
        <div class="hero-content flex-col lg:flex-row">
          <div class="w-32 min-h-44 rounded mr-4">
            <img :src="convertUint8ArrayToURL(book.cover)" />
          </div>
          <div class="columns-1 lg:columns-2 gap-x-8 gap-y-6 ">
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.name') }}</div>
              <div class="stat-title whitespace-normal flex-1">{{ book.name }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.author') }}</div>
              <div class="stat-title whitespace-normal flex-1">{{ book.author }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.size') }}</div>
              <div class="stat-title">{{ formatFileSize(book.size) }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.page') }}</div>
              <div class="stat-title">{{ book.pages }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.publisher') }}</div>
              <div class="stat-title whitespace-normal flex-1">{{ book.publisher }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.publishTime') }}</div>
              <div class="stat-title">{{ book.publishTime ? dayjs(book.publishTime).format('L LT') :
                t('common.unkown') }}</div>
            </div>
            <div class="flex gap-4 mb-3" v-if="book.createTime">
              <div>{{ t('book.createTime') }}</div>
              <div class="stat-title">{{ dayjs(book.createTime).format('L LT') }}</div>
            </div>
            <div class="flex gap-4 mb-3" v-if="book.updateTime">
              <div>{{ t('book.updateTime') }}</div>
              <div class="stat-title"> {{ dayjs(book.updateTime).format('L LT') }}</div>
            </div>
            <div class="flex gap-4 mb-3 ">
              <div>{{ t('book.score') }}</div>
              <div class="rating rating-md rating-half">
                <ScoreInputView :value="book.score" :readonly="true" />
              </div>
              <div class="  text-orange-400">{{ isUndefined(book.score) || book.score === -1 ? t('common.unkown')
                : book.score }}
              </div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.openCount') }}</div>
              <div class="stat-title">{{ book.count }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.readProgress') }}</div>
              <div class="stat-title">{{ formatDecimal(book.progress * 100) }}%</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.totalReadTime') }}</div>
              <div class="stat-title">{{ totalReadTime }}{{ t('common.minute') }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.highlightLen') }}</div>
              <div class="stat-title">{{ highlightLen }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>{{ t('book.notesLen') }}</div>
              <div class="stat-title">{{ notesLen }}</div>
            </div>
            <div class="flex gap-4 mb-3" v-if="book.group">
              <div>{{ t('book.bookshelf') }}</div>
              <div class="badge badge-accent">{{ BookshelfAction.toBookshelf(book.group).name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn btn-outline " @click="closeDialog">{{ t('common.close') }}</button>
      </div>
    </div>
  </dialog>
</template>