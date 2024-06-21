<script setup lang="ts">
import { Book, BookContent, Note } from '@renderer/batabase';
import { BookAction, BookContentAction, DrawerView, ErrorView, NoteAction, RingLoadingView, Select, useToggleDrawer } from '@renderer/components';
import { ReadMode } from '@renderer/enum';
import { $, $$, CETALOG_DRAWER, NOTE_DRAWER, arrayBufferToFile, isElectron } from '@renderer/shared';
import { settingStore, useElementPageStore } from '@renderer/store';
import { readModeList, themes } from '@renderer/view/setting';
import { get, set, useCssVar, useToggle, useWindowSize } from '@vueuse/core';
import { AArrowDown, AArrowUp, AlignJustify, Bolt, SkipBack, ZoomIn, ZoomOut } from 'lucide-vue-next';
import { computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watchEffect } from 'vue';
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
import { Position } from './type';
import { getSectionContainer, getSectionFirstChild } from './util';

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
      return BookContentAction.findOne(bookId)
    }
  } catch (err) {
    return null
  }
}

async function loadData() {
  try {
    setLoading(true)
    const bookId = props.id
    if (!bookId) return

    // 获取书本信息
    const info = await BookAction.fineOne(bookId)
    if (!info) return

    // 获取书本内容
    const content = await getBookContent(bookId, info.path)
    if (!content) return
    const file = arrayBufferToFile(content.content, info.name || '');

    // 获取书本渲染器
    const { sections, toc } = await render(file)

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
    restorePostion()

    // 更新打开次数
    const count = (info.count || 0) + 1
    BookAction.update(info.id, { count })
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}


// 目录跳转
async function jumpAction(index: number, id?: string, position?: Position) {
  if (get(isPDF)) {
    await PDF.pageJump(index, id)
  } else {
    if (settingStore.value.readMode === ReadMode.sroll) {
      scrollReaderViewRef.value?.jump(index, id, position)
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

// 排版

// 缩放
const zoomSize = useCssVar('--prose-max-width', document.documentElement)
function zoomIn() {
  const doms = $$('.prose-width') as unknown as HTMLElement[]
  if (doms.length === 0) return
  const sectionDom = $(`#${CONTINAER_ID}`) as HTMLElement
  if (!sectionDom) return

  const { width } = doms[0].getBoundingClientRect()
  const { width: sectionWidth } = sectionDom.getBoundingClientRect()

  if (width < sectionWidth - 200) {
    const val = +get(zoomSize.value).replace('ch', '')
    console.log(val)
    set(zoomSize, `${val + 2}ch`)
  }
}
function zoomOut() {
  const val = +get(zoomSize.value).replace('ch', '')
  if (val > 8) {
    set(zoomSize, `${val - 2}ch`)
  }
}
watchEffect(() => {
  if (settingStore.value.readMode === ReadMode.double) {
    set(zoomSize, `${65 * 2}ch`)
  }
})

// 字体大小和行高
const fontSize = useCssVar('--prose-font-size', document.documentElement)
const lineHeight = useCssVar('--prose-line-height', document.documentElement)
const fontSizeList = [
  { size: '0.75rem', lineHeight: '1rem' },
  { size: '0.875rem', lineHeight: '1.25rem' },
  { size: '1rem', lineHeight: '1.5rem' },
  { size: '1.125rem', lineHeight: '1.75rem' },
  { size: '1.25rem', lineHeight: '1.75rem' },
  { size: '1.5rem', lineHeight: '2rem' },
  { size: '1.875rem', lineHeight: '2.25rem' },
  { size: '2.25rem', lineHeight: '2.5rem' },
  { size: '3rem', lineHeight: '1' },
]
const updateSize = (i: number) => {
  set(fontSize, fontSizeList[i].size)
  set(lineHeight, fontSizeList[i].lineHeight)
}
function sizeOut() {
  const index = fontSizeList.findIndex(item => item.size === get(fontSize))
  if (index === -1) {
    updateSize(2)
    return
  }

  if (index === 0) return

  updateSize(index - 1)
}

function sizeIn() {
  const index = fontSizeList.findIndex(item => item.size === get(fontSize))
  if (index === -1) {
    updateSize(2)
    return
  }

  if (index === fontSizeList.length - 1) return
  updateSize(index + 1)
}

// 阅读位置
const elementPageStore = useElementPageStore()
function recordPosition() {
  const info = get(book)
  if (!info) return

  let postion: Position
  if (get(isPDF)) {
    const page = PDF.getCurrentPageNumber() || 0
    postion = { page, index: -1, tagName: '' }
  } else {
    const page = get(elementPageStore.elementPage)
    const contianer = getSectionContainer(page)
    if (!contianer) return
    postion = getSectionFirstChild(page) || { page, index: -1, tagName: '' }
  }
  BookAction.update(info.id, { lastReadPosition: JSON.stringify(postion) })
}
async function restorePostion() {
  const postion = get(book)?.lastReadPosition
  if (!postion) return

  const data = JSON.parse(postion) as Position
  if (get(isPDF)) {
    PDF.pageJump(data.page)
    return
  } else {
    // await wait(1000)
    // jumpAction(data.page, undefined, data)
  }

}

onMounted(() => {
  loadData()
})

onBeforeUnmount(() => {
  recordPosition()
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
              <!-- 主题 -->
              <Select :class-name="'!w-36 select-sm'" v-model="settingStore.theme" :is-cloce="false" :list="themes" />
              <!-- 阅读模式 -->
              <Select :class-name="'!w-36 select-sm'" v-model="settingStore.readMode" :is-cloce="false"
                :list="readModeList" />

              <!-- 翻页 -->
              <!-- <div class="join">
                <button class="btn btn-sm  rounded-l-full join-item" @click="">
                  <ChevronFirst />
                </button>
                <input type="number" class="input input-sm w-20 input-bordered join-item" placeholder="number" />
                <button class="btn btn-sm join-item rounded-r-full" @click="">
                  <ChevronLast />
                </button>
              </div> -->
              <!-- 打开搜索框按钮 -->
              <!-- <button aria-label="Search button"
                class="btn hidden h-9 w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline">
                <Search class="w-4 h-4" />
              </button> -->
            </div>
            <div>
            </div>
            <div class="flex gap-4">
              <button class="btn btn-sm" @click="recordPosition()">test</button>

              <!-- pdf控制缩放 -->
              <PDFToolbarView v-if="isPDF" />


              <!-- 操作 -->
              <div class="dropdown dropdown-end " v-else>
                <div tabindex="0" role="button" class="btn btn-sm ">
                  <Bolt />
                </div>
                <ul tabindex="0"
                  class="dropdown-content z-[1] menu p-2  mt-2 shadow bg-base-100   border badge-accent badge-outline  rounded-box w-52 divide-y ">
                  <!-- 调节宽带 -->
                  <li class="flex flex-row justify-between text-base-content py-1">
                    <a @click="zoomOut()">
                      <ZoomOut />
                    </a>
                    <a @click="zoomIn()">
                      <ZoomIn />
                    </a>
                  </li>

                  <!-- 调节字体大小 行高 -->
                  <li class="flex flex-row justify-between text-base-content py-1">
                    <a @click="sizeOut()">
                      <AArrowDown />
                    </a>
                    <a @click="sizeIn()">
                      <AArrowUp />
                    </a>
                  </li>

                </ul>
              </div>

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