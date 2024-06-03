<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useRightClick } from '@renderer/hooks';
import { chuankArray, convertUint8ArrayToURL } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import { Trash2 } from 'lucide-vue-next';
import { computed, onMounted, ref, toRaw } from 'vue';
import { removeOneBook } from './book-action';

const props = defineProps<{
  data: Book[]
}>()

const emit = defineEmits<{
  (e: 'click', payload: Book): void;
}>();


const WIDTH = 128
const HEIGHT = 225
const PADDING = 20
const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)


const parentOffsetRef = ref(0)

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})

const list = computed(() => {
  const count = parseInt((store.width / (WIDTH + PADDING)).toString())
  console.log(toRaw(props.data))
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
            @click="emit('click', item)" :style="{ width: `${WIDTH}px`, height: `${HEIGHT}px` }" ref=""
            @contextmenu="rightEvent($event, item)">
            <img :src="convertUint8ArrayToURL(item.cover)" alt="书籍封面">
            <div class="line-clamp-2 mx-1 mb-1 text-sm">{{ item.name }}</div>
          </div>
        </div>

      </template>
    </div>

    <!-- 右键 -->
    <ul class="fixed menu bg-base-100 rounded-md shadow-2xl w-40 z-[99]" v-on-click-outside="closeRight"
      v-if="rightInfo.show" :style="{ top: rightInfo.top, left: rightInfo.left }">
      <li @click="removeOneBook(selectData)">
        <a class="text-error">
          <Trash2 class="h-5 w-5" />删除
        </a>
      </li>
      <li>
        <a>
          <Trash2 class="h-5 w-5" />编辑
        </a>
      </li>
      <li>
        <a>
          <Trash2 class="h-5 w-5" />详情
        </a>
      </li>
    </ul>
  </div>
</template>