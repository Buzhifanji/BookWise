<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { blobStore } from './render';

interface Props {
  data: any,
}

withDefaults(defineProps<Props>(), {
  data: '',
})

const contianer = ref<HTMLElement | null>(null)

function mountBlobToImg() {
  const imgs = contianer.value?.querySelectorAll<HTMLImageElement>('img[src]') || []
  for (const img of imgs) {
    const href = img.getAttribute('src')
    if (href && blobStore.has(href)) {
      const blob = blobStore.get(href)
      if (blob) {
        img.setAttribute('src', URL.createObjectURL(blob))
      }
    }
  }
}

onMounted(() => mountBlobToImg())


</script>

<template>
  <div ref="contianer" v-html="data"></div>
</template>