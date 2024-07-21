<script setup lang="ts">
import { convertUint8ArrayToURL } from '@renderer/shared';
import { onMounted, ref } from 'vue';
import loadingBookCover from '../../assets/bookmark.png';

import { t } from '@renderer/data';
import { set } from '@vueuse/core';
import { BookCoverAction } from '../book/action';

const props = defineProps<{
  id: string
}>()

const bookCover = ref<string>(loadingBookCover)

async function getBookCover() {
  try {
    const res = await BookCoverAction.findOne(props.id)
    if (res?.cover) {
      set(bookCover, convertUint8ArrayToURL(res.cover))

    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  getBookCover()
})
</script>

<template>
  <img :src="bookCover" class="w-full rounded-sm h-full object-cover" :alt="t('book.cover')" loading="lazy">
</template>