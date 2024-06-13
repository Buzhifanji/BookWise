<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { NoteAction, NoteText, Toast } from '@renderer/components';
import { now } from '@renderer/shared';
import { get, onClickOutside, onKeyStroke, set, useElementBounding, useParentElement } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import { NoteBarAction } from './action';

const parentEl = useParentElement()
const cardRef = ref<HTMLElement | null>(null)
const textareatRef = ref<HTMLTextAreaElement | null>(null)
const textareaValue = ref('')

onClickOutside(cardRef, () => {
  NoteBarAction.close()
})

onKeyStroke('Escape', () => {
  NoteBarAction.close()
})

const { width, left, } = useElementBounding(parentEl)

const style = computed(() => {
  const w = width.value
  const l = left.value
  const isLG = w > 180
  const padding = 80

  const _width = isLG ? w - padding * 2 : w
  const _left = isLG ? l + padding : l
  return { width: `${_width}px`, left: `${_left}px` }
})

const source = NoteBarAction.source

const noteList = ref<NoteText[]>([])

let note: Note | undefined = undefined;

async function init() {
  const domSource = get(source)
  if (domSource.length === 0) return

  note = await NoteAction.findBySourceId(domSource[0].id)
  if (!note) {
    Toast({
      message: '数据丢失：本地未找到笔记',
      position: ['toast-top', 'toast-center'],
      type: 'alert-error',
    })
    NoteBarAction.close()
  } else {
    set(noteList, NoteAction.getNoteText(note.notes))
  }
}

async function submit() {
  const value = get(textareaValue)
  if (!value) return

  if (!note) return

  noteList.value.push({ value, time: now() })

  await NoteAction.set(note.id, { notes: JSON.stringify(noteList.value) })

  NoteBarAction.close()
  if (note?.notes) {
    Toast({
      message: '修改笔记成功',
      position: ['toast-top', 'toast-center'],
      type: 'alert-success',
    })
  } else {
    Toast({
      message: '添加笔记成功',
      position: ['toast-top', 'toast-center'],
      type: 'alert-success',
    })
  }

}

async function remove(index: number) {
  noteList.value.splice(index, 1)

  await NoteAction.set(note!.id, { notes: JSON.stringify(noteList.value) })

  Toast({
    message: '删除笔记成功',
    position: ['toast-top', 'toast-center'],
    type: 'alert-success',
  })
}

onMounted(() => {
  textareatRef.value?.focus()
})

init()

</script>

<template>
  <div class="fixed inset-0 transition ease-in-out">
    <div class="card w-96 bg-base-100  absolute bottom-8 cursor-pointer shadow max-h-full overflow-auto" :style="style"
      ref="cardRef">
      <div class="card-body">
        <div class="flex flex-row justify-between items-center mb-2">
          <h3 class="font-bold text-lg">我的笔记</h3>
          <div @click="NoteBarAction.close()"> <kbd class="kbd">Esc</kbd></div>
        </div>
        <div class="bg-base-200 p-3 rounded-md">
          <div class="flex flex-row gap-4">
            <div class="flex">
              <div class="divider divider-primary h-full w-[3px] flex-col m-0 py-1.5"></div>
            </div>
            <blockquote>
              <p v-for="item in source">
                {{ item.text }}
              </p>
            </blockquote>
          </div>
        </div>
        <div v-for="item, index in noteList" class="bg-base-200 p-3 rounded-md">
          <div class="flex flex-row justify-between items-center mb-1">
            <div class="stat-desc">{{ item.time }}</div>
            <div>
              <button class="btn btn-outline btn-error btn-xs" @click="remove(index)">删除</button>
            </div>
          </div>
          <p>{{ item.value }}</p>
        </div>
        <textarea ref="textareatRef" v-model="textareaValue" rows="4"
          class="textarea textarea-accent w-full bg-base-200 my-3" placeholder="写下此时的想法..."></textarea>
        <div class="card-actions justify-end">
          <button class="btn btn-success" @click="submit">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>