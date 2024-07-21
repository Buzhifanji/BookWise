<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { chuankArray, remToPx } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { useParentElement } from '@vueuse/core';
import { computed, defineProps, onMounted, Ref, ref, withDefaults } from 'vue';
import ImgView from '../../img/Img.vue';

interface Props {
  data: Book[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})
const emit = defineEmits<{
  (e: 'click', payload: Book): void;
  (e: 'right', payload: any, book: Book): void;
}>();

const textOpacity = { '--tw-text-opacity': 0.6 };
const bookCardWidth = 282

const containerRef = ref<HTMLElement | null>(null)
const parentRef = useParentElement(containerRef) as Ref<HTMLElement>
const parentOffsetRef = ref(0)
const store = useContentCantianerStore()

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})

const books = computed(() => {
  const width = bookCardWidth
  const count = parseInt(((store.width) / (width + remToPx(2.5))).toString())
  return chuankArray(props.data, count)
})

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: books.value.length,
    estimateSize: () => 350,
    overscan: 5,
    getScrollElement: () => parentRef.value,
  }
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const measureElement = (el: HTMLElement) => {
  if (!el) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(el)
  })
  return undefined
}

</script>

<template>
  <div class="relative w-full" ref="containerRef" :style="{
    height: `${totalSize}px`,
  }">
    <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :ref="measureElement" :data-index="virtualRow.index"
      class="absolute top-0 left-0  w-full pb-5" :style="{
        transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin
          }px)`,
      }">
      <div class="flex w-full justify-start  gap-8">
        <!-- 卡片模式 -->
        <template v-for="item in books[virtualRow.index]" :key="item.id">
          <div
            class="card flex-row items-center gap-4 p-4 bg-base-100 shadow-md cursor-pointer transition ease-in-out duration-150  hover:scale-110"
            @click="emit('click', item)" @contextmenu="emit('right', $event, item)"
            :style="{ width: `${bookCardWidth}px` }">
            <figure :style="{ width: `${84}px`, height: `${121}px` }">
              <ImgView :id="item.id" />
            </figure>
            <div class="flex flex-1 flex-col gap-2">
              <p class="line-clamp-2">{{ item.name }}</p>
              <p class="line-clamp-2 label-text" :style="textOpacity"> {{ item.author }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>