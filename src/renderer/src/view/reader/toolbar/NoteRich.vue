<script setup lang="ts">
import { NoteAction } from '@renderer/components';
import { get, onClickOutside, set, useElementBounding, useParentElement } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import { NoteBarAction } from './action';

const parentEl = useParentElement()
const cardRef = ref<HTMLElement | null>(null)
const textareatRef = ref<HTMLTextAreaElement | null>(null)
const textareaValue = ref('')

onClickOutside(cardRef, () => {
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

async function initNote() {
  const domSource = get(source)
  if (domSource.length === 0) return

  const note = await NoteAction.findBySourceId(domSource[0].id)
  if (note) {
    set(textareaValue, note.notes)
  }
}

initNote()

onMounted(() => {
  textareatRef.value?.focus()
})


</script>

<template>
  <div class="fixed inset-0 transition ease-in-out">
    <div class="card w-96 bg-neutral text-neutral-content shadow-xl absolute bottom-8 cursor-pointer " :style="style"
      ref="cardRef">
      <div class="card-body">
        <div class="flex flex-row gap-4">
          <div class="flex">
            <div class="divider divider-accent h-full w-[3px] flex-col m-0 py-1.5"></div>
          </div>
          <blockquote>
            <p v-for="item in source">
              {{ item.text }}
            </p>
          </blockquote>
        </div>
        <textarea ref="textareatRef" v-model="textareaValue" rows="4"
          class="textarea textarea-accent w-full  bg-neutral text-neutral-content my-3"
          placeholder="写下此时的想法..."></textarea>
        <div class="card-actions justify-end">
          <button class="btn btn-success">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>