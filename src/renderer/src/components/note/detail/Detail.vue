<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { t } from '@renderer/data';
import { useDialog } from '@renderer/hooks';
import { vOnClickOutside } from '@vueuse/components';
import { set } from '@vueuse/core';
import { nextTick, ref } from 'vue';
import { NoteAction, NoteText } from '../../note/action';
import DetailContent from './DetailContent.vue';

const props = defineProps<{ note: Note }>()

const noteList = ref<NoteText[]>([])

const { dialogRef, openDialog, closeDialog } = useDialog();


const initEdite = async () => {
  openDialog()
  await nextTick()
  set(noteList, NoteAction.getNoteText(props.note.notes))
  openDialog()
}

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box  max-w-fit" v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold text-lg">{{ t('note.noteDetail') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <DetailContent :note="note" :noteList="noteList" />
      <div class="modal-action">
        <button class="btn btn-outline " @click="closeDialog">{{ t('common.close') }}</button>
      </div>
    </div>
  </dialog>
</template>