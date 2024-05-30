<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { chuankArray } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { computed, onMounted, ref, toRaw } from 'vue';

const props = defineProps<{
  data: Book[]
}>()

const emit = defineEmits<{
  (e: 'click', payload: Book): void;
}>();


const WIDTH = 200
const HEIGHT = 300
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
          <div v-for="item in list[virtualRow.index]" class="card bg-base-100" @click="emit('click', item)"
            :style="{ width: `${WIDTH}px`, height: `${HEIGHT}px` }">
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>