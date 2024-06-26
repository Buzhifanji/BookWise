<script setup lang="ts">
import { settingStore, useBookPageStore } from '@renderer/store';
import { get, onKeyStroke, useDebounceFn, useElementSize, useResizeObserver, useThrottleFn } from '@vueuse/core';
import 'pdfjs-dist/web/pdf_viewer.css';
import { onUnmounted, ref, watchEffect } from 'vue';
import { toNextView, toPrewView } from '../util';
import { PDF, setSpreadMode } from './pdf';

interface Props {
  isScrollLocked: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  isScrollLocked: false,
})

const PDFContainerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const bookPageStore = useBookPageStore()

useResizeObserver(PDFContainerRef, () => PDF.resize())

watchEffect(async () => {
  setSpreadMode(settingStore.value.readMode)
})

onUnmounted(() => PDF.destroy())

const getScrollData = () => {
  const dom = PDFContainerRef.value!
  const { height } = dom.getBoundingClientRect()
  return { dom, height, scrollTop: dom.scrollTop }
}

const prewView = useThrottleFn(() => {
  if (props.isScrollLocked) return
  if (!get(PDFContainerRef)) return
  const { dom, height, scrollTop } = getScrollData()
  toPrewView(dom, scrollTop, height)
}, 300)

const { height: totalHeight } = useElementSize(contentRef)

const nextView = useThrottleFn(() => {
  if (props.isScrollLocked) return
  if (!get(PDFContainerRef)) return
  const { dom, height, scrollTop } = getScrollData()
  toNextView(dom, scrollTop, height, get(totalHeight))
}, 300)

onKeyStroke(['ArrowRight'], nextView)
onKeyStroke(['ArrowLeft'], prewView)

const scroll = useDebounceFn(() => {
  const page = PDF.getCurrentPageNumber()
  bookPageStore.setPage(page)
}, 200)
</script>

<template>
  <div id="viewerContainer" ref="PDFContainerRef"
    class="h-full w-full bg-base-200  absolute overflow-auto scroll-smooth scrollbar-thin" @scroll="scroll">
    <div ref="contentRef" id="viewer" class="pdfViewer scrollWrapped">
    </div>
  </div>
</template>