<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { computed, defineProps, onMounted, ref, toRaw, withDefaults } from 'vue';
import Card from './Card.vue';

interface Props {
  data: Note[],
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})
console.log(props.data)
</script>

<template>
  <div v-if="data.length" class="h-full p-4 absulote inset-0 overflow-auto flex flex-col gap-4">
    <Card  v-for="item in data" :data="item"/>
  </div>
</template>