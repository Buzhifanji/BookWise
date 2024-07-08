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

const bookshelfWidht = 120
const bookshelfHeight = 137

// 鼠标选中效果

const containerRef = ref<HTMLElement | null>(null)
const parentRef = useParentElement(containerRef) as Ref<HTMLElement>
const parentOffsetRef = ref(0)
const store = useContentCantianerStore()

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})

const books = computed(() => {
  const width = bookshelfWidht
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
      class="absolute top-0 left-0  w-full pb-10" :style="{
        transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin
          }px)`,
      }">
      <div class="relative w-full" key="bookshelf">
        <!-- 书架模式 -->
        <div class="flex w-full justify-start pb-[1.125rem] px-5 gap-10 class ">
          <template v-for="item in books[virtualRow.index]">
            <div class="card bg-base-100  rounded shadow cursor-pointer gap-2 bookshelf transition ease-in-out"
              @click="emit('click', item)"
              :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight + remToPx(3.5)}px` }"
              @contextmenu="emit('right', $event, item)">
              <figure :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight}px` }" class="rounded">
                <ImgView :data="item.cover" />
              </figure>
              <div class="line-clamp-2 mx-1 mb-1 text-sm">{{ item.name }}</div>
            </div>
          </template>
        </div>
        <div class="shelf-shadows shadow-2xl"></div>
        <div class="shelf bg-base-100"></div>
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