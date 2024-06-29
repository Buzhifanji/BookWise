<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { settingStore } from '@renderer/store';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { nextTick } from 'vue';
import { BookAction } from '../action';

const props = defineProps<{ book: Book, isRecycleBin: boolean, isForce: boolean }>()

const { dialogRef, openDialog, closeDialog } = useDialog();

function removeOneBook() {
  const id = props.book.id
  if (!id) return

  let isForce = props.isForce
  if (!isForce) {
    isForce = !settingStore.value.isOpenRecycleBin
  }

  BookAction.removeOne(id, isForce)

  closeDialog()
}

const initEdite = async () => {
  openDialog()
  await nextTick()
  openDialog()
}

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box" v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold text-lg">{{ t('book.removeBook') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>

      </div>
      <p class="py-4">{{ book.name }}</p>
      <p v-if="settingStore.isOpenRecycleBin && !isRecycleBin" class="text-warning">{{ t('book.moveToRecycleBin') }}</p>
      <p v-else class="text-warning">{{ t('book.forceRemove') }}</p>
      <div class="modal-action">
        <button class="btn btn-outline" @click="closeDialog">取消</button>
        <button class="btn btn-outline  btn-error ml-4" @click="removeOneBook">{{ t('common.sure') }}</button>
      </div>
    </div>
  </dialog>
</template>