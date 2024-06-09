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
  <div v-if="data.length" class="h-full p-4">
    <Card :data="data[0]"/>
  </div>
</template>