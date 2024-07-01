<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { RouterName } from '@renderer/route';
import { chuankArray, remToPx, toastSuccess } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { t } from '@renderer/view/setting';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import { set } from '@vueuse/core';
import dayjs from 'dayjs';
import { Flag } from 'lucide-vue-next';
import { computed, defineProps, ref, toRaw, withDefaults } from 'vue';
import { bookJump } from '../book/action';
import Card from './Card.vue';
import NoteView from './Note.vue';
import { NoteAction, NoteText } from './action';

interface Props {
  data: Note[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

// 笔记内容
const noteList = ref<NoteText[]>([])

const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)
const list = computed(() => {
  const count = parseInt(((store.width) / remToPx(24 + 1)).toString())
  return chuankArray(toRaw(props.data) || [], count)
})

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: list.value.length,
    estimateSize: () => 350,
    overscan: 5,
    getScrollElement: () => parentRef.value,
  }
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const measureElement = (el) => {
  if (!el) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(el)
  })
  return undefined
}

let selectData: Note | null = null

// 删除
const { dialogRef: removeDialogRef, openDialog: openRemoveDialog, closeDialog: closeRemoveDialog } = useDialog();
const removeBefore = (value: Note) => {
  selectData = value
  openRemoveDialog()
}
const removeAction = async () => {
  await NoteAction.removeOne(selectData!.id)
  closeRemoveDialog()
  toastSuccess(t('note.removeSuccess'))
}

// 详情
const { dialogRef: detailDialogRef, openDialog: openDetailDialog, closeDialog: closeDetailDialog } = useDialog();
const onDetail = (value: Note) => {
  selectData = value
  openDetailDialog()
  set(noteList, NoteAction.getNoteText(value.notes))
}

const removeNote = async (index: number) => {
  noteList.value.splice(index, 1)
  await NoteAction.update(selectData!.id, { notes: JSON.stringify(noteList.value) })
  toastSuccess(t('note.removeSuccess'))
}

// 跳转
const jump = (value: Note) => {
  localStorage.setItem('__note__', JSON.stringify(value))
  bookJump(value.eBookId)
}

</script>

<template>
  <div ref="parentRef" class="p-6  h-full overflow-auto" v-if="data.length">
    <div class="relative w-full" :style="{ height: `${totalSize}px`, }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="flex gap-4 absolute top-0 left-0  w-full pb-5"
          :style="{ transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)` }">
          <template v-for="item in list[virtualRow.index]">
            <Card :data="item" @delete="removeBefore" @detail="onDetail" @jump="jump" />
          </template>
        </div>
      </template>
    </div>

    <!-- 删除确认 -->
    <dialog class="modal" ref="removeDialogRef">
      <div class="modal-box " v-on-click-outside="closeRemoveDialog">
        <div class="flex flex-row justify-between items-center">
          <h3 class="font-bold text-lg">{{ t('note.sureRemove') }}</h3>
          <div @click="closeRemoveDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
        </div>
        <div v-if="selectData?.createTime">
          {{ dayjs(selectData?.createTime).format('L LT') }}
        </div>
        <div class="prose">
          <blockquote class="my-[1em]">
            <p class=" my-[0.6em]" v-for="item in NoteAction.getDomSource(selectData?.domSource)">{{ item.text }}</p>
          </blockquote>
        </div>
        <template v-if="noteList.length">
          <NoteView :data="noteList" @remove="removeNote" />
        </template>
        <p class="text-warning mt-4">{{ t('note.forceRemove') }}</p>
        <div class="modal-action">
          <button class="btn btn-outline " @click="closeRemoveDialog">{{ t('common.remove') }}</button>
          <button class="btn btn-outline   btn-error ml-4" @click="removeAction">{{ t('common.sure') }}</button>
        </div>
      </div>
    </dialog>

    <!-- 详情 -->
    <dialog class="modal" ref="detailDialogRef">
      <div class="modal-box " v-on-click-outside="closeDetailDialog">
        <div class="flex flex-row justify-between items-center">
          <h3 class="font-bold text-lg">{{ t('note.noteDetail') }}</h3>
          <div @click="closeDetailDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
        </div>
        <div v-if="selectData?.createTime">
          {{ dayjs(selectData?.createTime).format('L LT') }}
        </div>
        <div class="prose">
          <blockquote class="my-[1em] ">
            <p class=" my-[0.6em]" v-for="item in NoteAction.getDomSource(selectData?.domSource)">{{ item.text }}</p>
          </blockquote>
        </div>
        <template v-if="noteList.length">
          <NoteView :data="noteList" :show-remove="false" />
        </template>
        <div class="modal-action">
          <button class="btn btn-outline " @click="closeDetailDialog">关闭</button>
        </div>
      </div>
    </dialog>
  </div>
  <div class="hero min-h-screen bg-base-200" v-else>
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{ t('note.empty') }}</h1>
        <p class="py-6">{{ t('note.emptyNoteListTip') }}</p>
        <RouterLink :to="RouterName.Book">
          <button class="btn btn-secondary">
            <Flag />{{ t('book.jumpToBookList') }}
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>