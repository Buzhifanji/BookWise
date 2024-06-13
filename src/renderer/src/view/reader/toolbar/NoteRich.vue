<script setup lang="ts">
import { onClickOutside, useElementBounding, useParentElement } from '@vueuse/core';
import { computed, ref } from 'vue';
import { NoteBarAction } from './action';

const parentEl = useParentElement()
const cardRef = ref<HTMLElement | null>(null)

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

const isShow = NoteBarAction.show

</script>

<template>
  <div class="fixed inset-0 transition ease-in-out" v-if="isShow">
    <div class="card w-96 bg-neutral text-neutral-content shadow-xl absolute bottom-8 cursor-pointer" :style="style"
      ref="cardRef">
      <div class="card-body">
        <h2 class="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-success">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>