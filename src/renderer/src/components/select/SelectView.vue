<script setup lang="ts">
import Select from './Select.vue';
import { SelectItem } from './type';

interface Props {
  label: string
  list: SelectItem[]
}

defineProps<Props>()

const model = defineModel<SelectItem | string>()

const textOpacity = { '--tw-text-opacity': 0.6 };

</script>

<template>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text" :style="textOpacity">{{ label }}</span>
    </div>
    <Select v-model="model" :list="list" />
  </label>
</template>