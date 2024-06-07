<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookshelftMode } from '@renderer/enum';
import { useDialog, useRightClick } from '@renderer/hooks';
import { chuankArray, remToPx } from '@renderer/shared';
import { settingStore, useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import { BellElectric, PencilLine, Trash2, UndoDot } from 'lucide-vue-next';
import { computed, defineProps, onMounted, ref, toRaw, withDefaults } from 'vue';
import BookCardView from './BookCard.vue';
import { BookAction } from './book-action';

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


const WIDTH = 120
const HEIGHT = 137
const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)

const parentOffsetRef = ref(0)

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})

const list = computed(() => {
  const count = parseInt(((store.width) / (WIDTH + remToPx(2.5))).toString())
  return chuankArray(toRaw(props.data) || [], count)
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

  rowVirtualizer.value.measureElement(el)

  return undefined
}

// 右键
const { rightEvent, closeRight, rightInfo, selectData } = useRightClick<Book>()

// 消息确认弹出
const { dialogRef, openDialog, closeDialog } = useDialog();

let _isForce = false;

function removeBefore(isForce: boolean) {
  const id = selectData.value?.id
  if (!id) return
  _isForce = isForce;
  openDialog()
  closeRight()
}

function removeOneBook() {
  const id = selectData.value?.id
  if (!id) return

  if (!_isForce) {
    _isForce = settingStore.value.isOpenRecyleBin
  }

  BookAction.removeOne(id, _isForce)

  closeDialog()
}


function restoreOneBook() {
  const id = selectData.value?.id
  if (!id) return

  BookAction.restoreOne(id)

  closeRight()
}


</script>

<template>
  <div ref="parentRef" class="p-6 flex h-full overflow-auto">
    <div class="relative w-full" :style="{
      height: `${totalSize}px`,
    }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="absolute top-0 left-0  w-full pb-8" :style="{
      transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin
        }px)`,
    }">
          <div class="relative w-full" v-if="settingStore.bookself === BookshelftMode.bookshelf">
            <div class="flex w-full justify-start pb-[1.125rem] px-5 gap-10 class ">
              <template v-for="item in list[virtualRow.index]">
                <BookCardView class="bookshelf" :book="item" :width="WIDTH" @click="emit('click', item)"
                  @contextmenu="rightEvent($event, item)" />
              </template>
            </div>
            <div class="shelf-shadows shadow-2xl"></div>
            <div class="shelf bg-base-100"></div>
          </div>
          <div v-else-if="settingStore.bookself === BookshelftMode.card" class="flex w-full justify-start  gap-10">
            <template v-for="item in list[virtualRow.index]">
              <BookCardView class="shadow  duration-150  hover:scale-105  " :book="item" :width="WIDTH"
                @click="emit('click', item)" @contextmenu="rightEvent($event, item)" />
            </template>
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
        <li @click="removeBefore(true)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />永久删除
          </a>
        </li>
      </template>
      <template v-else>
        <li @click="removeBefore(false)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />删除
          </a>
        </li>
        <li>
          <a>
            <PencilLine class="h-5 w-5" />编辑
          </a>
        </li>
        <li>
          <a>
            <BellElectric class="h-5 w-5" />详情
          </a>
        </li>
      </template>
    </ul>

    <!-- 确认消息 -->
    <dialog class="modal" ref="dialogRef">
      <div class="modal-box" v-on-click-outside="closeDialog">
        <h3 class="font-bold text-lg">删除书籍</h3>
        <p class="py-4">{{ selectData?.name }}</p>
        <p v-if="settingStore.isOpenRecyleBin && !isRecycleBin" class="text-warning">将本书移入回收站</p>
        <p v-else class="text-warning">将本书永久删除</p>
        <div class="modal-action">
          <button class="btn btn-outline" @click="closeDialog">取消</button>
          <button class="btn btn-outline  btn-error ml-4" @click="removeOneBook">确认</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
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