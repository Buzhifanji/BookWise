<script setup lang="ts">
import { isInClientRectTop } from '@renderer/shared/dom';
import { onClickOutside } from '@vueuse/core';
import { defineEmits, defineProps, onMounted, ref } from 'vue';
import { SelectItem } from './type';

interface Props {
  modelValue?: SelectItem | string
  list: SelectItem[]
  isCloce?: boolean,
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  isCloce: true,
  className: ''
})

const emit = defineEmits(['update:modelValue'])

const detailsRef = ref<HTMLDetailsElement | null>(null)
const summaryRef = ref<HTMLElement | null>(null)

const position = ref('')

onMounted(() => {
  position.value = isInClientRectTop(summaryRef.value!) ? 'dropdown-top' : 'dropdown-bottom'
})

const onCloce = () => {
  if (detailsRef.value && detailsRef.value.open) {
    detailsRef.value.open = false
  }
}

onClickOutside(detailsRef, onCloce)

function onClick(value: SelectItem) {
  const data = (props.modelValue as SelectItem).id ? value : value.id
  emit('update:modelValue', data)
  if (props.isCloce) onCloce()
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
  <details class="dropdown flex" :class="position" ref="detailsRef">
    <summary ref="summaryRef" class="cursor-pointer select select-bordered items-center w-full" :class="className">
      {{ getModelValue(modelValue!) }}
    </summary>
    <ul
      class="p-2  mt-1 mb-1  dropdown-content  z-[10] max-h-60 md:max-h-72 lg:max-h-96 w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow gap-1 scrollbar-thin ">
      <li v-for="item in list" :key="item.value" @click="onClick(item)" class="text-base-content">
        <slot v-if="$slots.default" :data="item"></slot>
        <a :class="{ 'active': ((modelValue as SelectItem)?.id || modelValue) === item.id }" v-else>
          {{ item.value }}
        </a>
      </li>
    </ul>
  </details>
</template>