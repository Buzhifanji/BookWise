<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { convertUint8ArrayToURL, remToPx } from '@renderer/shared';

defineProps<{ book: Book, width: number }>()

const emit = defineEmits(['click', 'rightEvent'])
const HEIGHT = 137
</script>

<template>
  <div class="card bg-base-100  rounded shadow cursor-pointer gap-2  transition ease-in-out"
    @click="emit('click', book)" :style="{ width: `${width}px`, height: `${HEIGHT + remToPx(3.5)}px` }"
    @contextmenu="emit('rightEvent', $event, book)">
    <div :style="{ width: `${width}px`, height: `${HEIGHT}px` }" class="rounded">
      <img :src="convertUint8ArrayToURL(book.cover)" class="w-full rounded h-full object-cover" alt="书籍封面">
    </div>
    <div class="line-clamp-2 mx-1 mb-1 text-sm">{{ book.name }}</div>
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
</style>