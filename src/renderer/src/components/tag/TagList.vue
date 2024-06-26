<script setup lang="ts">
import { Tag } from '@renderer/batabase';
import { X } from 'lucide-vue-next';
import { defineProps, withDefaults } from 'vue';

interface Props {
  tag: Tag[],
  show?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: () => [],
  show: true,
})


const emit = defineEmits(['remove'])

</script>

<template>
  <div class="badge badge-info gap-2" v-for="item, index in tag">
    {{ item.tagName }}
    <X v-if="show" class="w-4 h-4 cursor-pointer" @click="emit('remove', index)" />
  </div>
</template>