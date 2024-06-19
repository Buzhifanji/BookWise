<script setup lang="ts">
import { settingStore } from '@renderer/store';
import { get, onKeyStroke, useElementSize, useResizeObserver, useThrottleFn } from '@vueuse/core';
import 'pdfjs-dist/web/pdf_viewer.css';
import { onUnmounted, ref, watchEffect } from 'vue';
import { PDF, setSpreadMode } from './pdf';

const PDFContainerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

useResizeObserver(PDFContainerRef, () => PDF.resize())

watchEffect(async () => {
  setSpreadMode(settingStore.value.readMode)
})

onUnmounted(() => PDF.destroy())

const prewView = useThrottleFn(() => {
  const dom = PDFContainerRef.value
  if (!dom) return
  const { height } = dom.getBoundingClientRect()

  let val = dom.scrollTop - height
  if (val < 0) val = 0

  PDFContainerRef.value!.scrollTo({ top: val, behavior: 'smooth' })
}, 300)

const { height: totalHeight } = useElementSize(contentRef)

const nextView = useThrottleFn(() => {
  const dom = PDFContainerRef.value
  if (!dom) return
  const { height } = dom.getBoundingClientRect()

  let val = dom.scrollTop + height
  if (val > get(totalHeight)) val = get(totalHeight)

  PDFContainerRef.value!.scrollTo({ top: val, behavior: 'smooth' })
}, 300)

onKeyStroke(['ArrowRight'], nextView)
onKeyStroke(['ArrowLeft'], prewView)

</script>

<template>
  <div id="viewerContainer" ref="PDFContainerRef"
    class="h-full w-full bg-base-200  absolute overflow-auto scroll-smooth scrollbar-thin">
    <div ref="contentRef" id="viewer" class="pdfViewer scrollWrapped">
    </div>
  </div>
</template>