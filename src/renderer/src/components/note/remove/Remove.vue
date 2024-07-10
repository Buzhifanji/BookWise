<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { t } from '@renderer/data';
import { useDialog } from '@renderer/hooks';
import { toastSuccess } from '@renderer/shared';
import { vOnClickOutside } from '@vueuse/components';
import { set } from '@vueuse/core';
import { nextTick, ref } from 'vue';
import { NoteAction, NoteText } from '../action';
import DetailContent from '../detail/DetailContent.vue';

const props = defineProps<{ note: Note }>()
const noteList = ref<NoteText[]>([])

const { dialogRef, openDialog, closeDialog } = useDialog();

const removeAction = async () => {
  await NoteAction.removeOne(props.note!.id)
  closeDialog()
  toastSuccess(t('note.removeSuccess'))
}

const initEdite = async () => {
  openDialog()
  await nextTick()
  set(noteList, NoteAction.getNoteText(props.note.notes))
  openDialog()
}

initEdite()

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box " v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold text-lg">{{ t('note.sureRemove') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <DetailContent :note="note" :noteList="noteList" />
      <p class="text-warning mt-4">{{ t('note.forceRemove') }}</p>
      <div class="modal-action">
        <button class="btn btn-outline " @click="closeDialog">{{ t('common.cancel') }}</button>
        <button class="btn btn-outline   btn-error ml-4" @click="removeAction">{{ t('common.sure') }}</button>
      </div>
    </div>
  </dialog>
</template>