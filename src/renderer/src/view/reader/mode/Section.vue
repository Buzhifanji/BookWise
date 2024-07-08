<script setup lang="ts">
import { NoteAction } from '@renderer/components';
import { $ } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { get } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { onBeforeMount, onMounted, ref } from 'vue';
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

const getThreshold = (step = 0.1) => {
  const result: number[] = []
  for (let i = 0; i < 1; i += step) {
    result.push(+i.toFixed(1))
  }
  return result
}

let observe: IntersectionObserver

function observeDom() {
  const root = $('#reader-container')
  const dom = get(contianer)
  if (!dom) return
  observe = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting }) => {
      if (isIntersecting) {
        bookPageStore.setPage(props.index)
      }
    })

  }, {
    root,
    threshold: getThreshold()
  })
}


onMounted(() => {
  handleLink()
  drawHighlight()
  observeDom()
  observe?.observe(get(contianer)!)
})

onBeforeMount(() => {
  observe?.unobserve(get(contianer)!)
})

</script>

<template>
  <div ref="contianer" v-html="data.html"></div>
</template>