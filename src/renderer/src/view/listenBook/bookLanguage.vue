<script setup lang="ts">
import { BookAction } from '@renderer/components';
import { langs } from '@renderer/data';
import { useDialog } from '@renderer/hooks';
import { vOnClickOutside } from '@vueuse/components';
import { get, useToggle } from '@vueuse/core';

const props = defineProps<{ id: string, close: Function }>()
const { dialogRef, openDialog, closeDialog } = useDialog();
const [loading, setLoading] = useToggle(false)

const onChange = async (val: any) => {
  if (get(loading)) return

  setLoading(true)
  await BookAction.update(props.id, { language: val.id })
  setLoading(false)
  closeDialog()
  props.close(val.id)
}

defineExpose({ open: openDialog })

</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box bg-base-100  h-full flex flex-col" v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">书本语言</h3>
        <div @click="closeDialog()"> <kbd class="kbd kbd-sm cursor-pointer">Esc</kbd></div>
      </div>
      <div class="flex-1 flex flex-col h-full overflow-hidden">
        <div class="stat-title mb-1">系统未能读取出书本语言，请手动选择</div>
        <div class="form-control">
          <label class="label cursor-pointer px-2 rounded hover:bg-base-300/60" v-for="item in langs">
            <span class="label-text"> {{ item.value }}</span>
            <input type="radio" name="radiod" class="radio checked:bg-blue-500" @change="onChange(item)" />
          </label>
        </div>
      </div>
    </div>
  </dialog>
</template>