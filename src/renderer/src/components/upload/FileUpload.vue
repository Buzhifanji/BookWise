<script setup lang="ts">
import { DIALOG_FILE_UPLOAD } from '@renderer/shared'
import { defineExpose , ref} from 'vue';

const dialogRef = ref<HTMLElement | null>(null)

function open() {
    dialogRef.value?.showModal()
}

defineExpose({open})

</script>

<template>
 <dialog  class="modal" ref="dialogRef">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
</template>
