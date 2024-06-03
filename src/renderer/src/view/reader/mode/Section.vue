<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getImgBlob } from '../render';

interface Props {
  data: any,
}

withDefaults(defineProps<Props>(), {
  data: '',
})

const emit = defineEmits(['linkClick'])
const contianer = ref<HTMLElement | null>(null)

// 图片绑定blob
function mountBlobToImg() {
  const imgs = contianer.value?.querySelectorAll<HTMLImageElement>('img[src]') || []
  for (const img of imgs) {
    const blob = getImgBlob(img.getAttribute('src') || '')
    if (blob) {
      img.setAttribute('src', URL.createObjectURL(blob))
    }
  }
}

// 链接绑定点击事件
function handleLink() {
  const links = contianer.value?.querySelectorAll<HTMLImageElement>('a[href]') || []
  for (const link of links) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href_ = link.getAttribute('href');
      emit('linkClick', href_)
    });
  }
}

onMounted(() => {
  mountBlobToImg()
  handleLink()
})


</script>

<template>
  <div ref="contianer" v-html="data"></div>
</template>