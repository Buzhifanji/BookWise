<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookAction, BookContentAction } from '@renderer/components';
import { arrayBufferToFile, isElectron } from '@renderer/shared';
import { set } from '@vueuse/core';
import { ref, } from 'vue';
import { render } from '../reader/render';
import ListenBookContent from './ListenBookContent.vue';

const props = defineProps({
  id: String,
})

const bookInfo = ref<Book>()
const section = ref<any[]>([]) // 章节内容
const tocList = ref<any[]>([]) // 目录

// 获取书本内容
async function getBookContent(bookId: string, url: string) {
  try {
    if (isElectron) {
      const content = await window.api.readFile(url)
      return { content, bookId }
    } else {
      // 网页从数据库中获取
      return BookContentAction.findOne(bookId)
    }
  } catch (err) {
    return null
  }
}

async function loadData() {
  try {
    const bookId = props.id
    if (!bookId) return
    const info = await BookAction.fineOne(bookId)
    if (!info) return
    const content = await getBookContent(bookId, info.path)
    if (!content) return
    const file = arrayBufferToFile(content.content, info.name || '');
    const { sections, toc } = await render(file)
    set(section, sections)
    set(tocList, toc)
    set(bookInfo, info)
  } catch (err) {
    console.log(err)
  } finally {
  }
}

loadData()
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen p-10 bg-base-200">
    <div v-if="bookInfo"
      class="w-full max-w-screen-2xl h-full flex flex-col bg-base-100 rounded-lg py-4  overflow-hidden">
      <h3 class="text-center text-2xl font-bold mb-4 line-clamp-1 px-3">{{ bookInfo.name }} </h3>
      <ListenBookContent ref="readerListenBookViewRef" :toc="tocList" :section="section" :book-id="bookInfo.id" />
    </div>
  </div>
</template>