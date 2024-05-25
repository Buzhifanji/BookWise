<script setup lang="ts">
import { reactive } from 'vue'
import { ref, computed ,onMounted} from 'vue'
import { useWindowVirtualizer, useVirtualizer } from '@tanstack/vue-virtual'
import { chuankArray } from '@renderer/shared'
import { useContentCantianerStore } from '@renderer/store'

const props = defineProps<{
  data: any[]
}>()

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
    console.log('wdith is ', store.width)
    const count = parseInt((store.width / (WIDTH + PADDING)).toString())
    console.log('count is ', count)
    return chuankArray(props.data || [], count)
})

const rowVirtualizerOptions = computed(() => {
  return {
    count: list.value.length,
    estimateSize: () => 350,
    overscan: 5,
    scrollMargin: parentOffsetRef.value,
  }
})

const rowVirtualizer = useWindowVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
</script>

<template>
  <div ref="parentRef">
    <div class="relative"
      :style="{
        height: `${totalSize}px`,
      }"
    >
    <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :data-index="virtualRow.index" class="absolute top-0 left-0 flex  justify-center w-full gap-10" :style="{transform: `translateY(${
              virtualRow.start - rowVirtualizer.options.scrollMargin
            }px)`,}">
            <div  v-for="item in list[virtualRow.index]" class="card bg-base-100" :style="{width: `${WIDTH}px`, height: `${HEIGHT}px`}">
                {{ item }}
            </div>    
        </div>
    </template>
    </div>
  </div>
</template>
