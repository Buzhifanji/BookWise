<script setup lang="ts">
import { NoteText } from '@renderer/components';
import dayjs from 'dayjs';

withDefaults(defineProps<{ data: NoteText[], opacity?: number }>(), {
  data: () => [],
  opacity: 0.5
})

const emit = defineEmits<{
  (e: 'remove', data: NoteText, index: number): void
}>()


</script>

<template>
  <div v-for="item, index in data" class="bg-base-200 p-3 rounded-md hover:bg-info hover:text-info-content"
    :style="{ '--tw-bg-opacity': opacity }">
    <div class="flex flex-row justify-between items-center mb-1">
      <div class="stat-desc">{{ dayjs(item.time).format('L LT') }}</div>
      <div>
        <button class="btn btn-outline btn-error btn-xs" @click="emit('remove', item, index)">删除</button>
      </div>
    </div>
    <p>{{ item.value }}</p>
  </div>
</template>