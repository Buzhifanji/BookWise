<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { NoteAction, NoteText } from '@renderer/components';
import { toastSuccess } from '@renderer/shared';
import { settingStore } from '@renderer/store';
import { get, onClickOutside, set, useElementSize } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { Baseline, Copy, Highlighter, MessageSquareMore, SpellCheck2, Trash } from 'lucide-vue-next';
import { Ref, computed, ref } from 'vue';
import { highlighter } from '../highlight';
import { HighlightType, highlightColor } from '../highlight-color';
import { getSectionContainer } from '../util';
import NoteListView from './NoteList.vue';
import { NoteBarStyle, NoteToolBarAction, ToolbarStyle } from './action';

const container = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(container)

const style = computed(() => {
  const { top, left } = ToolbarStyle.style

  const _top = top - height.value - 10

  return { top: `${top === 0 ? -1000 : _top > 0 ? _top : 0}px`, left: `${left - width.value / 2}px` }
})

const isEdite = ToolbarStyle.isEdite;
const bookParam = useRouteParams<string>('id')

const noteToolBar = new NoteToolBarAction(ToolbarStyle.source, isEdite, bookParam)

const activeTextDecoration = noteToolBar.decoration

// 颜色
const activeColor = noteToolBar.color

const closeDom = (val: Ref<HTMLElement | null>, e: Event) => {
  const dom = get(val)
  if (dom && dom.contains(e.target as HTMLElement)) return
  ToolbarStyle.close()
}

onClickOutside(container, (e) => {
  closeDom(noteRef, e)
})


// 笔记
const note = ref<Note>()
const noteRef = ref<HTMLElement | null>(null)
const noteList = ref<NoteText[]>([])
const { height: noteHeight } = useElementSize(noteRef)
const noteStyle = computed(() => {
  const top = +get(style).top.replace('px', '')
  const space = 10
  const h = get(noteHeight)

  const source = ToolbarStyle.source;
  if (!source.length) return { top: '0px', left: '0px' }
  const content = getSectionContainer(source[0].page)
  if (!content) return { top: '0px', left: '0px' }
  const { left: cLeft } = content.getBoundingClientRect()
  const w = content.offsetWidth

  if (top >= (h + space)) {
    return { top: `${top - space - h}px`, left: `${cLeft}px`, width: `${w}px` }
  } else {
    // 高度不够，直接在底部显示
    return { bottom: '20px', left: `${cLeft}px`, width: `${w}px` }
  }
})
const findNote = async () => {
  if (get(isEdite) && ToolbarStyle.source.length) {
    const val = await NoteAction.findBySourceId(ToolbarStyle.source[0].id)
    set(note, val)
    set(noteList, NoteAction.getNoteText(val?.notes))
  }
}
const removeNote = async (_: NoteText, index: number) => {
  noteList.value.splice(index, 1)
  await NoteAction.update(get(note)!.id, { notes: JSON.stringify(get(noteList)) })
  toastSuccess('删除笔记成功')
}

onClickOutside(noteRef, (e) => {
  closeDom(container, e)
})

findNote()

// 打开笔记输入框
const openNoteRich = () => {
  if (!get(isEdite)) {
    // 没有高亮，直接笔记输入框
    const source = ToolbarStyle.source.map(item => {
      return { ...item, className: 'selection-info' }
    })
    highlighter?.fromSource(source)
  }
  NoteBarStyle.open(ToolbarStyle.source!, get(isEdite))
  ToolbarStyle.close()
}

const list = [
  { name: '复制', icon: Copy, click: () => noteToolBar.copySource(), active: 'copy' },
  { name: '马克笔', icon: Highlighter, click: () => noteToolBar.marker(), active: HighlightType.marker },
  { name: '直线', icon: Baseline, click: () => noteToolBar.beeline(), active: HighlightType.beeline },
  { name: '波浪线', icon: SpellCheck2, click: () => noteToolBar.wavy(), active: HighlightType.wavy },
  { name: '写想法', icon: MessageSquareMore, click: openNoteRich, active: 'note' },
]
</script>

<template>
  <div class="fixed inset-0">
    <div ref="container"
      class="absolute bg-base-100 border border-info z-50 bar-shadow rounded-md flex flex-col divide-y ease-in-out  shadow-cyan-500/50"
      :style="style" @click.stop>
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row gap-3 cursor-pointer p-2.5">
          <div v-for="item in highlightColor.getColors()" class="badge badge-lg" @click="noteToolBar.changeColor(item)"
            :class="highlightColor.getBadgeColor(item)" :key="item">
            {{ item === activeColor ? '✓' : '' }}
          </div>
        </div>
        <div class="flex pr-2.5">
          <div class="tooltip flex" data-tip="自动高亮">
            <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="settingStore.isAutoHighlight"
              :checked="settingStore.isAutoHighlight" />
          </div>
        </div>
      </div>
      <ul class="menu menu-horizontal p-1 m-0">
        <li @click.stop="item.click" v-for="item in list" :key="item.name" class="tooltip" :data-tip="item.name">
          <a :class="{ active: item.active === activeTextDecoration }">
            <component :is="item.icon" />
          </a>
        </li>
        <li @click.stop="noteToolBar.remove()" class="tooltip" data-tip="删除" v-if="isEdite">
          <a>
            <Trash />
          </a>
        </li>
      </ul>
    </div>
    <div v-if="noteList.length" ref="noteRef"
      class="absolute  bg-base-100 border border-info bar-shadow rounded-md flex flex-col ease-in-out divide-y"
      @click.stop :style="noteStyle">
      <NoteListView class-name="rounded-md" :data="noteList" @remove="removeNote" />
    </div>
  </div>

</template>

<style scoped>
.bar-shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>