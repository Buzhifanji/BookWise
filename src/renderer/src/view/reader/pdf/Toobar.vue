<script setup lang="ts">
import { t } from '@renderer/view/setting';
import { onClickOutside, set, useStorage } from '@vueuse/core';
import { Minus, Plus } from 'lucide-vue-next';
import 'pdfjs-dist/web/pdf_viewer.css';
import { computed, ref } from 'vue';
import { PDF } from './pdf';

const detailsRef = ref<HTMLDetailsElement | null>(null)
const summaryRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const state = useStorage('__book__wise_pdf_zoom', 'auto', localStorage,
  { mergeDefaults: true })

const list = computed(() => {
  return [
    { id: 'auto', value: t('pdf.auto') },
    { id: 'page-actual', value: t('pdf.pageActual') },
    { id: 'page-fit', value: t('pdf.pageFit') },
    { id: 'page-width', value: t('pdf.pageWidth') },
    { id: '50%', value: '50%' },
    { id: '75%', value: '75%' },
    { id: '100%', value: '100%' },
    { id: '125%', value: '125%' },
    { id: '150%', value: '150%' },
    { id: '200%', value: '200%' },
    { id: '300%', value: '300%' },
    { id: '400%', value: '400%' },
  ]
})

const value = computed(() => list.value.find(item => item.id === state.value)?.value ?? state.value)

const onCloce = () => {
  if (detailsRef.value && detailsRef.value.open) {
    detailsRef.value.open = false
  }
}

const onClick = (id: string) => {
  if (id === 'auto') {
    PDF.setScale('auto')
  } else if (id === 'page-actual') {
    PDF.setScale('page-actual')
  } else if (id === 'page-fit') {
    PDF.setScale('page-fit')
  } else if (id === 'page-width') {
    PDF.setScale('page-width')
  } else {
    PDF.setScale(+id.replace('%', '') / 100)
  }
  onCloce()
  set(state, id)
}

const add = () => {
  const val = PDF.zoomIn()
  set(state, (val * 100).toFixed(0) + '%')
}

const minus = () => {
  const val = PDF.zoomOut()
  set(state, (val * 100).toFixed(0) + '%')
}

onClickOutside(containerRef, onCloce)
</script>

<template>
  <div class="join" ref="containerRef">
    <button class="btn btn-sm  btn-ghost " @click="minus">
      <Minus />
    </button>
    <details class="dropdown dropdown-bottom " ref="detailsRef">
      <summary ref="summaryRef" class="cursor-pointer select select-bordered select-sm w-44 items-center  ">
        {{ value }}
      </summary>
      <ul
        class="p-2  mt-2  dropdown-content  z-[10]  w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow-2xl  gap-1 scrollbar-thin ">
        <li v-for="item in list" :key="item.value" @click="onClick(item.id)" class="text-base-content">
          <a :class="{ 'active': state === item.id }">
            {{ item.value }}
          </a>
        </li>
      </ul>
    </details>
    <button class="btn btn-sm  btn-ghost" @click="add">
      <Plus />
    </button>
  </div>
</template>