<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { FileUploadView } from '@renderer/components';
import { BookshelftMode } from '@renderer/enum';
import { useBgOpacity, useDialog, useRightClick } from '@renderer/hooks';
import { chuankArray, convertUint8ArrayToURL, remToPx } from '@renderer/shared';
import { settingStore, useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import dayjs from 'dayjs';
import { BellElectric, PencilLine, Plus, Trash2, UndoDot,Star } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { computed, defineProps, onMounted, ref, toRaw, withDefaults } from 'vue';
import { BookAction } from './action';
import { get } from '@vueuse/core';
import { scroreDialog } from './score';
import { editDialog } from './edit';
import { detailDialog } from './detail';
import { removeDialog } from './remove';

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


const bookshelfWidht = 120
const bookshelfHeight = 137
const bookCardWidth = 282
const textOpacity = { '--tw-text-opacity': 0.6 };

// 鼠标选中效果
const { indexBgOpacity, hoverAction } = useBgOpacity()

const bookMode = (value: BookshelftMode) => value === settingStore.value.bookself

const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)

const parentOffsetRef = ref(0)

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})

const list = computed(() => {
  const width = bookMode(BookshelftMode.bookshelf) ? bookshelfWidht : bookMode(BookshelftMode.card) ? bookCardWidth : 0
  const count = parseInt(((store.width) / (width + remToPx(2.5))).toString())
  return bookMode(BookshelftMode.list) ? toRaw(props.data) : chuankArray(toRaw(props.data) || [], count)
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

const measureElement = (el) => {
  if (!el) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(el)
  })
  return undefined
}

const uploadRef = ref<InstanceType<typeof FileUploadView> | null>(null);
function uploadAction() {
  uploadRef.value?.open()
}

// 右键
const { rightEvent, closeRight, rightInfo, selectData } = useRightClick<Book>()

const dialogAction = (cb:Function) => {
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


</script>

<template>
  <div ref="parentRef" id="book-list-dialog"  class="p-6 flex h-full overflow-auto" v-if="data.length">
    <div class="relative w-full" :style="{
      height: `${totalSize}px`,
    }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="absolute top-0 left-0  w-full "
          :class="[bookMode(BookshelftMode.list) ? 'pb-5' : 'pb-10']" :style="{
            transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin
              }px)`,
          }">
          <div class="relative w-full" v-if="bookMode(BookshelftMode.bookshelf)">
            <!-- 书架模式 -->
            <div class="flex w-full justify-start pb-[1.125rem] px-5 gap-10 class ">
              <template v-for="item in list[virtualRow.index] as Book[]">
                <div class="card bg-base-100  rounded shadow cursor-pointer gap-2 bookshelf transition ease-in-out"
                  @click="emit('click', item)"
                  :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight + remToPx(3.5)}px` }"
                  @contextmenu="rightEvent($event, item)">
                  <div :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight}px` }" class="rounded">
                    <img :src="convertUint8ArrayToURL(item.cover)" class="w-full rounded h-full object-cover"
                      alt="书籍封面">
                  </div>
                  <div class="line-clamp-2 mx-1 mb-1 text-sm">{{ item.name }}</div>
                </div>
              </template>
            </div>
            <div class="shelf-shadows shadow-2xl"></div>
            <div class="shelf bg-base-100"></div>
          </div>
          <div v-else-if="bookMode(BookshelftMode.card)" class="flex w-full justify-start  gap-10">
            <!-- 卡片模式 -->
            <template v-for="item in list[virtualRow.index] as Book[]">
              <div
                class="card flex-row items-center gap-4 p-4 bg-base-100 shadow-md cursor-pointer transition ease-in-out duration-150  hover:scale-110"
                @click="emit('click', item)" @contextmenu="rightEvent($event, item)"
                :style="{ width: `${bookCardWidth}px` }">
                <figure :style="{ width: `${84}px`, height: `${121}px` }"><img :src="convertUint8ArrayToURL(item.cover)"
                    class="w-full rounded h-full object-cover" alt="书籍封面">
                </figure>
                <div class="flex flex-1 flex-col gap-2">
                  <p class="line-clamp-2">{{ item.name }}</p>
                  <p class="line-clamp-2 label-text" :style="textOpacity"> {{ item.author }}.</p>
                </div>
              </div>
            </template>
          </div>
          <div v-else class="flex w-full flex-col ">
            <!-- 列表模式 -->
            <div
              class="card flex flex-row bg-base-100 p-2 gap-4 cursor-pointer shadow hover:bg-primary hover:text-primary-content"
              :style="{ '--tw-bg-opacity': indexBgOpacity(virtualRow.index) }"
              @mouseenter="hoverAction(0.3, virtualRow.index)" @mouseleave="hoverAction(1, -1)"
              @click="emit('click', list[virtualRow.index] as Book)"
              @contextmenu="rightEvent($event, list[virtualRow.index] as Book)">
              <figure :style="{ width: `${84}px`, height: `${121}px` }"><img
                  :src="convertUint8ArrayToURL((list[virtualRow.index] as Book).cover)"
                  class="w-full rounded h-full object-cover" alt="书籍封面">
              </figure>
              <div class="flexflex-col flex-1 py-2">
                <p class="line-clamp-1">{{ (list[virtualRow.index] as Book).name }}</p>
                <p class="line-clamp-1 label-text" :style="textOpacity">{{ (list[virtualRow.index] as Book).author }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 右键 -->
    <ul class="fixed menu bg-base-100 rounded-md shadow-2xl gap-1 w-40 z-[99]" v-on-click-outside="closeRight"
      v-if="rightInfo.show" :style="{ top: rightInfo.top, left: rightInfo.left }">
      <template v-if="isRecycleBin">
        <li @click="restoreOneBook()">
          <a>
            <UndoDot class="h-5 w-5" />恢复
          </a>
        </li>
        <li @click="onRemove(true)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />永久删除
          </a>
        </li>
      </template>
      <template v-else>
        <li @click="onRemove(false)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />删除
          </a>
        </li>
        <li @click="onEdite()">
          <a>
            <PencilLine class="h-5 w-5" />编辑
          </a>
        </li>
        <li @click="onScore()">
          <a>
            <Star class="h-5 w-5" />评分
          </a>
        </li>
        <li @click="onDetail()">
          <a>
            <BellElectric class="h-5 w-5" />详情
          </a>
        </li>
      </template>
    </ul>
  </div>
  <div class="hero min-h-screen bg-base-200" v-else>
    <div class="hero-content text-center">
      <div class="max-w-md" v-if="isRecycleBin">
        <h1 class="text-5xl font-bold">空空如也</h1>
        <p class="py-6">回收站里没有删除数据的记录！</p>
      </div>
      <div class="max-w-md" v-else>
        <h1 class="text-5xl font-bold">图书列表为空</h1>
        <p class="py-6">点击上传按钮，从本地上传一份书籍，然后开始沉浸书海吧！</p>
        <button class="btn btn-accent" @click="uploadAction()">
          <Plus />上传
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
</style>./action