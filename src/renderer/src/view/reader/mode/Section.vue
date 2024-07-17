<script setup lang="ts">
import { NoteAction } from '@renderer/components';
import { BookRender } from '@renderer/hooks';
import { set } from '@vueuse/core';
import { nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import { highlighter } from '../highlight';

interface Props {
  index: number
  loaded?: (i: number) => void // dom 渲染完成
  noteLoaded?: (i: number) => void // 笔记渲染完成
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  loaded: () => { },
  noteLoaded: () => { },
})

const emit = defineEmits(['linkClick'])
const contianer = ref<HTMLElement | null>(null)
const data = ref<{ height: number, html: string, id: string }>()

const route = useRoute();
const id = route.params.id as string;

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
  const notes = await NoteAction.findBookPageNotes(id, props.index.toString())
  const domSource = notes.map(note => NoteAction.noteToDomSource(note))
  highlighter?.fromSource(domSource)
  props?.noteLoaded(props.index)
}


async function loadSection() {
  const res = await BookRender.getSection(props.index)
  set(data, res)
  await nextTick()
  props?.loaded(props.index)
  handleLink()
  drawHighlight()
}

loadSection()



</script>

<template>
  <div v-if="data" v-html="data.html" ref="contianer" </div>
    <div class="h-[1000px] flex justify-center items-center" v-else>
      <span class="loading loading-spinner text-warning loading-lg"></span>
    </div>
</template>