<script setup lang="ts">
import { NoteAction } from '@renderer/components';
import { BookRender } from '@renderer/hooks';
import { $ } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { get, set } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { nextTick, onBeforeMount, ref } from 'vue';
import { highlighter } from '../highlight';

interface Props {
  index: number
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
})

const emit = defineEmits(['linkClick'])
const contianer = ref<HTMLElement | null>(null)
const data = ref<{ height: number, html: string, id: string }>()

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


async function loadSection() {
  const res = await BookRender.getSection(props.index)
  set(data, res)
  await nextTick()
  handleLink()
  drawHighlight()
  observeDom()
  observe?.observe(get(contianer)!)
}

loadSection()

onBeforeMount(() => {
  observe?.unobserve(get(contianer)!)
})

</script>

<template>
  <div v-if="data" v-html="data.html" ref="contianer" </div>
    <div class="h-[1000px] flex justify-center items-center" v-else>
      <span class="loading loading-spinner text-warning loading-lg"></span>
    </div>
</template>