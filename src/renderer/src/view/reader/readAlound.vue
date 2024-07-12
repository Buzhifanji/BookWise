<script setup lang="ts">
import { SkeletonView } from '@renderer/components';
import { t } from '@renderer/data';
import { TTSbus, useDialog } from '@renderer/hooks';
import { useBookPageStore } from '@renderer/store';
import { vOnClickOutside } from '@vueuse/components';
import { get, set, useToggle } from '@vueuse/core';
import { defineProps, ref, withDefaults } from 'vue';
import { playAudioRepeat, spliteSentence } from './tts';

interface Props {
  section: any[],
  toc: any[],
}

const props = withDefaults(defineProps<Props>(), {
  section: () => [],
  toc: () => [],
})

const bookPageStore = useBookPageStore()
const { dialogRef, openDialog, closeDialog } = useDialog();
const [loading, setLoading] = useToggle(false)


// 目录
const activePage = ref(0)
const onCatalog = (e: any) => {
  set(activePage, e.page)
  set(activeText, 0)
  loadPageText()
}


// 内容
const textList = ref<string[]>([])
const activeText = ref(0)

function extractText(htmlString: string): string {
  return htmlString
    .replace(/<small[^>]*?>(.*?)<\/font>/gi, '') // 清空备注元素标签
    .replace(/<[^>]+>/g, '')
    .replace(/________________________________/g, '')
    .trim();
}

function loadPageText() {
  const data = props.section[get(activePage)]
  if (data) {
    const res = extractText(data.html)
    set(textList, spliteSentence(res))

  }
  return ''
}

TTSbus.on((val) => {
  if (val === 'next') {

  } else {

  }
})

function open() {
  openDialog();
  set(activePage, get(bookPageStore.page))
  loadPageText()
  playAudioRepeat('zh-CN-XiaoxiaoNeural', get(textList), true)
}

defineExpose({ open })

</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-screen-2xl h-full flex flex-col" v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg ">{{ t('book.detail') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <SkeletonView v-if="loading" />
      <div class="flex-1 flex flex-row overflow-hidden" v-else>
        <div class="catalog-wrapper bg-base-100 overflow-auto hover:scrollbar-thin scrollbar-none" ref="container">
          <ExpandTreeView :data="toc" :active="activePage" @click="onCatalog" />
        </div>
        <div class="px-4 prose w-full max-w-full overflow-auto hover:scrollbar-thin scrollbar-none">
          <p v-for="item, index in textList" :class="{ 'selection-info': index === activeText }">{{ item }}</p>
        </div>
        <div></div>
      </div>
      <div class="modal-action">
        <button class="btn btn-outline " @click="closeDialog">{{ t('common.close') }}</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.catalog-wrapper {
  -----read-alound-catalog-bar-width: 16rem;
  width: var(-----read-alound-catalog-bar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100vh;
  min-width: 16rem;
  border-inline-end-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.catalog-wrapper.hide {
  margin-inline-start: calc(var(-----read-alound-catalog-bar-width)* -1);
}
</style>