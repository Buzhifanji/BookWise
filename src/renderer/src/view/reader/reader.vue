<script setup lang="ts">
import { Book, BookContent, db } from '@renderer/batabase';
import { Drawer, useToggleDrawer } from '@renderer/components/drawer';
import UnfoundView from '@renderer/components/error/404.vue';
import { ReadMode } from '@renderer/enum';
import { CETALOG_DRAWER, NOTE_DRAWER, isElectron } from '@renderer/shared';
import { settingStore } from '@renderer/store';
import { useWindowSize } from '@vueuse/core';
import { AlignJustify, Search } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import '../../assets/reader.css';
import CatalogView from './Catalog.vue';
import DoubleReaderView from './DoubleReader.vue';
import NoteView from './Note.vue';
import ScrollReaderView from './ScrollReader.vue';
import SectionReaderView from './SectionReader.vue';
import { initWebHighlight } from './highlight';
import { bookCatalogJump, render } from './render';

const props = defineProps({
  id: String,
})

const book = ref<Book>() // 书籍信息
const bookContent = ref<BookContent>() // 书籍内容
const isLoading = ref(false)
const section = ref<any[]>([]) // 章节内容
const tocList = ref<any[]>([]) // 目录


const { width } = useWindowSize(); // 适配不能尺寸窗口
const isSM = computed(() => width.value < 1024);

const { isLG: isCatalog, toggleDrawer: toggleCatalog } = useToggleDrawer(); // 控制目录是否显示
const { isLG: isNote, toggleDrawer: toggleNote } = useToggleDrawer() // 控制笔记是否显示


const scrollReaderViewRef = ref<InstanceType<typeof ScrollReaderView>>() // 滚动视图
const sectionReaderViewRef = ref<InstanceType<typeof SectionReaderView>>() // 章节视图
const doubleReaderViewRef = ref<InstanceType<typeof DoubleReaderView>>() // 双栏视图


// 获取书本内容
async function getBookContent(bookId: string, url: string) {
  try {
    if (isElectron) {
      // 桌面从路径中获取文件
      const fs = await import('fs')
      const content = await fs.promises.readFile(url, 'binary')
      console.log('sssss')
      console.log(content)
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

  // 获取书本信息
  const info = await db.books.get(bookId)
  if (!info) return

  // 获取书本内容
  const content = await getBookContent(bookId, info.path)

  if (!content) return

  // 获取书本渲染器
  const { sections, toc } = await render(content.content)

  // 初始化高亮
  initWebHighlight();

  section.value = sections
  tocList.value = toc
  book.value = info
  bookContent.value = content
  console.log(info)
  console.log(content)
}

// 目录跳转
function catalogJump(e: any) {
  if (settingStore.value.readMode === ReadMode.sroll) {
    bookCatalogJump(e.href, (index: number) => scrollReaderViewRef.value?.jump(index))
  } else if (settingStore.value.readMode === ReadMode.section) {
    bookCatalogJump(e.href, (index: number) => sectionReaderViewRef.value?.jump(index))
  } else {
    bookCatalogJump(e.href, (index: number) => doubleReaderViewRef.value?.jump(index))
  }
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
          <CatalogView :data="tocList" @click="catalogJump" />
        </Drawer>
      </div>
      <div class="hidden lg:block">
        <CatalogView :class="{ 'hide': isCatalog }" :data="tocList" @click="catalogJump" />
      </div>
      <div class="w-full max-w-full h-screen ">
        <div class="flex h-full flex-col ">
          <!-- 头部 -->
          <div role="navigation" id="book-view_nav_bar" aria-label="Navbar"
            class="navbar z-10 border-b border-base-200 px-3">
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
          <ScrollReaderView :section="section" ref="scrollReaderViewRef"
            v-if="settingStore.readMode === ReadMode.sroll" />
          <SectionReaderView :section="section" ref="sectionReaderViewRef"
            v-if="settingStore.readMode === ReadMode.section" />
          <DoubleReaderView :section="section" ref="doubleReaderViewRef" v-else />
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