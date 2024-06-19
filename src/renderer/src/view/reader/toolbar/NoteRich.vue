<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { NoteAction, NoteText } from '@renderer/components';
import { toastError } from '@renderer/shared';
import { get, onClickOutside, onKeyStroke, useElementBounding, useParentElement } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { computed, onMounted, ref } from 'vue';
import { highlighter } from '../highlight';
import NoteListView from './NoteList.vue';
import SourceListView from './SourceList.vue';
import { NoteBarStyle, NoteRichAction } from './action';

const parentEl = useParentElement()
const cardRef = ref<HTMLElement | null>(null)
const textareatRef = ref<HTMLTextAreaElement | null>(null)
const textareaValue = ref('')

onClickOutside(cardRef, () => {
  closeNoteRich()
})

onKeyStroke('Escape', () => {
  closeNoteRich()
})

const { width, left, } = useElementBounding(parentEl)
const bookParam = useRouteParams<string>('id')

const noteRichAction = new NoteRichAction(bookParam, textareaValue)

const style = computed(() => {
  const w = width.value
  const l = left.value
  const isLG = w > 180
  const padding = 80

  const _width = isLG ? w - padding * 2 : w
  const _left = isLG ? l + padding : l
  return { width: `${_width}px`, left: `${_left}px` }
})

const source = NoteBarStyle.source

const noteList = noteRichAction.notes

let note: Note | undefined = undefined;


function closeNoteRich() {
  // 处理直接新增笔记的特殊情况
  if (!NoteBarStyle.isPainted) {
    if (get(source).length) {
      highlighter.remove(get(source)[0].id)
    }
  }
  NoteBarStyle.close()
}

async function init() {
  // 手动绘制，直接添加笔记
  if (!NoteBarStyle.isPainted) {
    return
  }

  const domSource = get(source)
  if (domSource.length === 0) return

  note = await NoteAction.findBySourceId(domSource[0].id)
  if (!note) {
    toastError('数据丢失：本地未找到笔记')
    NoteBarStyle.close()
  } else {
    noteRichAction.setNotes(note)
  }
}

async function submit() {
  const value = get(textareaValue)
  if (!value) return

  if (NoteBarStyle.isPainted) {
    // 新增，之前有高亮,但无笔记内容
    noteRichAction.addInNoNotes()
  } else {
    // 第一次新增，无高亮
    noteRichAction.firstAdd(get(source))
  }
  NoteBarStyle.close()
}

// 删除
async function remove(_: NoteText, index: number) {
  noteRichAction.remove(index)
}


onMounted(() => {
  textareatRef.value?.focus()
})

init()

</script>

<template>
  <div class="fixed inset-0 transition ease-in-out">
    <div
      class="card w-96 bg-base-100 border border-primary absolute bottom-8 cursor-pointer bar-shadow select-none max-h-full overflow-auto"
      :style="style" ref="cardRef">
      <div class="card-body">
        <div class="flex flex-row justify-between items-center mb-2">
          <h3 class="font-bold text-lg">我的笔记</h3>
          <div @click="closeNoteRich()"> <kbd class="kbd">Esc</kbd></div>
        </div>
        <SourceListView :data="source" />
        <NoteListView class-name="rounded-md" :data="noteList" @remove="remove" />
        <textarea ref="textareatRef" v-model="textareaValue" rows="4"
          class="textarea textarea-accent w-full bg-base-200 my-3 rounded-lg" placeholder="写下此时的想法..."></textarea>
        <div class="card-actions justify-end">
          <button class="btn btn-success" @click="submit">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>