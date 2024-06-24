<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { defineProps, ref } from 'vue';

interface Props {
  detailsClass?: string
  summaryClass?: string
}

withDefaults(defineProps<Props>(), {
  detailsClass: '',
  summaryClass: '',
})


const detailsRef = ref<HTMLDetailsElement | null>(null)

const onCloce = () => {
  if (detailsRef.value && detailsRef.value.open) {
    detailsRef.value.open = false
  }
}

onClickOutside(detailsRef, onCloce)

</script>

<template>
  <details class="dropdown" :class="detailsClass" ref="detailsRef">
    <summary :class="summaryClass">
      <slot name="summary"></slot>
    </summary>
    <slot></slot>
  </details>
</template>