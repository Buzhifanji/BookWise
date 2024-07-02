<script setup lang="ts">
import { t } from '@renderer/view/setting';
import dayjs from 'dayjs';
import { NoteText } from './action';

interface Props {
  data: NoteText[],
  showRemove?: boolean
}

withDefaults(defineProps<Props>(), {
  data: () => [],
  showRemove: true
})

const emit = defineEmits(['remove'])

const removeNote = (index: number) => {
  emit('remove', index)
}

</script>

<template>
  <div class="bg-base-200 p-3 rounded-md grid grid-cols-1 divide-y">
    <div v-for="item, index in data">
      <div class="flex flex-row justify-between items-center mt-3">
        <div class="stat-desc">{{ dayjs(item.time).format('L LT') }}</div>
        <div v-if="showRemove">
          <button class="btn btn-outline btn-error btn-xs" @click="removeNote(index)">{{ t('common.remove') }}</button>
        </div>
      </div>
      <p class="my-2">{{ item.value }}</p>
    </div>
  </div>
</template>