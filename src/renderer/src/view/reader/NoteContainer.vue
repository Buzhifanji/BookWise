<script setup lang="ts">
import { Book, Note } from '@renderer/batabase';
import { NoteAction, Toast } from '@renderer/components';
import { useBgOpacity } from '@renderer/hooks';
import { $, convertUint8ArrayToURL } from '@renderer/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { get, onClickOutside, onKeyStroke, set, useClipboard, useElementSize, useWindowSize } from '@vueuse/core';
import dayjs from 'dayjs';
import { Baseline, Copy, Highlighter, SpellCheck2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { ColorKeys, HighlightType, highlightColor } from './highlight-color';
import NoteListView from './toolbar/NoteList.vue';
import SourceListView from './toolbar/SourceList.vue';
import { ToolbarAction } from './toolbar/action';

interface Props {
  book: Book,
}

const props = defineProps<Props>()

// tab
const activeTab = ref('book')
const changeTab = (tab: string) => {
  activeTab.value = tab
}

const notes = NoteAction.observableByEBookId(props.book.id)

const removeOneNote = () => {

}

// 虚拟列表
const containerRef = ref<HTMLElement | null>(null)
const rowVirtualizerOptions = computed(() => {
  return {
    count: notes.value?.length || 0,
    estimateSize: () => 400,
    overscan: 10,
    getScrollElement: () => containerRef.value,
  }
})
const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
const measureElement = (el) => {
  if (!el) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(el)
  })
  return undefined
}

// 鼠标选中效果
const { hoverIndex, indexBgOpacity, hoverAction } = useBgOpacity()
const closeHover = () => {
  if (!get(selectNote)) {
    hoverAction(1, -1)
  }
}

// 编辑（工具栏）
const selectNote = ref<Note>() // 选中的笔记
const noteTop = ref(0)
const toolbarRef = ref<HTMLElement | null>(null)
const openEidteBar = async (index: number) => {
  const dom = $(`.note-item[data-index='${index}']`) as HTMLElement
  if (dom) {
    set(selectNote, get(notes)[index])
    hoverAction(0.3, index)
    const { top } = dom.getBoundingClientRect()
    set(noteTop, top)
  }
}
const { height: barHeight } = useElementSize(toolbarRef)
const { height: winHeight } = useWindowSize()
const barTop = computed(() => {
  const n = get(noteTop)
  const w = get(winHeight)
  const h = get(barHeight)
  if (n < 0) {
    return 0
  }
  if (n + h > w) {
    return w - h - 2
  }
  return n
})


onClickOutside(toolbarRef, () => {
  hoverAction(1, -1)
  set(selectNote, undefined)
})
onKeyStroke('Escape', () => {
  if (get(selectNote)) {
    hoverAction(1, -1)
    set(selectNote, undefined)
  }
})

// 复制
const { copy } = useClipboard()
const copyAction = () => {
  const val = ToolbarAction.source.reduce((acc, cur) => (acc += cur.text), '')
  copy(val)
  Toast({
    message: '已复制到剪贴板',
    position: ['toast-top', 'toast-center'],
    type: 'alert-success',
  })
}

const onMarker = () => { }
const onBeeline = () => { }
const onWave = () => { }
const barList = [
  { name: '复制', icon: Copy, click: copyAction, active: 'copy' },
  // { name: '复制', icon: Copy, click: copyAction, active: 'copy' },
  // { name: '复制', icon: Copy, click: copyAction, active: 'copy' },
  { name: '删除', icon: Trash, click: copyAction, active: 'remove' },
  // { name: '写想法', icon: MessageSquareMore, click: openNoteRich, active: 'note' },
]
const lineList = [
  { name: '马克笔', icon: Highlighter, click: onMarker, active: HighlightType.marker },
  { name: '直线', icon: Baseline, click: onBeeline, active: HighlightType.beeline },
  { name: '波浪线', icon: SpellCheck2, click: onWave, active: HighlightType.wavy },
]

function changeColor(value: ColorKeys) {

}
</script>

<template>
  <div class="left-note-wrapper bg-base-100 flex flex-col">
    <div role="tablist" class="tabs tabs-boxed rounded-none rounded-b">
      <a role="tab" class="tab transition ease-in-out " :class="{ 'tab-active': activeTab === 'book' }"
        @click="changeTab('book')">书籍</a>

      <a role="tab" class="tab transition ease-in-out " :class="{ 'tab-active': activeTab === 'note' }"
        @click="changeTab('note')" v-if="notes?.length">
        <div class="indicator w-full justify-center">
          <span class="indicator-item indicator-bottom badge badge-secondary right-[5px]">
            {{ notes.length >= 100 ? '99+' : notes.length }}
          </span>
          <div>笔记</div>
        </div>
      </a>
      <a role="tab" class="tab transition ease-in-out " :class="{ 'tab-active': activeTab === 'note' }"
        @click="changeTab('note')" v-else>笔记</a>
    </div>
    <div class="flex-1 transition ease-in-out p-3 relative">
      <!-- 书籍信息 -->
      <div class="flex flex-col" v-if="activeTab === 'book'">
        <div class="flex flex-row gap-3">
          <div class="avatar">
            <div class="w-28 rounded">
              <img :src="convertUint8ArrayToURL(book.cover)" />
            </div>
          </div>
          <div class="flex-1 flex flex-col gap-2 overflow-hidden">
            <div class="font-bold whitespace-normal">
              <span>{{ book.name }}</span>
            </div>
            <div class="stat-title whitespace-normal">{{ book.author }}</div>
          </div>
        </div>
        <div class="flex gap-4 ml-3 mt-5 mb-2">
          <div>出版商</div>
          <div class="stat-title">{{ book.publisher }}</div>
        </div>
        <div class="flex flex-nowrap gap-4 ml-3 mb-2  overflow-hidden">
          <div class="flex-none">出版时间</div>
          <div class="stat-title shrink ">{{ book.publishTime ? dayjs(book.publishTime).format('L LT') : '' }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>创建时间</div>
          <div class="stat-title ">{{ dayjs(book.createTime).format('L LT') }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>更新时间</div>
          <div class="stat-title ">{{ dayjs(book.updateTime).format('L LT') }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>大小</div>
          <div class="stat-title">{{ book.size }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>页数</div>
          <div class="stat-title">{{ book.pages }}</div>
        </div>

      </div>
      <!-- 笔记 -->
      <div v-else class="absolute inset-0 ">
        <div class="h-full p-3 bg-base-100 overflow-y-auto scrollbar-none hover:scrollbar-thin" ref="containerRef">
          <div class="relative w-full" :style="{ height: `${totalSize}px` }">
            <div class="absolute top-0 left-0 w-full "
              :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }">
              <div v-for="virtualRow in virtualRows" :key="virtualRow.key" class="note-item"
                :data-index="virtualRow.index" :ref="measureElement">
                <div class="card bg-base-200 rounded-md cursor-pointer mb-3 "
                  :class="[hoverIndex === virtualRow.index ? 'bg-info text-info-content' : '']"
                  :style="{ '--tw-bg-opacity': indexBgOpacity(virtualRow.index) }"
                  @mouseenter="hoverAction(0.3, virtualRow.index)" @mouseleave="closeHover()">
                  <div class="card-body p-2">
                    <!-- 高亮内容 -->
                    <SourceListView :data="NoteAction.getDomSource(notes[virtualRow.index].domSource)"
                      :opacity="indexBgOpacity(virtualRow.index)" />

                    <!-- 笔记列表 -->
                    <div class="grid grid-cols-1 divide-y divide-secondary-content">
                      <NoteListView :data="NoteAction.getNoteText(notes[virtualRow.index].notes)"
                        :opacity="indexBgOpacity(virtualRow.index)" />
                    </div>
                    <div class="flex flex-row-reverse">
                      <button class="btn btn-sm btn-outline btn-primary"
                        @click="openEidteBar(virtualRow.index)">编辑</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 笔记工具栏 -->
        <div class="fixed inset-0" v-if="selectNote">
          <div
            class="card bg-base-100 absolute transition ease-in-out   right-[26rem] border border-primary z-50 select-none cursor-pointer max-w-md bar-shadow"
            :style="{ top: `${barTop}px` }" ref="toolbarRef">
            <div class="card-body p-4">
              <div class="grid grid-cols-1 bg-base-200 rounded-lg p-2 divide-y divide-secondary-content"
                :style="{ '--tw-bg-opacity': 0.5 }">
                <ul class="menu menu-horizontal p-1 m-0 justify-between">
                  <li @click.stop="item.click" v-for="item in barList" :key="item.name" class="tooltip"
                    :data-tip="item.name">
                    <a>
                      <component :is="item.icon" />
                    </a>
                  </li>
                </ul>
                <div class="grid grid-cols-2 divide-x divide-secondary-content">
                  <ul class="menu menu-horizontal p-1 m-0 justify-between">
                    <li @click.stop="item.click" v-for="item in lineList" :key="item.name" class="tooltip"
                      :data-tip="item.name">
                      <a>
                        <component :is="item.icon" />
                      </a>
                    </li>
                  </ul>
                  <div>
                    <div class="flex flex-row gap-3 cursor-pointer p-2.5">
                      <div v-for="item in highlightColor.getColors()" class="badge badge-lg" @click="changeColor(item)"
                        :class="highlightColor.getBadgeColor(item)" :key="item">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <NoteListView class-name="rounded-lg" :data="NoteAction.getNoteText(selectNote.notes)" />
              <textarea ref="textareatRef" rows="4" class="textarea textarea-accent w-full bg-base-200 rounded-lg my-3"
                placeholder="写下此时的想法..."></textarea>
              <div class="card-actions justify-end">
                <button class="btn btn-sm btn-success">添加</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-note-wrapper {
  --rightbar-width: 26rem;
  width: var(--rightbar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100vh;
  min-width: 15rem;
  border-inline-start-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.left-note-wrapper.hide {
  margin-inline-end: calc(var(--rightbar-width)* -1);
}

.bar-shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>