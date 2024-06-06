<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { defineEmits, defineProps, ref } from 'vue';
import { SelectItem } from './type';

interface Props {
  modelValue?: SelectItem | string
  list: SelectItem[]
}

const props = withDefaults(defineProps<Props>(), {
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
  const data = (props.modelValue as SelectItem).id ? value : value.id
  emit('update:modelValue', data)
}

function getModelValue(modelValue: SelectItem | string) {
  if (!modelValue) return ''

  if ((modelValue as SelectItem).id) {
    return (modelValue as SelectItem).value
  } else {
    return props.list.find(item => item.id === modelValue)?.value
  }
}

</script>

<template>
  <details class="dropdown" ref="detailsRef">
    <summary class=" cursor-pointer select select-bordered items-center w-full">
      {{ getModelValue(modelValue!) }}
    </summary>
    <ul
      class="p-2  mt-2  dropdown-content z-[10] max-h-96 w-full overflow-auto  rounded-md menu flex-nowrap bg-base-100 shadow-2xl ring-1 gap-1 scrollbar-thin ">
      <li v-for="item in list" :key="item.value" @click="onClick(item)">
        <slot v-if="$slots.default" :data="item"></slot>
        <a :class="{ 'active': ((modelValue as SelectItem)?.id || modelValue) === item.id }" v-else>
          {{ item.value }}
        </a>
      </li>
    </ul>
  </details>
</template>./type