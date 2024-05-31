<script setup lang="ts">
import { Book, BookContent, db } from '@renderer/batabase';
import { Drawer, useToggleDrawer } from '@renderer/components/drawer';
import UnfoundView from '@renderer/components/error/404.vue';
import { CETALOG_DRAWER, NOTE_DRAWER, isElectron } from '@renderer/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { useWindowSize } from '@vueuse/core';
import { AlignJustify, Search } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import CatalogView from './Catalog.vue';
import NoteView from './Note.vue';
import { render } from './render';

const props = defineProps({
  id: String,
})

const book = ref<Book>()
const bookContent = ref<BookContent>()
const isLoading = ref(false)
const section = ref<any[]>([]) // 章节内容
const tocList = ref<any[]>([]) // 目录

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

const { width } = useWindowSize(); // 适配不能尺寸窗口
const isSM = computed(() => width.value < 1024);

const { isLG: isCatalog, toggleDrawer: toggleCatalog } = useToggleDrawer();
const { isLG: isNote, toggleDrawer: toggleNote } = useToggleDrawer()


// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: section.value.length,
    overscan: 5,
    getScrollElement: () => containerRef.value,
    estimateSize: () => 1024,
  }
})
const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const measureElement = (el) => {
  if (!el) {
    return
  }

  rowVirtualizer.value.measureElement(el)

  return undefined
}

async function getBookContent(bookId: string, url: string) {
  try {
    if (isElectron) {
      // 桌面从路径中获取文件
      const fs = await import('fs')
      const content = await fs.promises.readFile(url, 'binary')
      return JSON.parse(content)
    } else {
      // 网页从数据库中获取
      return await db.bookContents.where('bookId').equals(bookId).first()
    }
  } catch (err) {

  }
}

async function loadData() {
  isLoading.value = true

  const bookId = props.id
  if (!bookId) return

  const info = await db.books.get(bookId)
  if (!info) return

  const content = await getBookContent(bookId, info.path)

  if (!content) return

  const { sections, toc } = await render(content.content)
  section.value = sections
  tocList.value = toc

  book.value = info
  bookContent.value = content
}

loadData().then(() => isLoading.value = false)


</script>

<template>
  <div v-if="isLoading" class="hero min-h-screen bg-base-100">
    <span class="loading loading-ring loading-xs"></span>
    <span class="loading loading-ring loading-sm"></span>
    <span class="loading loading-ring loading-md"></span>
    <span class="loading loading-ring loading-lg"></span>
  </div>
  <template v-else>
    <template v-if="book && bookContent">
      <!-- 目录 -->
      <div class="block lg:hidden">
        <Drawer :id="CETALOG_DRAWER">
          <CatalogView :data="tocList" />
        </Drawer>
      </div>
      <div class="hidden lg:block">
        <CatalogView :class="{ 'hide': isCatalog }" :data="tocList" />
      </div>
      <div class="w-full max-w-full h-screen ">
        <div class="flex h-full flex-col ">
          <!-- 头部 -->
          <div role="navigation" aria-label="Navbar" class="navbar z-10 border-b border-base-200 px-3">
            <div class="gap-3 navbar-start">
              <!-- 控制侧边栏菜单栏 -->
              <label :for="CETALOG_DRAWER" class="cursor-pointer " v-if="isSM">
                <AlignJustify class="w-5 h-5" />
              </label>
              <button aria-label="Leftmenu toggle" @click="toggleCatalog" class="btn btn-sm btn-square btn-ghost"
                v-else>
                <AlignJustify class="w-5 h-5" />
              </button>
              <!-- 打开搜索框按钮 -->
              <button aria-label="Search button"
                class="btn hidden h-9 w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline">
                <Search class="w-4 h-4" />
              </button>
            </div>
            <div class="navbar-center"></div>
            <div class="navbar-end gap-4">
              <label :for="NOTE_DRAWER" class="cursor-pointer " v-if="isSM">
                <AlignJustify class="w-5 h-5" />
              </label>
              <button aria-label="Leftmenu toggle" @click="toggleNote" class="btn btn-sm btn-square btn-ghost" v-else>
                <AlignJustify class="w-5 h-5" />
              </button>
            </div>
          </div>
          <!-- 书籍内容 -->
          <div class="flex-1 bg-base-100 h-full  overflow-auto" ref="containerRef">
            <div class="relative w-full" :style="{ height: `${totalSize}px` }">
              <div class="absolute top-0 left-0 w-full "
                :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }">
                <div v-for="virtualRow in virtualRows" :key="virtualRow.key" :data-index="virtualRow.index"
                  :ref="measureElement" class="prose mx-auto my-0">
                  <div v-html="section[virtualRow.index].doc"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 笔记 -->
      <div class="block lg:hidden">
        <Drawer :id="NOTE_DRAWER" :is-right="true">
          <NoteView />
        </Drawer>
      </div>
      <div class="hidden lg:block">
        <NoteView :class="{ 'hide': isNote }" />
      </div>
    </template>
    <UnfoundView v-else />
  </template>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
}
</style>