<script setup lang="ts">
import { convertUint8ArrayToURL, wait } from '@renderer/shared';
import { onMounted, ref } from 'vue';
import loadingBookCover from '../../assets/bookmark.png';

import { t } from '@renderer/view/setting';
import { get } from '@vueuse/core';

defineProps<{
  data: Uint8Array
}>()

const contianerRef = ref<HTMLImageElement | null>(null)

onMounted(async () => {
  const imgDom = get(contianerRef)
  if (imgDom) {
    await wait(100)
    imgDom.onload = () => {
      imgDom.src = imgDom.dataset.src!;
    }
    if (imgDom.complete) {
      imgDom.src = imgDom.dataset.src!;
    }
  }
})
</script>

<template>
  <img :src="loadingBookCover" :data-src="convertUint8ArrayToURL(data)" ref="contianerRef"
    class="w-full rounded h-full object-cover" :alt="t('book.cover')" loading="lazy">
</template>