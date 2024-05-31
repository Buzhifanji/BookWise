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
      <template v-if="item.subitems && item.subitems.length > 0">
        <details>
          <summary>{{ item.label }}</summary>
          <Doc :data="item.subitems" :deps="deps + 1" />
        </details>
      </template>
      <template v-else>
        <a>{{ item.label }}</a>
      </template>
    </li>
  </ul>
</template>