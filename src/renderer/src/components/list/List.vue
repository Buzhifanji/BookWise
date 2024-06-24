<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

interface SelectItem {
  value: string
  id: string
}

interface Props {
  modelValue?: SelectItem | string
  list: SelectItem[]
  isCloce?: boolean,
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  isCloce: true,
  class: ''
})

const emit = defineEmits(['update:modelValue'])

function onClick(value: SelectItem) {
  const data = (props.modelValue as SelectItem).id ? value : value.id
  emit('update:modelValue', data)
}

</script>

<template>
  <ul
    class="p-2 mt-2 z-[10] max-h-60 md:max-h-72 lg:max-h-96 w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow-2xl  gap-1 scrollbar-thin"
    :class="class">
    <li v-for="item in list" :key="item.value" @click="onClick(item)" class="text-base-content">
      <slot v-if="$slots.default" :data="item"></slot>
      <a :class="{ 'active': ((modelValue as SelectItem)?.id || modelValue) === item.id }" v-else>
        {{ item.value }}
      </a>
    </li>
  </ul>
</template>