<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookReadTimeAction, BookshelfAction, NoteAction, ScoreInputView } from '@renderer/components';
import { useDialog } from '@renderer/hooks';
import { convertUint8ArrayToURL, formatDecimal, formatFileSize, getInterval, isUndefined } from '@renderer/shared';
import { vOnClickOutside } from '@vueuse/components';
import dayjs from 'dayjs';
import { nextTick, ref } from 'vue';

const props = defineProps<{ book: Book }>()

const { dialogRef, openDialog, closeDialog } = useDialog();

const totalReadTime = ref(0)
const highlightLen = ref(0)
const notesLen = ref(0)


const initEdite = async () => {
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
      <div class="hero ">
        <div class="hero-content flex-col lg:flex-row">
          <div class="w-32 min-h-44 rounded mr-4">
            <img :src="convertUint8ArrayToURL(book.cover)" />
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
              <div class="stat-title">{{ formatFileSize(book.size) }}</div>
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
              <div class="stat-title">{{ book.publishTime ? dayjs(book.publishTime).format('L LT') : '未知' }}</div>
            </div>
            <div class="flex gap-4 mb-3" v-if="book.createTime">
              <div>创建时间</div>
              <div class="stat-title">{{ dayjs(book.createTime).format('L LT') }}</div>
            </div>
            <div class="flex gap-4 mb-3" v-if="book.updateTime">
              <div>更新时间</div>
              <div class="stat-title"> {{ dayjs(book.updateTime).format('L LT') }}</div>
            </div>
            <div class="flex gap-4 mb-3 ">
              <div>评分</div>
              <div class="rating rating-md rating-half">
                <ScoreInputView :value="book.score" :readonly="true" />
              </div>
              <div class="  text-orange-400">{{ isUndefined(book.score) || book.score === -1 ? '未知' : book.score }}
              </div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>阅读次数</div>
              <div class="stat-title">{{ book.count }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>阅读进度</div>
              <div class="stat-title">{{ formatDecimal(book.progress * 100) }}%</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>阅读总时长</div>
              <div class="stat-title">{{ totalReadTime }}分</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>高亮数量</div>
              <div class="stat-title">{{ highlightLen }}</div>
            </div>
            <div class="flex gap-4 mb-3">
              <div>笔记数量</div>
              <div class="stat-title">{{ notesLen }}</div>
            </div>
            <div class="flex gap-4 mb-3" v-if="book.group">
              <div>书架</div>
              <div class="badge badge-accent">{{ BookshelfAction.toBookshelf(book.group).name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn btn-outline " @click="closeDialog">关闭</button>
      </div>
    </div>
  </dialog>
</template>