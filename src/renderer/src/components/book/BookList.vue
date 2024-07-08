<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { FileUploadView } from '@renderer/components';
import { BookshelftMode } from '@renderer/enum';
import { useRightClick } from '@renderer/hooks';
import { sort, toastSuccess } from '@renderer/shared';
import { bookSortStore, settingStore, useBookFilterStore } from '@renderer/store';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { get, set } from '@vueuse/core';
import { BellElectric, Heart, HeartOff, PencilLine, Plus, SquareLibrary, Star, Trash2, UndoDot } from 'lucide-vue-next';
import { defineProps, ref, toRaw, watchEffect, withDefaults } from 'vue';
import { BookAction, BookReadTimeAction } from './action';
import { bookshelfDialog } from './bookshelf';
import { detailDialog } from './detail';
import { editDialog } from './edit';
import BookShelfMode from './mode/Bookshelf.vue';
import CardMode from './mode/Card.vue';
import ListMode from './mode/List.vue';
import { removeDialog } from './remove';
import { scroreDialog } from './score';

interface Props {
  data: Book[],
  isRecycleBin?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  isRecycleBin: false,
})
const emit = defineEmits<{
  (e: 'click', payload: Book): void;
}>();

const filterStore = useBookFilterStore()
const bookMode = (value: BookshelftMode) => value === settingStore.value.bookshelf

const sortByReadTime = async (data: Book[], isUp: boolean) => {
  const allReadTime = await BookReadTimeAction.getAll()
  const timeMap = new Map<string, number>()
  for (const item of allReadTime) {
    const { id, startTime, endTime } = item
    const time = endTime - startTime
    if (timeMap.has(id)) {
      timeMap.set(id, timeMap.get(id)! + time)
    } else {
      timeMap.set(id, time)
    }
  }

  return data.sort((a, b) => {
    const aTime = timeMap.get(a.id) ?? 0
    const bTime = timeMap.get(b.id) ?? 0
    return isUp ? aTime - bTime : bTime - aTime
  })
}

const books = ref<Book[]>([])

watchEffect(async () => {
  let originalData = [...toRaw(props.data)]

  const bookshelfId = filterStore.bookshelf
  // 过滤
  if (!props.isRecycleBin && bookshelfId) {
    originalData = originalData.filter(item => item.groupId && item.groupId === bookshelfId)
  }

  // 排序
  const isUp = get(bookSortStore).isUp
  const sortBy = get(bookSortStore).sortBy
  let data: Book[] = []

  if (props.isRecycleBin) {
    // 回收站
    // 按照更新时间排序
    data = sort(originalData, isUp, 'updateTime')
  } else {
    if (sortBy === 'addTime') {
      // 按照添加时间排序
      data = sort(originalData, isUp, 'createTime')
    } else if (sortBy === 'updateTime') {
      // 按照更新时间排序
      data = sort(originalData, isUp, 'updateTime')
    } else if (sortBy === 'readTime') {
      // 按照阅读时间排序
      data = await sortByReadTime(originalData, isUp)
    } else if (sortBy === 'readProgress') {
      // 按照阅读进度排序
      data = sort(originalData, isUp, 'progress')
    } else if (sortBy === 'bookName') {
      // 按照书名排序
      data = sort(originalData, isUp, 'name')
    } else if (sortBy === 'author') {
      // 按照作者排序
      data = sort(originalData, isUp, 'author')
    } else if (sortBy === 'score') {
      // 按照评分排序
      data = sort(originalData, isUp, 'score')
    }
  }
  set(books, data)
})

const uploadRef = ref<InstanceType<typeof FileUploadView> | null>(null);
function uploadAction() {
  uploadRef.value?.open()
}

// 右键
const { rightEvent, closeRight, rightInfo, selectData } = useRightClick<Book>()

const dialogAction = (cb: Function) => {
  if (!selectData.value) return
  cb(selectData.value)
  closeRight()
}

// 编辑
const onEdite = () => dialogAction(editDialog)

// 详情
const onDetail = () => dialogAction(detailDialog)

// 评分
const onScore = () => dialogAction(scroreDialog)

// 删除
function onRemove(isForce: boolean) {
  const id = selectData.value?.id
  if (!id) return
  removeDialog(selectData.value!, props.isRecycleBin, isForce)
  closeRight()
}

// 恢复
function restoreOneBook() {
  const id = selectData.value?.id
  if (!id) return
  BookAction.restoreOne(id)
  closeRight()
}

// 最爱
function onLove() {
  const data = selectData.value
  if (data) {
    const isLove = !data.isLove
    BookAction.update(data.id, { isLove })
    isLove ? toastSuccess(t('common.addSuccess')) : toastSuccess(t('common.removeSuccess'))
    closeRight()
  }
}

// 书架
const onBookshelf = () => dialogAction(bookshelfDialog)

const onClick = (val: Book) => emit('click', val)

</script>

<template>
  <div id="book-list-dialog" class="p-6 flex h-full overflow-auto hover:scrollbar-thin scrollbar-none scrollbar-thin"
    v-if="data.length">
    <BookShelfMode :data="books" @right="rightEvent" @click="onClick" v-if="bookMode(BookshelftMode.bookshelf)" />
    <CardMode :data="books" @right="rightEvent" @click="onClick" v-else-if="bookMode(BookshelftMode.card)" />
    <ListMode :data="books" @right="rightEvent" @click="onClick" v-else />
    <!-- 右键 -->
    <ul class="fixed menu bg-base-100 border border-accent rounded-md shadow-2xl gap-1 min-w-40 z-[99]"
      v-on-click-outside="closeRight" v-if="rightInfo.show" :style="{ top: rightInfo.top, left: rightInfo.left }">
      <template v-if="isRecycleBin">
        <li @click="restoreOneBook()">
          <a>
            <UndoDot class="h-5 w-5" />{{ t('common.restore') }}
          </a>
        </li>
        <li @click="onRemove(true)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />{{ t('common.forceRemove') }}
          </a>
        </li>
      </template>
      <template v-else>
        <li @click="onLove()">
          <a v-if="selectData?.isLove">
            <HeartOff class="h-5 w-5" />{{ t('common.removeLove') }}
          </a>
          <a v-else>
            <Heart class="h-5 w-5" />{{ t('common.addLove') }}
          </a>
        </li>
        <li @click="onBookshelf()">
          <a>
            <SquareLibrary class="h-5 w-5" />{{ t('common.addBookshelf') }}
          </a>
        </li>
        <li @click="onRemove(false)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />{{ t('common.remove') }}
          </a>
        </li>
        <li @click="onEdite()">
          <a>
            <PencilLine class="h-5 w-5" />{{ t('common.edit') }}
          </a>
        </li>
        <li @click="onScore()">
          <a>
            <Star class="h-5 w-5" />{{ t('common.score') }}
          </a>
        </li>
        <li @click="onDetail()">
          <a>
            <BellElectric class="h-5 w-5" />{{ t('common.detail') }}
          </a>
        </li>
      </template>
    </ul>
  </div>
  <div class="hero min-h-screen bg-base-200" v-else>
    <div class="hero-content text-center">
      <div class="max-w-md" v-if="isRecycleBin">
        <h1 class="text-5xl font-bold">{{ t('common.empty') }}</h1>
        <p class="py-6">{{ t('book.recycleNoRecord') }}</p>
      </div>
      <div class="max-w-md" v-else>
        <h1 class="text-5xl font-bold">{{ t('book.empty') }}</h1>
        <p class="py-6">{{ t('book.uploadBookTip') }}</p>
        <button class="btn btn-accent" @click="uploadAction()">
          <Plus />{{ t('file.upload') }}
        </button>
        <FileUploadView ref="uploadRef" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookshelf {
  transform: perspective(2000px) rotateY(0deg) translateX(0px) scaleX(1);
  transform-style: preserve-3d;
  box-shadow: 6px 6px 12px -1px rgba(0, 0, 0, 0.1), 20px 14px 16px -6px rgba(0, 0, 0, 0.1);
}

.bookshelf:hover {
  transform: perspective(2000px) rotateY(-15deg) translateX(-10px) scaleX(0.94);
}

.shelf-shadows {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  border-radius: 2px;
  z-index: 1;
}

.shelf {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  border-radius: 2px;
  z-index: 3;
  box-shadow:
    0px -5px 3px 0px rgba(0, 0, 0, 0.2),
    0px 15px 20px 0px rgba(0, 0, 0, 0.6),
    0px 15px 20px 0px rgba(0, 0, 0, 0.6),
    0px 15px 20px 0px rgba(0, 0, 0, 0.6),
    0px 5px 5px 0px rgba(0, 0, 0, 0.3),
    0px 5px 5px 0px rgba(0, 0, 0, 0.3),
    0px 5px 5px 0px rgba(0, 0, 0, 0.3);
}
</style>