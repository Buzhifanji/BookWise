<script setup lang="ts">

interface Props {
  data: any[],
  deps?: number
}

withDefaults(defineProps<Props>(), {
  data: () => [],
  deps: 0
})

const emit = defineEmits(['click'])

const handleClick = (e: any) => {
  emit('click', e)
}

</script>

<template>
  <ul :class="{ 'menu': deps === 0 }">
    <li v-for="item in data" :key="item.herf" @click.stop="handleClick(item)">
      <a>{{ item.label }}</a>
      <template v-if="item.subitems && item.subitems.length > 0">
        <ExpandTree :data="item.subitems" :deps="deps + 1" @click="handleClick" />
      </template>
    </li>
  </ul>
</template>