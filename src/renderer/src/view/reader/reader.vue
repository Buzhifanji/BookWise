<script setup lang="ts">
import { Book, BookContent, Note, db } from '@renderer/batabase';
import { DrawerView, ErrorView, NoteAction, RingLoadingView, useToggleDrawer } from '@renderer/components';
import { ReadMode } from '@renderer/enum';
import { CETALOG_DRAWER, NOTE_DRAWER, isElectron } from '@renderer/shared';
import { settingStore } from '@renderer/store';
import { get, set, useToggle, useWindowSize } from '@vueuse/core';
import { AlignJustify } from 'lucide-vue-next';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
// import '../../assets/css/pdf.css';
import { ChevronFirst, ChevronLast, SkipBack } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import CatalogView from './Catalog.vue';
import NoteView from './NoteContainer.vue';
import { CONTINAER_ID, highlighter, initHighlight } from './highlight';
import DoubleReaderView from './mode/DoubleReader.vue';
import ScrollReaderView from './mode/ScrollReader.vue';
import SectionReaderView from './mode/SectionReader.vue';
import PDFReadView from './pdf/ReadView.vue';
import PDFToolbarView from './pdf/Toobar.vue';
import { PDF } from './pdf/pdf';
import { DPFUtil, getBookHref, render, unMountedBookRender } from './render';
import NoteRichView from './toolbar/NoteRich.vue';
import ToolbarView from './toolbar/Toolbar.vue';
import { NoteBarStyle, ToolbarStyle } from './toolbar/action';

const props = defineProps({
  id: String,
})

const router = useRouter()

const book = ref<Book>() // 书籍信息
const bookContent = ref<BookContent>() // 书籍内容

const [isLoading, setLoading] = useToggle(false)
const section = ref<any[]>([]) // 章节内容
const tocList = ref<any[]>([]) // 目录


const { width } = useWindowSize(); // 适配不能尺寸窗口
const isSM = computed(() => width.value < 1024);

const { isLG: isCatalog, toggleDrawer: toggleCatalog } = useToggleDrawer(); // 控制目录是否显示
const { isLG: isNote, toggleDrawer: toggleNote } = useToggleDrawer() // 控制笔记是否显示


const scrollReaderViewRef = ref<InstanceType<typeof ScrollReaderView>>() // 滚动视图
const sectionReaderViewRef = ref<InstanceType<typeof SectionReaderView>>() // 章节视图
const doubleReaderViewRef = ref<InstanceType<typeof DoubleReaderView>>() // 双栏视图

const isPDF = DPFUtil.isPDF

const isNoteRichShow = NoteBarStyle.show
const isShowToolBar = ToolbarStyle.show

// 获取书本内容
async function getBookContent(bookId: string, url: string) {
  try {
    if (isElectron) {
      const content = await window.api.readFile(url)
      return { content, bookId }
    } else {
      // 网页从数据库中获取
      return await db.bookContents.where('bookId').equals(bookId).first()
    }
  } catch (err) {
    return null
  }
}

async function loadData() {
  try {


    setLoading(true)
    debugger
    const bookId = props.id
    if (!bookId) return

    // 获取书本信息
    const info = await db.books.get(bookId)
    if (!info) return

    // 获取书本内容
    const content = await getBookContent(bookId, info.path)
    if (!content) return

    // 获取书本渲染器
    const { sections, toc } = await render(new File([content.content], info.name))

    section.value = sections
    tocList.value = toc
    book.value = info
    bookContent.value = content
    console.log(info)
    console.log(content)
    setLoading(false)

    await nextTick()

    if (get(isPDF)) {
      await PDF.render(content.content, props.id)
      const outline = await PDF.getOutline()
      set(tocList, outline)
    }

    initHighlight(info);
    // 笔记跳转
    const note = localStorage.getItem('__note__')
    if (note) {
      noteJump(JSON.parse(note))
      localStorage.removeItem('__note__')
    }
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}


// 目录跳转
async function jumpAction(index: number, id?: string) {
  if (get(isPDF)) {
    await PDF.pageJump(index, id)
  } else {
    if (settingStore.value.readMode === ReadMode.sroll) {
      scrollReaderViewRef.value?.jump(index, id)
    } else if (settingStore.value.readMode === ReadMode.section) {
      sectionReaderViewRef.value?.jump(index, id)
    } else {
      doubleReaderViewRef.value?.jump(index, id)
    }
  }
}
async function catalogJump({ href }: any) {
  if (get(isPDF)) {
    const { index } = await PDF.resolveHref(href)
    await jumpAction(index + 1)
  } else {
    let index = 0;
    if (href) {
      const value = getBookHref(href)
      if (value) {
        index = value.index
      }
    }

    jumpAction(index)
  }
}

async function noteJump(note: Note) {
  const source = NoteAction.getDomSource(note.domSource)
  if (source.length === 0) return

  const { page, id } = source[0]
  if (page === '-1') return

  jumpAction(+page, id)
}

// 返回
const showBack = ref(router.options.routes.length > 1 && !settingStore.value.isOpenNew)
function goBack() {
  router.go(-1)
}

onMounted(() => {
  loadData()
})

onUnmounted(() => {
  unMountedBookRender()
  highlighter?.dispose()
})

</script>

<template>
  <RingLoadingView class="min-h-screen" v-if="isLoading" />
  <template v-else>
    <template v-if="book && bookContent">
      <!-- 目录 -->
      <div class="block lg:hidden">
        <DrawerView :id="CETALOG_DRAWER">
          <CatalogView :data="tocList" @click="catalogJump" />
        </DrawerView>
      </div>
      <div class="hidden lg:block ">
        <CatalogView :class="{ 'hide': isCatalog }" :data="tocList" @click="catalogJump" />
      </div>
      <div class="w-full max-w-full h-screen ">
        <div class="flex h-full flex-col ">
          <!-- 头部 -->
          <div role="navigation" id="book-view_nav_bar" aria-label="Navbar"
            class="navbar justify-between border-b border-base-200 px-3 py-0 min-h-12 ">
            <div class="gap-3 flex">
              <!-- 控制侧边栏菜单栏 -->
              <label :for="CETALOG_DRAWER" class="cursor-pointer " v-if="isSM">
                <AlignJustify class="w-5 h-5" />
              </label>
              <button aria-label="Leftmenu toggle" @click="toggleCatalog" class="btn btn-sm btn-square btn-ghost"
                v-else>
                <AlignJustify class="w-5 h-5" />
              </button>
              <!-- 返回 （单页面需要） -->
              <div v-if="showBack" class="tooltip tooltip-bottom" data-tip="返回到图书列表">
                <button class="btn btn-sm btn-square btn-ghost" @click="goBack()">
                  <SkipBack />
                </button>
              </div>

              <!-- 翻页 -->
              <div class="join">
                <button class="btn btn-sm  rounded-l-full join-item" @click="">
                  <ChevronFirst />
                </button>
                <input type="number" class="input input-sm w-20 input-bordered join-item" placeholder="number" />
                <button class="btn btn-sm join-item rounded-r-full" @click="">
                  <ChevronLast />
                </button>
              </div>
              <!-- 打开搜索框按钮 -->
              <!-- <button aria-label="Search button"
                class="btn hidden h-9 w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline">
                <Search class="w-4 h-4" />
              </button> -->
            </div>
            <div>
              <!-- 文章标题 -->
              <!-- <div class="tooltip tooltip-bottom" :data-tip="book.name">
                <p class="text-lg font-bold line-clamp-1">{{ book.name }}</p>
              </div> -->
            </div>
            <div class="flex gap-4">
              <!-- pdf控制缩放 -->
              <PDFToolbarView v-if="isPDF" />
              <label :for="NOTE_DRAWER" class="cursor-pointer " v-if="isSM">
                <AlignJustify class="w-5 h-5" />
              </label>
              <button aria-label="Leftmenu toggle" @click="toggleNote" class="btn btn-sm btn-square btn-ghost" v-else>
                <AlignJustify class="w-5 h-5" />
              </button>
            </div>
          </div>
          <!-- 书籍内容 -->
          <div class="flex-1 overflow-hidden relative selection:bg-info selection:text-base-content" :id="CONTINAER_ID">
            <PDFReadView v-if="isPDF" />
            <template v-else>
              <!-- 滚动条模式 -->
              <ScrollReaderView :section="section" ref="scrollReaderViewRef"
                v-if="settingStore.readMode === ReadMode.sroll" />
              <!-- 章节模式 -->
              <SectionReaderView :section="section" ref="sectionReaderViewRef"
                v-if="settingStore.readMode === ReadMode.section" />
              <!-- 双栏模式 -->
              <DoubleReaderView :section="section" ref="doubleReaderViewRef"
                v-if="settingStore.readMode === ReadMode.double" />
            </template>

            <!-- 工具栏 -->
            <ToolbarView v-if="isShowToolBar" />

            <!-- 添加笔记 -->
            <NoteRichView v-if="isNoteRichShow" />
          </div>
        </div>
      </div>
      <!-- 笔记 -->
      <div class="block lg:hidden">
        <DrawerView :id="NOTE_DRAWER" :is-right="true">
          <NoteView :book="book" @jump="noteJump" />
        </DrawerView>
      </div>
      <div class="hidden lg:block">
        <NoteView :book="book" @jump="noteJump" :class="{ 'hide': isNote }" />
      </div>
    </template>
    <ErrorView v-else />
  </template>
</template>