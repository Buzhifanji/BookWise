<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { toastSuccess } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { set } from '@vueuse/core';
import dayjs from 'dayjs';
import { nextTick, ref } from 'vue';
import { TagAction } from '../../tag/action';
import TagListView from '../../tag/TagList.vue';
import { NoteAction, NoteText } from '../action';
import NoteView from '../Note.vue';

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
  set(noteList, NoteAction.getNoteText(props.note.notes))
  await nextTick()
  openDialog()
}

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box " v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold text-lg">{{ t('note.sureRemove') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <div v-if="note.createTime">
        {{ dayjs(note.createTime).format('L LT') }}
      </div>
      <div class="prose">
        <blockquote class="my-[1em]">
          <p class=" my-[0.6em]" v-for="item in NoteAction.getDomSource(note.domSource)">{{ item.text }}</p>
        </blockquote>
      </div>
      <!-- 笔记内容 -->
      <NoteView :data="noteList" :show-remove="false" v-if="noteList.length" />
      <!-- 笔记标签 -->
      <div v-if="TagAction.toTag(note.tag).length" class="pt-2 flex flex-wrap flex-row gap-2">
        <TagListView :tag="TagAction.toTag(note.tag)" :show="false" />
      </div>
      <p class="text-warning mt-4">{{ t('note.forceRemove') }}</p>
      <div class="modal-action">
        <button class="btn btn-outline " @click="closeDialog">{{ t('common.cancel') }}</button>
        <button class="btn btn-outline   btn-error ml-4" @click="removeAction">{{ t('common.sure') }}</button>
      </div>
    </div>
  </dialog>
</template>