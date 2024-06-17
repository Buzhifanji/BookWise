<script setup lang="ts">
import { NoteAction } from '@renderer/components';
import { pdfBus } from '@renderer/shared';
import { settingStore } from '@renderer/store';
import { get, useResizeObserver } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import 'pdfjs-dist/web/pdf_viewer.css';
import { onUnmounted, ref, watchEffect } from 'vue';
import { highlighter } from '../highlight';
import { PDF, setSpreadMode } from './pdf';

const PDFContainerRef = ref<HTMLElement | null>(null)

const bookParam = useRouteParams<string>('id')

useResizeObserver(PDFContainerRef, () => PDF.resize())

watchEffect(async () => {
  setSpreadMode(settingStore.value.readMode)
})

onUnmounted(() => PDF.destroy())

async function drawHighlight(page: string) {
  const notes = await NoteAction.findBookPageNotes(get(bookParam), page)
  const domSource = notes.map(note => NoteAction.noteToDomSource(note))
  highlighter?.fromSource(domSource)
}

pdfBus.on((pageNumber) => {
  drawHighlight(pageNumber)
});

</script>

<template>
  <div id="viewerContainer" ref="PDFContainerRef"
    class="h-full w-full bg-base-200  absolute overflow-auto scroll-smooth scrollbar-thin">
    <div id="viewer" class="pdfViewer scrollWrapped">
    </div>
  </div>
</template>