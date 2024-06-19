<script setup lang="ts">
import { NoteAction } from '@renderer/components';
import { useElementPageStore } from '@renderer/store';
import { get, useIntersectionObserver } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { onMounted, ref } from 'vue';
import { highlighter } from '../highlight';
import { getImgBlob } from '../render';

interface Props {
  data: any,
  index: number
}

const props = withDefaults(defineProps<Props>(), {
  data: '',
  index: 0,
})

const emit = defineEmits(['linkClick'])
const contianer = ref<HTMLElement | null>(null)

const bookParam = useRouteParams<string>('id')
const elementPageStore = useElementPageStore()

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


async function drawHighlight() {
  const notes = await NoteAction.findBookPageNotes(get(bookParam), props.index.toString())
  const domSource = notes.map(note => NoteAction.noteToDomSource(note))
  highlighter?.fromSource(domSource)
}

onMounted(() => {
  mountBlobToImg()
  handleLink()
  drawHighlight()
})

useIntersectionObserver(contianer, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    elementPageStore.setElementPage(props.index)
    console.log(props.index, '进入')
  } else {
    // console.log(props.index, '离开')
  }
})
</script>

<template>
  <div ref="contianer" v-html="data"></div>
</template>