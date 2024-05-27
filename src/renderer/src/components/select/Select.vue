<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { defineEmits, defineProps, ref } from 'vue';
import { SelectItem } from './type';

interface Props {
  modelValue?: SelectItem
  list: SelectItem[]
}

withDefaults(defineProps<Props>(), {
  list: () => []
})

const emit = defineEmits(['update:modelValue'])

const detailsRef = ref<HTMLDetailsElement | null>(null)

const toggle = () => {
  if (detailsRef.value && detailsRef.value.open) {
    detailsRef.value.open = false
  }
}

onClickOutside(detailsRef, toggle)

function onClick(value: SelectItem) {
  emit('update:modelValue', value)
}

</script>

<template>
  <details class="dropdown" ref="detailsRef">
    <summary class=" cursor-pointer select select-bordered items-center w-full">
      {{ modelValue?.value }}
    </summary>
    <ul
      class="p-2  mt-2  dropdown-content z-[10] max-h-96 w-full overflow-auto rounded-md menu flex-nowrap bg-base-100 shadow-lg ring-1 gap-1 scrollbar-thin ">
      <li v-for="item in list" :key="item.value" @click="onClick(item)">
        <a :class="{ 'active': modelValue?.value === item.value }">
          {{ item.value }}
        </a>
      </li>
    </ul>
  </details>
</template>./type