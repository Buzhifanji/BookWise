<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { chuankArray, remToPx } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import { computed, defineProps, ref, toRaw, withDefaults } from 'vue';
import { Toast } from '../toast';
import Card from './Card.vue';
import { NoteAction } from './action';

interface Props {
  data: Note[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

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

  rowVirtualizer.value.measureElement(el)

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
  Toast({
    message: '删除成功',
    position: ['toast-top', 'toast-center'],
    type: 'alert-success',
  })

}
</script>

<template>
  <div ref="parentRef" class="p-6 flex h-full overflow-auto">
    <div class="relative w-full" :style="{ height: `${totalSize}px`, }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="flex gap-4 absolute top-0 left-0  w-full pb-5"
          :style="{ transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)` }">
          <template v-for="item in list[virtualRow.index]">
            <Card :data="item" @delete="removeBefore" />
          </template>
        </div>
      </template>
    </div>

    <!-- 删除确认 -->
    <dialog class="modal" ref="removeDialogRef">
      <div class="modal-box prose" v-on-click-outside="closeRemoveDialog">
        <h3 class="font-bold text-lg">确认删除笔记</h3>
        <blockquote class="my-[1em]">
          <p class=" my-[0.6em]">{{ selectData?.bookText }}</p>
        </blockquote>
        <p v-if="selectData?.notes">{{ selectData?.notes }}</p>
        <p class="text-warning">将该笔记永久删除</p>
        <div class="modal-action">
          <button class="btn btn-outline" @click="closeRemoveDialog">取消</button>
          <button class="btn btn-outline  btn-error ml-4" @click="removeAction">确认</button>
        </div>
      </div>
    </dialog>
  </div>
</template>