<script setup lang="ts">
import { settingStore } from '@renderer/store';
import { useResizeObserver } from '@vueuse/core';
import 'pdfjs-dist/web/pdf_viewer.css';
import { onUnmounted, ref, watchEffect } from 'vue';
import { PDF, setSpreadMode } from './pdf';

const PDFContainerRef = ref<HTMLElement | null>(null)

useResizeObserver(PDFContainerRef, () => PDF.resize())

watchEffect(async () => {
  setSpreadMode(settingStore.value.readMode)
})

onUnmounted(() => PDF.destroy())

</script>

<template>
  <div id="viewerContainer" ref="PDFContainerRef"
    class="h-full w-full bg-base-200  absolute overflow-auto scroll-smooth scrollbar-thin">
    <div id="viewer" class="pdfViewer scrollWrapped">
    </div>
  </div>
</template>