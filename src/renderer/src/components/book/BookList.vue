<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useDialog, useRightClick } from '@renderer/hooks';
import { chuankArray, convertUint8ArrayToURL, remToPx } from '@renderer/shared';
import { settingStore, useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import { BellElectric, PencilLine, Trash2, UndoDot } from 'lucide-vue-next';
import { computed, defineProps, onMounted, ref, toRaw, withDefaults } from 'vue';
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


const WIDTH = 6.5
const HEIGHT = 12
const PADDING = 20
const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)

const parentOffsetRef = ref(0)

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})

const list = computed(() => {
  const count = parseInt((store.width / (remToPx(WIDTH) + PADDING)).toString())
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
        <div :ref="measureElement" :data-index="virtualRow.index"
          class="absolute top-0 left-0 flex pb-6  justify-start w-full gap-10" :style="{
      transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin
        }px)`,
    }">
          <div v-for="item in list[virtualRow.index]"
            class="card bg-base-100 transition duration-150 ease-in-out hover:scale-105  rounded shadow cursor-pointer gap-2"
            @click="emit('click', item)" :style="{ width: `${WIDTH}rem`, height: `${HEIGHT}rem` }" ref=""
            @contextmenu="rightEvent($event, item)">
            <img :src="convertUint8ArrayToURL(item.cover)" alt="书籍封面">
            <div class="line-clamp-2 mx-1 mb-1 text-sm">{{ item.name }}</div>
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