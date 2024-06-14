<script setup lang="ts">
import { DomSource } from '@book-wise/web-highlight';

withDefaults(defineProps<{ data: DomSource[], opacity?: number }>(), {
  data: () => [],
  opacity: 0.5
})
</script>

<template>
  <div class="bg-base-200 p-3 rounded-md hover:bg-info hover:text-info-content" :style="{ '--tw-bg-opacity': opacity }">
    <div class="flex flex-row gap-4">
      <div class="flex">
        <div class="divider divider-primary h-full w-[3px] flex-col m-0 py-1"></div>
      </div>
      <blockquote>
        <p v-for="item in data">
          {{ item.text }}
        </p>
      </blockquote>
    </div>
  </div>
</template>