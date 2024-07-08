<script setup lang="ts">
import { NoteAction } from '@renderer/components';
import { useBookPageStore } from '@renderer/store';
import { get, useIntersectionObserver } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { onMounted, ref } from 'vue';
import { highlighter } from '../highlight';

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
const bookPageStore = useBookPageStore()

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
  handleLink()
  drawHighlight()
})


useIntersectionObserver(contianer, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    bookPageStore.setPage(props.index)
    console.log(props.index, '进入')
  } else {
    // console.log(props.index, '离开')
  }
})
</script>

<template>
  <div ref="contianer" v-html="data"></div>
</template>