<script setup lang="ts">


interface Props {
  data: any[],
  deps?: number,
  active: number,
}

withDefaults(defineProps<Props>(), {
  data: () => [],
  deps: 0,
  active: 0,
})

const emit = defineEmits(['click'])

const handleClick = (e: any) => {
  emit('click', e)
}

const isActive = (item: any, active: number) => active >= item.page && active < item.nextPage 
</script>

<template>
  <ul :class="{ 'menu': deps === 0 }">
    <li v-for="item in data" :key="item.herf" @click.stop="handleClick(item)">
      <a class="whitespace-normal" :class="{ active: isActive(item, active) }">{{ item.label
        }}</a>
      <template v-if="item.subitems && item.subitems.length > 0">
        <ExpandTreeView :data="item.subitems" :active="active" :deps="deps + 1" @click="handleClick" />
      </template>
    </li>
  </ul>
</template>