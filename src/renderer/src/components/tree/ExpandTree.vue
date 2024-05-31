<script setup lang="ts">

interface Props {
  data: any[],
  deps?: number
}

withDefaults(defineProps<Props>(), {
  data: () => [],
  deps: 0
})


</script>

<template>
  <ul :class="{ 'menu': deps === 0 }">
    <li v-for="item in data" :key="item.herf">
      <a>{{ item.label }}</a>
      <template v-if="item.subitems && item.subitems.length > 0">
        <ExpandTree :data="item.subitems" :deps="deps + 1" />
      </template>
    </li>
  </ul>
</template>