<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useBgOpacity } from '@renderer/hooks';
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

// 鼠标选中效果
const { indexBgOpacity, hoverAction } = useBgOpacity()

const containerRef = ref<HTMLElement | null>(null)
const parentRef = useParentElement(containerRef) as Ref<HTMLElement>
const parentOffsetRef = ref(0)

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})



// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: props.data.length,
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
      class="absolute top-0 left-0  w-full pb-4" :style="{
        transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin
          }px)`,
      }">
      <div>
        <!-- 列表模式 -->
        <div
          class="card flex flex-row bg-base-100 p-2 gap-4 cursor-pointer shadow hover:bg-primary hover:text-primary-content"
          :style="{ '--tw-bg-opacity': indexBgOpacity(virtualRow.index) }"
          @mouseenter="hoverAction(0.3, virtualRow.index)" @mouseleave="hoverAction(1, -1)"
          @click="emit('click', data[virtualRow.index])"
          @contextmenu="emit('right', $event, data[virtualRow.index] as Book)">
          <figure :style="{ width: `${84}px`, height: `${121}px` }">
            <ImgView :data="data[virtualRow.index].cover" />
          </figure>
          <div class="flexflex-col flex-1 py-2">
            <p class="line-clamp-1">{{ data[virtualRow.index].name }}</p>
            <p class="line-clamp-1 label-text" :style="textOpacity">{{ data[virtualRow.index].author }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>