<script setup lang="ts">
import { Book, Note, Tag } from '@renderer/batabase';
import { NoteAction, NoteText, TagAction, TagInputView, TagListView } from '@renderer/components';
import { useBgOpacity } from '@renderer/hooks';
import { $ } from '@renderer/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { get, onClickOutside, onKeyStroke, set, useElementSize, useThrottleFn, useWindowSize } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { Baseline, Copy, Highlighter, SpellCheck2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import BookDetailView from './BookDetail.vue';
import { HighlightType, highlightColor } from './highlight-color';
import NoteListView from './toolbar/NoteList.vue';
import SourceListView from './toolbar/SourceList.vue';
import { NoteRichAction, NoteToolBarAction } from './toolbar/action';

interface Props {
  book: Book,
  readTime: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'jump', data: Note): void,
}>()

const bookParam = useRouteParams<string>('id')

// tab
const activeTab = ref('book')
const changeTab = (tab: string) => {
  activeTab.value = tab
}

const notes = NoteAction.observableByEBookId(props.book.id)

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
const tags = ref<Tag[]>([]) // 标签
const selectNote = ref<Note>() // 选中的笔记
const noteTop = ref(0) // 选中的dom 距离可视化区域的顶部距离
const toolbarRef = ref<HTMLElement | null>(null) //工具栏dom
const noteToolBar = new NoteToolBarAction([], ref(true), bookParam)
const activeTextDecoration = noteToolBar.decoration // 文字高亮类型
const activeColor = noteToolBar.color // 文字高亮颜色

const textareaValue = ref('') // 笔记输入框
const noteRichAction = new NoteRichAction(bookParam, textareaValue)
const noteList = noteRichAction.notes // 编辑框里的笔记列表

const openEidteBar = async (index: number) => {
  const dom = $(`.note-item[data-index='${index}']`) as HTMLElement
  if (dom) {
    const note = get(notes)[index]
    set(tags, TagAction.toTag(note.tag))
    set(selectNote, note)
    hoverAction(0.3, index)

    const { top } = dom.getBoundingClientRect()
    set(noteTop, top)

    noteToolBar.updateSource(NoteAction.getDomSource(note.domSource))
    noteRichAction.setNotes(note)
  }
}
const closeEditrBar = () => {
  set(selectNote, undefined)
  hoverAction(1, -1)
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


onClickOutside(toolbarRef, closeEditrBar)
onKeyStroke('Escape', () => {
  if (get(selectNote)) {
    closeEditrBar()
  }
})

const removeOneNote = () => {
  noteToolBar.remove()
  closeEditrBar()
}

const barList = [
  { name: '复制', icon: Copy, click: () => noteToolBar.copySource(), active: 'copy' },
  { name: '删除', icon: Trash, click: () => removeOneNote(), active: 'remove' },
]
const lineList = [
  { name: '马克笔', icon: Highlighter, click: () => noteToolBar.marker(), active: HighlightType.marker },
  { name: '直线', icon: Baseline, click: () => noteToolBar.beeline(), active: HighlightType.beeline },
  { name: '波浪线', icon: SpellCheck2, click: () => noteToolBar.wavy(), active: HighlightType.wavy },
]


// 笔记操作
const addNote = async () => {
  const note = get(selectNote)
  if (!note) return

  // 新增，之前有高亮,但无笔记内容
  await noteRichAction.addInNoNotes(get(tags))
  set(selectNote, undefined)
}
const removeNote = (_: NoteText, index: number) => {
  noteRichAction.remove(index)
}

// 高亮跳转
const throttleClick = useThrottleFn((val: Note) => {
  emit('jump', val)
}, 800)


</script>

<template>
  <div class="left-note-wrapper bg-base-100 flex flex-col">
    <div role="tablist" class="tabs tabs-boxed rounded-none  py-2">
      <a role="tab" class="tab transition ease-in-out" :class="{ 'tab-active': activeTab === 'book' }"
        @click="changeTab('book')">书籍</a>

      <a role="tab" class="tab transition ease-in-out" :class="{ 'tab-active': activeTab === 'note' }"
        @click="changeTab('note')" v-if="notes?.length">
        <div class="indicator w-full justify-center">
          <span class="indicator-item indicator-bottom badge badge-secondary right-[5px]">
            {{ notes.length >= 100 ? '99+' : notes.length }}
          </span>
          <div>笔记</div>
        </div>
      </a>
      <a role="tab" class="tab transition ease-in-out" :class="{ 'tab-active': activeTab === 'note' }"
        @click="changeTab('note')" v-else>笔记</a>
    </div>
    <div class="flex-1 transition ease-in-out p-3 relative">
      <!-- 书籍信息 -->
      <BookDetailView v-if="activeTab === 'book'" :book="book" :notes="notes" :time="readTime" />

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
                    <SourceListView @click="throttleClick(notes[virtualRow.index])"
                      :data="NoteAction.getDomSource(notes[virtualRow.index].domSource)"
                      :opacity="indexBgOpacity(virtualRow.index)" :auto="false" />
                    <!-- 笔记列表 -->
                    <div class="grid grid-cols-1 divide-y divide-neutral">
                      <NoteListView :show="false" :data="NoteAction.getNoteText(notes[virtualRow.index].notes)"
                        :opacity="indexBgOpacity(virtualRow.index)" />
                      <!-- 笔记标签 -->
                      <div v-if="TagAction.toTag(notes[virtualRow.index].tag).length"
                        class="pt-2 flex flex-wrap flex-row gap-2">
                        <TagListView :tag="TagAction.toTag(notes[virtualRow.index].tag)" :show="false" />
                      </div>
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
              <div class="grid grid-cols-1 bg-base-200 rounded-lg p-2 divide-y divide-neutral"
                :style="{ '--tw-bg-opacity': 0.5 }">
                <ul class="menu menu-horizontal p-1 m-0 justify-between">
                  <li @click.stop="item.click" v-for="item in barList" :key="item.name" class="tooltip"
                    :data-tip="item.name">
                    <a>
                      <component :is="item.icon" />
                    </a>
                  </li>
                </ul>
                <div class="grid grid-cols-2 divide-x py-3 divide-neutral">
                  <ul class="menu menu-horizontal py-0 px-2 m-0 justify-between">
                    <li @click.stop="item.click" v-for="item in lineList" :key="item.name" class="tooltip"
                      :data-tip="item.name">
                      <a :class="{ active: item.active === activeTextDecoration }">
                        <component :is="item.icon" />
                      </a>
                    </li>
                  </ul>
                  <div class="flex items-center px-2">
                    <div class="flex flex-row gap-3 cursor-pointer ">
                      <div v-for="item in highlightColor.getColors()" class="badge badge-lg"
                        @click="noteToolBar.changeColor(item)" :class="highlightColor.getBadgeColor(item)" :key="item">
                        {{ item === activeColor ? '✓' : '' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <NoteListView class-name="rounded-lg" :data="noteList" @remove="removeNote" />
              <textarea v-model="textareaValue" rows="4"
                class="textarea textarea-accent w-full bg-base-200 rounded-lg my-3" placeholder="写下此时的想法..."></textarea>
              <TagInputView v-model="tags" />
              <div class="card-actions justify-end">
                <button class="btn btn-sm btn-success" @click="addNote()">添加</button>
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