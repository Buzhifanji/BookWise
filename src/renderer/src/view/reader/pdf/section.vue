<script setup lang="ts">
import { NoteAction, RingLoadingView } from '@renderer/components';
import { get, set, useToggle } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { nextTick, onMounted, ref } from 'vue';
import { highlighter } from '../highlight';
import { DPFUtil } from '../render';

interface Props {
  index: number
}

const props = defineProps<Props>()

const section = DPFUtil.sections[props.index]


const emit = defineEmits(['linkClick'])
const contianer = ref<HTMLElement | null>(null)



const html = ref('')
const bookParam = useRouteParams<string>('id')
const [loading, setLoading] = useToggle(true)


async function init() {
  setLoading(true)
  const { doc, blob } = await section.createDocument()
  set(html, doc)
  setLoading(false)
  await nextTick()
  mountBlobToImg(blob)
}

init()

// 图片绑定blob
function mountBlobToImg(blob: Blob) {
  const img = contianer.value?.querySelector<HTMLImageElement>('img[src]')
  if (img) {
    img.setAttribute('src', URL.createObjectURL(blob))
  }
}



async function drawHighlight() {
  const notes = await NoteAction.findBookPageNotes(get(bookParam), props.index.toString())
  const domSource = notes.map(note => NoteAction.noteToDomSource(note))
  highlighter?.fromSource(domSource)
}

onMounted(() => {

  // drawHighlight()
})


</script>

<template>
  <RingLoadingView v-if="loading" />
  <section ref="contianer" v-else v-html="html"></section>
</template>

<style scoped></style>