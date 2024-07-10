<script setup lang="ts">
import { Book, Note, Tag } from '@renderer/batabase';
import { NoteAction, NoteText, TagAction, TagListView } from '@renderer/components';
import { t } from '@renderer/data';
import { toastError, toastSuccess } from '@renderer/shared';
import { settingStore } from '@renderer/store';
import { get, onClickOutside, set, useElementSize } from '@vueuse/core';
import { Baseline, Copy, Headset, Highlighter, MessageSquareMore, SpellCheck2, Trash } from 'lucide-vue-next';

import { Ref, computed, ref } from 'vue';
import { highlighter } from '../highlight';
import { HighlightType, highlightColor } from '../highlight-color';
import { isAudioReadying, playAudioAction } from '../tts';
import { getSectionContainer } from '../util';
import NoteListView from './NoteList.vue';
import { NoteBarStyle, NoteToolBarAction, ToolbarStyle } from './action';

const props = defineProps<{
  book: Book
}>()

const container = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(container)

const style = computed(() => {
  const { top, left } = ToolbarStyle.style

  const _top = top - height.value - 10

  return { top: `${top === 0 ? -1000 : _top > 0 ? _top : 0}px`, left: `${left - width.value / 2}px` }
})

const isEdite = ToolbarStyle.isEdite;

const noteToolBar = new NoteToolBarAction(ToolbarStyle.source, isEdite, props.book,)

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

// 标签
const tags = ref<Tag[]>([]) // 标签
const removeTag = async (index: number) => {
  tags.value.splice(index, 1)
  const tag = TagAction.toJSON(get(tags))
  await NoteAction.update(get(note)!.id, { tag })
  toastSuccess(t('tag.removeTagSuccess'))
}

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
    if (val) {
      set(tags, TagAction.toTag(val.tag))
      set(note, val)
      set(noteList, NoteAction.getNoteText(val.notes))
    }
  }
}
const removeNote = async (_: NoteText, index: number) => {
  noteList.value.splice(index, 1)
  await NoteAction.update(get(note)!.id, { notes: JSON.stringify(get(noteList)) })
  toastSuccess(t('note.removeSuccess'))
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

const list = computed(() => {
  return [
    { name: t('common.copy'), icon: Copy, click: () => noteToolBar.copySource(), active: 'copy' },
    { name: t('line.marker'), icon: Highlighter, click: () => noteToolBar.marker(), active: HighlightType.marker },
    { name: t('line.beeline'), icon: Baseline, click: () => noteToolBar.beeline(), active: HighlightType.beeline },
    { name: t('line.wavy'), icon: SpellCheck2, click: () => noteToolBar.wavy(), active: HighlightType.wavy },
    { name: t('note.write'), icon: MessageSquareMore, click: openNoteRich, active: 'note' },
  ]
})

const onRemove = () => {
  noteToolBar.remove()
  ToolbarStyle.close()
}

// 朗读高亮内容
const onRead = async () => {
  if (get(isAudioReadying)) return
  try {
    const input = ToolbarStyle.source.reduce((acc, cur) => acc + cur.text, '')
    if (!input) return
    set(isAudioReadying, true)
    await playAudioAction({ voice: 'zh-CN-XiaoxiaoNeural', locale: 'zh-CN', input, })
  } catch (err) {
    toastError(`朗读失败：${err}`)
  } finally {
    set(isAudioReadying, false)
  }
}

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
          <div class="tooltip flex" :data-tip="t('setting.autoHighlight')">
            <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="settingStore.isAutoHighlight"
              :checked="settingStore.isAutoHighlight" />
          </div>
        </div>
        <div class="flex pr-2.5">
          <div class="tooltip flex" data-tip="朗读文字">
            <button class="btn btn-sm btn-ghost" @click="onRead()">
              <Headset />
            </button>
          </div>
        </div>
      </div>
      <ul class="menu menu-horizontal p-1 m-0">
        <li @click.stop="item.click" v-for="item in list" :key="item.name" class="tooltip" :data-tip="item.name">
          <a :class="{ active: item.active === activeTextDecoration }">
            <component :is="item.icon" />
          </a>
        </li>
        <li @click.stop="onRemove()" class="tooltip" :data-tip="t('common.remove')" v-if="isEdite">
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
      <div class="p-2 bg-base-200 flex flex-wrap flex-row gap-2" :style="{ '--tw-bg-opacity': 0.5 }" v-if="tags.length">
        <TagListView :tag="tags" @remove="removeTag" />
      </div>
    </div>
  </div>

</template>

<style scoped>
.bar-shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>