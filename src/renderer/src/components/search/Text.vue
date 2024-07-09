<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value: string, search: string }>();

const val = computed(() => {
  const regex = new RegExp(props.search, 'gi');
  return props.value.replace(regex, '<span class="selection-info">$&</span>');
})

</script>

<template>
  <div class="ml-4 whitespace-normal block" v-html="val"></div>
</template>