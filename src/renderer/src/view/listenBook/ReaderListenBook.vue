<script setup lang="ts">
import { ListenBookContentView } from '@renderer/components';
import { useDialog } from '@renderer/hooks';
import { vOnClickOutside } from '@vueuse/components';
import { set } from '@vueuse/core';
import { defineProps, ref } from 'vue';
interface Props {
  bookId: string,
  close: Function
}

const props = defineProps<Props>()

const { dialogRef, openDialog, closeDialog } = useDialog();
const show = ref(false)


function open() {
  set(show, true)
  openDialog();
}

function clsoe() {
  set(show, false)
  props.close()
  closeDialog()
}

defineExpose({ open })

</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box bg-base-100 max-w-screen-2xl h-full flex flex-col" v-on-click-outside="clsoe">
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg ">朗读书籍</h3>
        <div @click="clsoe()"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <div class="flex-1 flex flex-col h-full overflow-hidden" v-if="show">
        <ListenBookContentView :book-id="bookId" />
      </div>
    </div>
  </dialog>
</template>