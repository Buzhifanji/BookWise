<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { highlighter } from '../highlight';
import { NoteAction } from '../note';
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
const route = useRoute();

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
  const id = route.params.id as string;
  const notes = (await NoteAction.findByEBookId(id)).filter(note => note.page === props.index.toString())
  const domSource = notes.map(note => NoteAction.noteToDomSource(note))
  highlighter?.fromSource(domSource)
}

onMounted(() => {
  mountBlobToImg()
  handleLink()
  drawHighlight()
})


</script>

<template>
  <div ref="contianer" v-html="data"></div>
</template>