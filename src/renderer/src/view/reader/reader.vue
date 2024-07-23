<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { BookAction, DrawerView, DropdownView, ErrorView, List, NoteAction, RingLoadingView, useToggleDrawer } from '@renderer/components';
import { ReadMode, t, themes } from '@renderer/data';
import { BookRender, cahceRefreshBook, renderBook } from '@renderer/hooks';
import { $, $$, getInterval, now, toastSuccess, toastWarning } from '@renderer/shared';
import { isReload } from '@renderer/shared/navigation';
import { bookPositionStore, bookReadTimeStore, settingStore, useBookPageStore, useBookStore, useUserStore } from '@renderer/store';
import { get, set, useCssVar, useToggle, useWindowSize } from '@vueuse/core';
import { AArrowDown, AArrowUp, AlignJustify, Bolt, Headset, SkipBack, ZoomIn, ZoomOut } from 'lucide-vue-next';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import AudioView from '../listenBook/Audio.vue';
import ReaderListenBookView from '../listenBook/ReaderListenBook.vue';
import CatalogView from './Catalog.vue';
import NoteView from './NoteContainer.vue';
import { CONTINAER_ID, highlighter, initHighlight } from './highlight';
import DoubleReaderView from './mode/DoubleReader.vue';
import ScrollReaderView from './mode/ScrollReader.vue';
import SectionReaderView from './mode/SectionReader.vue';
import PDFReadView from './pdf/ReadView.vue';
import PDFToolbarView from './pdf/Toobar.vue';
import { PDF } from './pdf/pdf';
import NoteRichView from './toolbar/NoteRich.vue';
import ToolbarView from './toolbar/Toolbar.vue';
import { NoteBarStyle, ToolbarStyle } from './toolbar/action';
import { Position } from './type';
import { findCatalogSection, getSectionContainer, getSectionFirstChildPosition, getSectionLeftFfirstChildPosition } from './util';

const props = defineProps({
  id: String,
})

const router = useRouter()

const bookStore = useBookStore()
const stateStore = useUserStore()
const bookInfo = BookRender.bookInfo

watchEffect(() => {
  const data = bookStore.bookList.find(item => item.id === props.id)
  if (data) {
    set(bookInfo, data)
  }
})

const hasBook = ref(false)

const [isLoading, setLoading] = useToggle(false)

const { width } = useWindowSize(); // 适配不能尺寸窗口
const isSM = computed(() => width.value < 1024);

const { isLG: isCatalog, toggleDrawer: toggleCatalog } = useToggleDrawer(); // 控制目录是否显示
const { isLG: isNote, toggleDrawer: toggleNote } = useToggleDrawer() // 控制笔记是否显示

const readMode = ref(settingStore.value.readMode) // 阅读模式
const scrollReaderViewRef = ref<InstanceType<typeof ScrollReaderView>>() // 滚动视图
const sectionReaderViewRef = ref<InstanceType<typeof SectionReaderView>>() // 章节视图
const doubleReaderViewRef = ref<InstanceType<typeof DoubleReaderView>>() // 双栏视图
const readerListenBookViewRef = ref<InstanceType<typeof ReaderListenBookView>>() // 朗读视图

const isPDF = ref(false)

const isNoteRichShow = NoteBarStyle.show
const isShowToolBar = ToolbarStyle.show
const [isReadBook, setReadBook] = useToggle(false)
const isScrollLocked = computed(() => get(isNoteRichShow) || get(isShowToolBar) || get(isReadBook)) // 打开高亮工具栏的时候，锁住滚动条

async function loadData() {
  try {
    setLoading(true)
    const bookId = props.id
    if (!bookId) return

    const data = await renderBook(bookId)
    if (!data) return
    BookRender.handleBookSection()
    const book = get(bookInfo)

    set(isPDF, BookRender.getBook()?.bookType === 'pdf')
    set(hasBook, true)

    setLoading(false)

    await nextTick()

    initHighlight(book!);
    // 笔记跳转
    const note = localStorage.getItem('__note__')
    if (note) {
      noteJump(JSON.parse(note))
      localStorage.removeItem('__note__')
    } else {
      // 恢复上次阅读位置
      if (settingStore.value.isRemeberPosition) {
        restorePostion()
      }
    }

    // 更新打开次数
    const count = (book!.count || 0) + 1
    BookAction.update(bookId, { count })
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

async function catalogJump({ page, href }: any) {
  if (page === '-1') return
  if (get(isPDF)) {
    await PDF.pageJump(+page)
  } else {
    const mode = get(readMode)
    if (mode === ReadMode.scroll) {
      scrollReaderViewRef.value?.catalogJump(href)
    } else if (mode === ReadMode.section) {
      sectionReaderViewRef.value?.catalogJump(page, href)
    } else {
      doubleReaderViewRef.value?.catalogJump(page, href)
    }
  }
}

function test() {
  recordPosition()
}

async function noteJump(note: Note) {
  const source = NoteAction.getDomSource(note.domSource)
  if (source.length === 0) return

  const { page, id } = source[0]
  if (page === '-1') return

  if (get(isPDF)) {
    await PDF.pageJump(+page, id)
  } else {
    const mode = get(readMode)
    if (mode === ReadMode.scroll) {
      scrollReaderViewRef.value?.noteJump(+page, id)
    } else if (mode === ReadMode.section) {
      sectionReaderViewRef.value?.noteJump(+page, id)
    } else {
      doubleReaderViewRef.value?.noteJump(+page, id)
    }
  }
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
    set(zoomSize, `${val + 2}ch`)
  }
}
function zoomOut() {
  const val = +get(zoomSize.value).replace('ch', '')
  if (val > 8) {
    set(zoomSize, `${val - 2}ch`)
  }
}
watchEffect(async () => {
  const mode = settingStore.value.readMode
  if (mode === ReadMode.double) {
    set(zoomSize, `${65 * 2}ch`)
  }
  if (mode === get(readMode)) return

  // 切换阅读模式的时候，需要跳转到对应的浏览位置 
  await recordPosition()
  set(readMode, mode)
  await nextTick()
  restorePostion()
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
const bookPageStore = useBookPageStore()


async function recordPosition() {
  const info = get(bookInfo)
  if (!info) return

  let postion: Position | null = null
  if (get(isPDF)) {
    const page = PDF.getCurrentPageNumber() || 0
    postion = { page, index: -1, tagName: '' }
  } else {
    if (get(readMode) === ReadMode.double) {
      // 双栏模式左右滑动
      const page = get(bookPageStore.page)
      const contianer = getSectionContainer(page)
      if (!contianer) return
      postion = getSectionLeftFfirstChildPosition(contianer, +page)

    } else if (get(readMode) === ReadMode.section) {
      const contianer = $('#scrollConatinerWise')
      if (!contianer) return
      const index = +contianer.getAttribute('data-page-number')!
      postion = getSectionFirstChildPosition(+index)
    } else {
      const pageContainer = findCatalogSection()
      if (!pageContainer) return
      const index = +pageContainer.getAttribute('data-page-number')!
      postion = getSectionFirstChildPosition(+index)
    }
  }


  const lastReadPosition = JSON.stringify(postion)
  // 当页面刷新的时候，保存到数据库的数据是异步，所以得用sessionStorage同步存储
  sessionStorage.setItem('book-wise_refrersh', lastReadPosition)

  if (get(showBack)) {
    // 单页面
    await BookAction.update(info.id, { lastReadPosition })
  } else {
    // 多页面 
    // 当其它页面都关闭完了的时候，channelPostMessage会失效，只能借做localstorage来存储
    bookPositionStore.value[info.id] = lastReadPosition
  }
}

function restorePostion() {
  let postion: string | null | undefined = undefined
  if (isReload()) {
    // 页面刷新，直接从localStorage取
    postion = sessionStorage.getItem('book-wise_refrersh')
  } else {
    postion = get(bookInfo)?.lastReadPosition
  }
  sessionStorage.removeItem('book-wise_refrersh')

  if (!postion) return

  toastSuccess(t('book.jumpToLastPosition'))

  const data = JSON.parse(postion) as Position
  if (get(isPDF)) {
    PDF.pageJump(data.page)
    return
  } else {
    const mode = get(readMode)
    if (mode === ReadMode.scroll) {
      scrollReaderViewRef.value?.positionJump(data)
    } else if (mode === ReadMode.section) {
      sectionReaderViewRef.value?.positionJump(data)
    } else {
      doubleReaderViewRef.value?.positionJump(data)
    }
  }
}

// 进度
const updateProgress = (val: number) => {
  BookAction.update(get(bookInfo)!.id, { progress: val })
}

// 记录阅读时长
const startTime = ref(0);
const endTime = ref(0)
const readTime = computed(() => getInterval(get(startTime), get(endTime)))
let timer: NodeJS.Timeout | null = null

const startReading = () => set(startTime, now())
const endReading = () => set(endTime, now())

function resetReadTime() {
  if (timer) {
    clearInterval(timer)
  }
  timer = setInterval(endReading, 1000 * 60)
  startReading()
  endReading()
}

function recordReadTime() {
  const info = get(bookInfo)
  if (!info) return
  const spaceTime = +get(readTime)
  if (spaceTime >= 1) {
    const data = {
      startTime: get(startTime),
      endTime: get(endTime),
      eBookId: info.id,
    }
    bookReadTimeStore.value[info.id] = JSON.stringify(data)
  }
}

// 页面是否可见
const viewVisibityChange = () => {
  if (document.hidden) {
    recordReadTime()
    resetReadTime()
  } else {
    resetReadTime()
  }
}

// 朗读
const readBook = () => {
  if (!stateStore.isGood) {
    toastWarning('您还不是VIP会员!')
    return
  }

  if (get(isPDF)) {
    // todo support PDF reading
  } else {
    const dom = get(readerListenBookViewRef)
    if (dom) {
      dom.open()
      setReadBook(true)
    }
  }
}

function recordAction() {
  recordPosition()
  recordReadTime()
  if (get(bookInfo)) {
    cahceRefreshBook(get(bookInfo)!)
  }
}


onMounted(() => {
  loadData()
  resetReadTime()
  // 监听 浏览器窗口关闭、刷新
  window.addEventListener("beforeunload", recordAction);
  window.addEventListener('blur', recordReadTime)
  document.addEventListener('visibilitychange', viewVisibityChange)
})

onBeforeUnmount(() => {
  recordAction()
  window.removeEventListener("beforeunload", recordAction);
  window.removeEventListener('blur', recordReadTime)
  document.removeEventListener('visibilitychange', viewVisibityChange)
  if (timer) {
    clearInterval(timer)
  }
  BookRender.clear()
  highlighter?.dispose()
})

</script>

<template>
  <RingLoadingView class="min-h-screen" v-if="isLoading" />
  <template v-else>
    <template v-if="bookInfo && hasBook">
      <!-- 目录 -->
      <div class="block lg:hidden">
        <DrawerView id="catalog-drawer">
          <CatalogView @click="catalogJump" />
        </DrawerView>
      </div>
      <div class="hidden lg:block ">
        <CatalogView :class="{ 'hide': isCatalog }" @click="catalogJump" />
      </div>
      <div class="w-full max-w-full h-screen ">
        <progress v-if="bookInfo.progress"
          class="progress progress-primary w-full fixed top-0 left-0 right-0 z-[9999999] h-[2px]"
          :value="bookInfo.progress * 100" max="100"></progress>

        <div class="flex h-full flex-col ">
          <!-- 头部 -->
          <div role="navigation" id="book-view_nav_bar" aria-label="Navbar"
            class="navbar justify-between border-b border-base-200 px-3 py-0 min-h-12 ">
            <div class="gap-3 flex">
              <!-- 控制侧边栏菜单栏 -->
              <label for="catalog-drawer" class="cursor-pointer " v-if="isSM">
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
            </div>
            <div>
            </div>
            <div class="flex gap-4">
              <button class="btn" @click="test()">test</button>
              <!-- 朗读书籍 -->
              <div class="indicator">
                <span class="indicator-item badge badge-warning" v-if="!stateStore.isGood">VIP</span>
                <button class="btn btn-sm btn-ghost" v-if="!isPDF" @click="readBook()">
                  <Headset />
                </button>
              </div>
              <ReaderListenBookView ref="readerListenBookViewRef" :close="() => setReadBook(false)"
                :page="bookPageStore.page" :book-id="bookInfo.id" />
              <!-- pdf控制缩放 -->
              <PDFToolbarView v-if="isPDF" />
              <!-- 操作 -->
              <DropdownView details-class="dropdown-bottom dropdown-end" summary-class="btn btn-sm m-1">
                <template v-slot:summary>
                  <Bolt />
                </template>
                <ul
                  class="dropdown-content z-[1] menu p-2  mt-1 shadow bg-base-100 border border-accent  rounded-md divide-y ">
                  <!-- 调节宽带 -->
                  <template v-if="!isPDF">
                    <li class="flex flex-row justify-between  py-1">
                      <a @click="zoomOut()">
                        <ZoomOut />
                      </a>
                      <a @click="zoomIn()">
                        <ZoomIn />
                      </a>
                    </li>
                    <!-- 调节字体大小 行高 -->
                    <li class="flex flex-row justify-between  py-1">
                      <a @click="sizeOut()">
                        <AArrowDown />
                      </a>
                      <a @click="sizeIn()">
                        <AArrowUp />
                      </a>
                    </li>
                  </template>
                  <!-- 主题 -->
                  <li>
                    <a class="!p-0  my-1">
                      <DropdownView summary-class="flex flex-row justify-between w-72 dropdown-left px-4 py-2">
                        <template v-slot:summary>
                          <span class="stat-title">{{ t('setting.theme') }}</span>
                          <div class="badge badge-outline">{{ settingStore.theme }}</div>
                        </template>
                        <List
                          class="dropdown-content !top-0 !right-[18.5rem]  !border-secondary  rounded-s-lg rounded-ee-lg z-[2] w-52"
                          :list="themes" v-model="settingStore.theme" />
                      </DropdownView>
                    </a>
                  </li>
                  <!-- 阅读模式 -->
                  <!-- <li>
                    <a class="!p-0 my-1">
                      <DropdownView summary-class="flex flex-row justify-between w-72 dropdown-left px-4 py-2">
                        <template v-slot:summary>
                          <span class="stat-title">{{ t('setting.readMode') }}</span>
                          <div class="badge badge-outline">{{ getSelectReadMode(settingStore.readMode) }}</div>
                        </template>
                        <List
                          class="dropdown-content !top-0 !right-[18.5rem]  !border-secondary  rounded-s-lg rounded-ee-lg z-[2] w-52"
                          :list="readModeList" v-model="settingStore.readMode" />
                      </DropdownView>
                    </a>
                  </li> -->
                </ul>
              </DropdownView>
              <label for="note-drawer" class="cursor-pointer " v-if="isSM">
                <AlignJustify class="w-5 h-5" />
              </label>
              <button aria-label="Leftmenu toggle" @click="toggleNote" class="btn btn-sm btn-square btn-ghost" v-else>
                <AlignJustify class="w-5 h-5" />
              </button>
            </div>
          </div>
          <!-- 书籍内容 -->
          <div class="flex-1 overflow-hidden relative selection:bg-info selection:text-base-content" :id="CONTINAER_ID">
            <PDFReadView v-if="isPDF" :isScrollLocked="isScrollLocked" />
            <template v-else>
              <!-- 滚动条模式 -->
              <ScrollReaderView :isScrollLocked="isScrollLocked" ref="scrollReaderViewRef"
                v-if="readMode === ReadMode.scroll" @progress="updateProgress" />
              <!-- 章节模式 -->
              <SectionReaderView :isScrollLocked="isScrollLocked" ref="sectionReaderViewRef"
                v-if="readMode === ReadMode.section" @progress="updateProgress" />
              <!-- 双栏模式 -->
              <DoubleReaderView :isScrollLocked="isScrollLocked" ref="doubleReaderViewRef"
                v-if="readMode === ReadMode.double" @progress="updateProgress" />
            </template>

            <!-- 工具栏 -->
            <ToolbarView :book="bookInfo" v-if="isShowToolBar" />

            <!-- 添加笔记 -->
            <NoteRichView :book="bookInfo" v-if="isNoteRichShow" />
          </div>
        </div>
      </div>
      <!-- 笔记 -->
      <div class="block lg:hidden">
        <DrawerView id="note-drawer" :is-right="true">
          <NoteView :book="bookInfo" @jump="noteJump" :read-time="readTime" />
        </DrawerView>
      </div>
      <div class="hidden lg:block">
        <NoteView :book="bookInfo" :read-time="readTime" @jump="noteJump" :class="{ 'hide': isNote }" />
      </div>

      <!-- 控制播放音频 -->
      <AudioView />
    </template>
    <ErrorView v-else />
  </template>
</template>